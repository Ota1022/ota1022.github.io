---
title: "Talk at JAWS-UG Containers: A Rust ECS Service in Application Signals Without Auto-Instrumentation"
description: "A JAWS-UG Containers talk on monitoring a Rust API on ECS Fargate with CloudWatch Application Signals, using the standard OpenTelemetry SDK and a CloudWatch agent sidecar."
date: "2026-11-16"
category: "activity"
emoji: "🔭"
tags: ["OpenTelemetry", "Amazon ECS", "JAWS-UG"]
---

On November 16, 2026, I spoke at [JAWS-UG Containers #31](https://jawsug-container.connpass.com/event/400814/). The Japanese title translates to *Getting an ECS Service into Application Signals Without Auto-Instrumentation*. Amazon CloudWatch Application Signals documents automatic or zero-code instrumentation for seven languages, and Rust is not among them. The talk covered what to deploy instead, and what manual instrumentation leaves for the developer to decide.

## About JAWS-UG Containers

[JAWS-UG](https://jaws-ug.jp/about-us/) is the volunteer-run AWS user community in Japan, with chapters based on regions and technical interests. The Containers chapter covers container workloads on AWS.

This edition was a casual lightning-talk night, streamed online. Six speakers had fifteen minutes each, and any topic connected to containers was welcome. The other talks covered CI/CD for container applications on Amazon ECS, Amazon ECR lifecycle policies, network policies on Amazon EKS, SOCI indexes for faster container startup, and choosing between EKS, ECS, and Lambda for a developer platform.

## What I shared

The running example was a hypothetical catalog-publishing API written in Rust on ECS Fargate. A client calls `PublishCatalog` over gRPC. The API copies the catalog from a draft area to a public one with Amazon S3 `CopyObject`, then sends an Amazon SQS message so the search index gets updated. One request makes two external calls, and the total time alone does not say which of the two is slow.

What ECS provides on its own stops short of that answer.

| What you want to know | Where it comes from | What is missing |
| --- | --- | --- |
| CPU and memory utilization | [ECS metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/available-metrics.html) | Nothing per request |
| Request count, response time, error count | ECS Service Connect | Only traffic that goes through Service Connect |
| Total time for one request | Application logs | Duration and failures of each external call |

[Application Signals](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ServiceDetail.html) is the APM feature of Amazon CloudWatch. It organizes an investigation into three levels: Services (here, `catalog-api`), Operations (`PublishCatalog`), and Dependencies (S3 `CopyObject` and SQS `SendMessage`). Each level comes with Latency, Error, and Fault metrics.

### Choosing a setup for Rust

The AWS documentation lists [three instrumentation setups](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Getting-Started-App-Signals.html).

| Setup | How the app is instrumented | Decision |
| --- | --- | --- |
| ADOT integrated setup | Auto-instrumentation by the ADOT agent | Skipped: ADOT does not support Rust |
| Standard OpenTelemetry setup | Zero-code or manual instrumentation | **Adopted**: works for languages ADOT does not cover |
| X-Ray SDK setup | Instrumentation with the X-Ray SDK | Skipped: in maintenance mode since February 2026 |

[ADOT](https://aws-otel.github.io/) (AWS Distro for OpenTelemetry) is the OpenTelemetry distribution that AWS tests, ships, and supports. It includes an SDK with auto-instrumentation agents, which produce telemetry without code changes, and the ADOT Collector, which receives telemetry and forwards it to AWS.

As of November 15, 2026, the [supported systems page](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Signals-supportmatrix.html) lists ADOT auto-instrumentation for Java, .NET, Python, and Node.js, and zero-code instrumentation with standard OpenTelemetry for PHP, Ruby, and Go. Rust is not in the list of supported languages. It does appear as an example of a language that uses the standard OpenTelemetry setup. So the Rust API calls the standard OpenTelemetry SDK from its own code, which is manual instrumentation.

### The task and the path spans take

With ADOT auto-instrumentation, an [ECS task](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Signals-ECS-Sidecar.html) has three containers: an init container that supplies the agent, the application, and the CloudWatch agent. The task in this talk has two. The application embeds the OpenTelemetry SDK, and the CloudWatch agent runs next to it as a sidecar.

The SDK records each request as a [trace](https://opentelemetry.io/docs/concepts/signals/traces/) made of spans. For `PublishCatalog` there are four: one for handling the request, one for internal preparation, and one for each call to S3 and SQS.

[CloudWatch Transaction Search](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Transaction-Search.html) stores spans sent to AWS X-Ray in CloudWatch Logs and makes them searchable. Every span is stored in the `aws/spans` log group, while the share of spans that gets indexed for search is a separate setting with a default of 1%. Application Signals builds its views from the stored spans.

That leaves the question of how a task sends spans to X-Ray.

| Method | Extra implementation | Container to operate | Decision |
| --- | --- | --- | --- |
| Send directly from the application to the [X-Ray OTLP endpoint](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPEndpoint.html) | OTLP/HTTP export and authentication | None | Skipped: no request signing in the application |
| ADOT Collector sidecar | None | Collector, with destination and authentication configured | Skipped: the agent can do the same job |
| CloudWatch agent sidecar | None | Agent, with one receiver setting | **Adopted** |

The resulting path is short. The SDK in the Rust API creates spans and sends them over OTLP/gRPC to the CloudWatch agent in the same task. The agent authenticates to AWS and forwards them to X-Ray. With Transaction Search enabled, the spans land in CloudWatch Logs and Application Signals uses them. The application only produces telemetry; delivery to AWS is the agent's job.

### What manual instrumentation leaves to you

Getting spans to Application Signals is half of the work. The metrics are computed from what the spans contain. With auto-instrumentation, the ADOT implementation defines that content. With manual instrumentation, the developer does. The list of things to decide includes span kind, span status, sampling, the service name, span attributes, trace context propagation, and log correlation. The talk went into three of them.

**Span kind decides whether dependencies show up.** The [kind](https://opentelemetry.io/docs/concepts/signals/traces/#span-kind) says what role a span plays. The span that handles `PublishCatalog` is `SERVER`, the internal preparation is `INTERNAL`, and the calls to S3 and SQS are `CLIENT`. Record external calls as `CLIENT` spans, and check that the spans your libraries create carry the kind you expect. `PRODUCER` and `CONSUMER` exist for messaging, but the SQS span here measures an AWS API call, so it is `CLIENT`.

**Span status decides availability.** Application Signals [counts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html) HTTP 4xx responses as Error, and HTTP 5xx responses and spans with status `ERROR` as Fault. Availability is (1 − Fault ÷ requests aggregated into the metric) × 100. If a request with invalid input also ends in an `ERROR` span, availability drops while the server is healthy. The `SERVER` span should be marked `ERROR` only for failures on the server side.

**Sampling decides whether every request is counted.** In the standard OpenTelemetry setup, metrics are aggregated from the spans that arrive, so a request that was not sent is not in the numbers.

| Setup | Counting every request |
| --- | --- |
| ADOT SDK + CloudWatch agent | Metrics cover all requests even when traces are sampled down |
| Standard OpenTelemetry SDK + Collector | Requires 100% sampling |

Sending and storing every span costs more, so the sampling rate is a trade-off between how exact the metrics need to be and what they cost.

### Takeaways

A Rust API with no auto-instrumentation can still be monitored with Application Signals, using the standard OpenTelemetry SDK and a CloudWatch agent sidecar. Per-operation metrics for the gRPC API and its external dependencies show up in Application Signals. The catch is that the content of the spans has to be decided before the instrumentation is written, working backward from what you want to see on the screen.

::speakerdeck[Getting an ECS Service into Application Signals Without Auto-Instrumentation]{id="60de7c4a640e46f4b41b2347b8064c32"}

[View the slides on Speaker Deck](https://speakerdeck.com/ota1022/jawsug-container31).
