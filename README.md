# The project

This project is a challenge based on a transaction control panel, with a list of all data, the possibility to filter and create a new transaction.

# How to run the project in my machine?

## Clone this repository
Run in a folder of your preferency the command `git clone https://github.com/VitorPinheiro29/transaction-panel-control.git`

# Run the JSON API
After cloning the project on your machine, the first step is to open the folder `server`
## Go in 'server' folder
`cd server`

## Run the server command
Inside the `server` folder, run the command `json-server --watch db.json` on a native terminal or command line program, like 'cmd'

To access the data json object, navigate to `http://localhost:3000/transactions`

# Run the Development server (front-end)

In another window of your terminal or command line program, go to the folder `web`
## Go in 'web' folder
`cd web`

## Install the dependencies
Inside the `web` folder, run the command `npm install` for install all dependencies. This process can take a few minutes

## Run the development server command

Inside the `web` folder, run the command `ng serve` for a dev server. In your browser, navigate to `http://localhost:4200/`. The app will automatically reload.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
