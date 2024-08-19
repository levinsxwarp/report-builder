# Ad Campaign Report Builder

![image](https://github.com/user-attachments/assets/fb1b63bc-9f38-4d74-924b-22f20830474a)
**[View the live `Ad Campaign Report Builder` here](https://report-builder-six.vercel.app)**

## Table of Contents

- [Ad Campaign Report Builder](#ad-campaign-report-builder)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
    - [Dev Dependencies](#dev-dependencies)
  - [Demo Video](#demo-video)

## Overview

**Ad Campaign Report Builder** is a single-page application (SPA) built with Next.js and React. The application allows users to create dynamic reports by dragging and dropping various metrics into a customizable grid layout. The application supports chart rendering, PDF generation, and a responsive design.

## Features

- **Drag and Drop Report Creation:** Easily drag and drop metrics into the report layout.
- **Customizable Grid Layout:** Powered by `react-grid-layout`, the grid layout adapts dynamically based on user interaction.
- **Chart Rendering:** Supports various chart types using `Chart.js`.
- **PDF Export:** Export your reports as PDF documents with `html2canvas` and `jspdf`.
- **Responsive Design:** Ensures a seamless experience across different devices.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/levinsxwarp/report-builder.git
   cd report-builder
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

3. To build the application for production:

   ```bash
   npm run build
   ```

4. To start the production server:

   ```bash
   npm start
   ```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Starts the production server.

## Dependencies

- **@floating-ui/react**: UI positioning library.
- **@iconify/react**: Icon library for React.
- **axios**: Promise-based HTTP client.
- **chart.js**: JavaScript library for creating charts.
- **classnames**: Utility for conditionally joining classNames.
- **html2canvas**: Screenshots with JavaScript.
- **jspdf**: PDF generation for JavaScript.
- **next**: React framework with hybrid static & server rendering, and route pre-fetching.
- **react**: A JavaScript library for building user interfaces.
- **react-dnd**: Drag and Drop for React.
- **react-grid-layout**: A draggable and resizable grid layout with responsive breakpoints.

### Dev Dependencies

- **@typescript-eslint/eslint-plugin**: Linting for TypeScript with ESLint.
- **eslint**: JavaScript and TypeScript linter.
- **eslint-config-next**: ESLint configuration used by Next.js.
- **eslint-config-standard-with-typescript**: Standard JS with TypeScript support.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: TypeScript language support.

## Demo Video

Watch the demo video to see the **Ad Campaign Report Builder** in action:

https://www.loom.com/share/b2d70731da344c20a4e4392da98df193?sid=ac7e9343-f8fc-40b7-a5ca-39eb0701e484
