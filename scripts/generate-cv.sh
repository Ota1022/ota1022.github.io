#!/usr/bin/env bash

set -euo pipefail

source_path="${1:-content/cv/resume.en.md}"
output_path="${2:-public/cv.pdf}"
max_pages="${CV_MAX_PAGES:-6}"

if [[ ! -s "$source_path" ]]; then
  echo "CV source is missing or empty: $source_path" >&2
  exit 1
fi

for command_name in pandoc xelatex pdfinfo; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is not available: $command_name" >&2
    exit 1
  fi
done

temporary_root="${RUNNER_TEMP:-${TMPDIR:-/tmp}}"
temporary_directory="$(mktemp -d "$temporary_root/cv-build.XXXXXX")"
temporary_pdf="$temporary_directory/cv.pdf"

cleanup() {
  rm -rf "$temporary_directory"
}
trap cleanup EXIT

pandoc "$source_path" \
  --output "$temporary_pdf" \
  --pdf-engine=xelatex \
  --standalone \
  --fail-if-warnings \
  --variable papersize=letter \
  --variable geometry=margin=20mm \
  --variable colorlinks=true \
  --variable urlcolor=blue

if [[ ! -s "$temporary_pdf" ]]; then
  echo "PDF generation produced an empty file." >&2
  exit 1
fi

page_count="$(pdfinfo "$temporary_pdf" | awk '/^Pages:/ { print $2 }')"
if [[ ! "$page_count" =~ ^[0-9]+$ ]] || (( page_count < 1 )); then
  echo "Unable to determine a valid PDF page count." >&2
  exit 1
fi

if [[ ! "$max_pages" =~ ^[0-9]+$ ]] || (( max_pages < 1 )); then
  echo "CV_MAX_PAGES must be a positive integer." >&2
  exit 1
fi

if (( page_count > max_pages )); then
  echo "Generated CV has $page_count pages; maximum allowed is $max_pages." >&2
  exit 1
fi

mkdir -p "$(dirname "$output_path")"
mv "$temporary_pdf" "$output_path"

echo "Generated $output_path ($page_count pages)."
