# Web

## Xata First Timers

- run `pnpm exec xata auth login` and provide your API key

## Deployment

- log into gcloud
  - `gcloud auth login`
- set project
  - `gcloud config set project motifxd`
- setup docker registry with gcloud
  - `gcloud auth configure-docker`
- `pnpm run deploy`
