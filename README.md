# Summarize Visualizer

A small internal tool built with [Vite](https://vitejs.dev/) to visualize FindInsight Evaluation data for testing and development.

## Use the App

🔗 **Live App:** [https://andersgmsft.github.io/summarize-visualizer/](https://andersgmsft.github.io/summarize-visualizer/)

- Upload a CSV file with test results from the `FindInsightsFunctional` test.
- View a score overview, including:
  - Average rating
  - Rating distribution
- Browse a list of all scenarios with their insight ratings.
- Click on a scenario to see:
  - The generated insights
  - The evaluation data
  - The assigned rating


## Development

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

Install dependencies:

```bash
npm install --legacy-peer-deps
```

### Usage

Start the development server:

```bash
npm run dev
```

Build the app:

```bash
npm run build
```

## Project Structure

```
.
├── docs/                # GitHub Pages-compatible directory for publishing the generated site
├── src/                 # Source code
│   ├── assets/          # Static images, icons, example etc.
│   ├── Components/      # React UI components
│   ├── model/           # Data models
│   ├── Utility/         # Helper functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # App entry point
└── index.html           # HTML template

```

