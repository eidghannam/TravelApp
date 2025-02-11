# Project Title

A simple travel app application built with Express and Webpack.

## Description

This is a basic web application that demonstrates building an Express server with SCSS styling and a front-end using Webpack. The app performs weather and location-based analysis using the geonames API, weatherbit API,pixabay API.

## Table of Contents

- [Project Setup](#project-setup)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Running the Project](#running-the-project)

## Project Setup

Before running this project, ensure you have [Node.js](https://nodejs.org/) installed.

## Prerequisites

- **Node.js**: v16.17.1 or later
- **npm**: v8.15.0 or later

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/eidghannam/TravelApp.git
   ```
2. Navigate to the project directory:
   ```sh
   cd TravelApp
   ```
3. Install the dependencies:

   ```sh
   npm install
   ```

   ## Dependencies

The following dependencies are used in this project:

- **Express**: ^4.17.1
- **Node-fetch**: ^3.3.2
- **CORS**: ^2.8.5
- **MeaningCloud**: ^1.1.10
- **dotenv**: ^16.4.7

The development dependencies include:

- **Webpack**: ^5.97.1
- **Sass**: ^1.83.4
- **Jest**: ^29.7.0
- **Supertest**: ^7.0.0
- **Babel**: ^7.26.0
- **Webpack-dev-server**: ^5.2.0

Refer to the `package.json` file for the full list of dependencies.

## Scripts

The following scripts can be used to manage the project:

- `npm run start`: Starts the Express server.
- `npm run build-dev`: Builds the project in development mode and opens it in the browser.
- `npm run build-prod`: Builds the project for production.
- `npm test`: Runs tests using Jest.

## Running the App

1. Start the development server:
   ```sh
   npm run build-dev
   ```
2. Open your browser and go to `http://localhost:8081`

3. To run the production build:

   ```sh
   npm run build-prod
   ```

4. To start the server:

   ```sh
   npm start
   ```

5. To run tests:

   ```sh
   npm test
   ```
