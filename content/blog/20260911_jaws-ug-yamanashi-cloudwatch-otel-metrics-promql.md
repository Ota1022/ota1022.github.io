---
title: "Lightning Talk at JAWS-UG Yamanashi: OpenTelemetry Metrics in CloudWatch, Queried with PromQL"
description: "A JAWS-UG Yamanashi talk on what stays and what changes when OpenTelemetry metrics move from Prometheus to CloudWatch's native OTLP endpoint and PromQL."
date: "2026-09-11"
category: "activity"
emoji: "📊"
tags: ["OpenTelemetry", "Amazon CloudWatch", "JAWS-UG"]
---

On September 11, 2026, I gave a lightning talk at [JAWS-UG Yamanashi #13](https://jaws-ug-yamanashi.connpass.com/event/403739/). The Japanese title, *Sending OpenTelemetry Metrics to CloudWatch and Querying Them with PromQL*, asked one question: when the storage destination for OpenTelemetry metrics moves from Prometheus to Amazon CloudWatch, can the instrumentation code and the queries be reused as they are?

## About JAWS-UG Yamanashi

[JAWS-UG](https://jaws-ug.jp/about-us/) is the volunteer-run AWS user community in Japan, with chapters based on regions and technical interests. Yamanashi is one of its regional chapters, and its motto translates roughly to "low barriers, big dreams".

This edition celebrated the group passing 350 members with a lightning-talk festival. It was held at 4U-Yamanashi in Kofu with an online stream, and each speaker had ten minutes. Topics ranged from managing a growing set of AWS account credentials to twenty years of Amazon EC2 instance types.

## What I shared

In June 2026, Amazon CloudWatch [reached general availability for native OpenTelemetry metrics](https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-cloudwatch-otel-metrics/). Metrics arrive over OTLP and are stored without conversion into a CloudWatch-specific format, PromQL queries run against them, and ingestion is priced per gigabyte.

A common Prometheus setup sends metrics from the OpenTelemetry SDK over OTLP to a Collector, stores them in Prometheus, and displays them in Grafana. Prometheus accepts OTLP through [its own receiver](https://prometheus.io/docs/guides/opentelemetry/), and CloudWatch now [accepts OTLP](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/metrics-otel-send.html) and answers PromQL queries. If both the Collector's export protocol and the query language are shared, the switch might come down to changing the Collector's destination.

To test that, I used the shipping service from [OpenTelemetry Demo 3.0.0](https://github.com/open-telemetry/opentelemetry-demo/tree/3.0.0/src/shipping), a Rust service that records the time from receiving a request to returning a response as an OpenTelemetry histogram. A load generator sent one request per second. The application and the load stayed the same while the storage destination moved from Prometheus to CloudWatch. The Prometheus path used the Demo's own configuration, with Prometheus storing the values and Grafana displaying them. The CloudWatch path ran as a single ECS Fargate task holding the shipping service, a flagd feature-flag server, an OpenTelemetry Collector, and the load generator, with results read back through PromQL in CloudWatch Query Studio.

### What changed and what did not

The application's instrumentation code and the OTLP export from the application to the Collector did not change. Two things did.

The first is configuration. The Collector's exporter points at the CloudWatch OTLP endpoint and signs each request with SigV4 using IAM credentials. Metric and attribute names also differ. The Prometheus path in the Demo's configuration exposes the histogram as `http_server_request_duration_seconds_*` with labels such as `http_route` and `service_name`. CloudWatch keeps the OpenTelemetry names, so the metric is `http.server.request.duration` and the labels are `http.route` and `@resource.service.name`. How Prometheus translates names and handles resource attributes depends on its OTLP receiver settings.

The second is how the histogram is stored. The OpenTelemetry SDK aggregates response times into a [histogram](https://opentelemetry.io/docs/specs/otel/metrics/data-model/#histogram): a sum, a count, and a count per bucket. Prometheus stores the sum, the count, and each bucket count as separate series. CloudWatch stores them together as one histogram. The aggregated result is the same, but the series are divided differently, so a PromQL query that reads them has to change.

Average response time is the increase in the sum divided by the increase in the count. Against Prometheus, the query reads two series and divides them. Against CloudWatch, a histogram function pulls the same values out of the single stored histogram.

```text
# Prometheus: sum and count are separate series
rate(http_server_request_duration_seconds_sum[1m])
  / rate(http_server_request_duration_seconds_count[1m])

# CloudWatch: one histogram, read with a histogram function
histogram_avg(rate({"http.server.request.duration", "@resource.service.name"="shipping"}[1m]))
```

### Checking the rewritten queries

Rewriting a query is only useful if it observes the same behavior. I added a five-second delay to the shipping API through a feature flag and checked three indicators on both paths: average response time, completion rate, and concurrent requests. With one request per second and a five-second wait, the expected values are about five seconds, about one request per second, and about five requests in flight.

After each switch I waited five minutes, then evaluated the following three minutes at fifteen-second steps, which gives thirteen points per indicator.

| Indicator | Expected range | Prometheus | CloudWatch |
| --- | --- | --- | --- |
| Average response time | 5.0 to 5.2 s | 5.002 s | 5.002 to 5.003 s |
| Completion rate | 0.95 to 1.05 /s | 0.997 to 1.000 /s | 0.979 to 1.018 /s |
| Concurrent requests | 4 to 6 | 5 | 5 |

All thirteen points fell inside the range for every indicator on both paths. The two runs happened at different times, so the numbers say nothing about which backend performs better. The wider swing in CloudWatch's completion rate comes from resampling at fifteen-second steps, which changes how many samples land in each window.

### Takeaways

The instrumentation code did not need to change to move the destination to CloudWatch. What changes is the Collector's destination configuration, meaning the OTLP endpoint, SigV4 signing, and IAM permissions, and the PromQL, which has to follow the destination's metric names, attribute names, and histogram representation.

::speakerdeck[Sending OpenTelemetry Metrics to CloudWatch and Querying Them with PromQL]{id="6f4d9d38e5b743db8eb883e8ab64d4bb"}

[View the slides on Speaker Deck](https://speakerdeck.com/ota1022/opentelemetry-no-o-cloudwatch-ni-oku-te-promql-de-mi-te-mita). The CloudWatch side of the experiment is available as Terraform.

::github{url="https://github.com/Ota1022/cloudwatch-otel-metrics-ecs-fargate" description="Terraform for the ECS Fargate task used on the CloudWatch path."}
