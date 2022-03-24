# Wink

## About

The Wink system is divided into 2 main parts:

- Backend Serverless Functions
- Frontend React Web App

The serverless functions are defined within the Serverless Framework.

The React Web App is a create-react-app SPA using react-router-dom for page routing,
and communicates to the backend using REST API calls.

## Setting up your environment

1. Install Serverless Framework:
   Please follow the instructions here for your operating system:
   https://www.serverless.com/framework/docs/getting-started/

2. Install packages:
   Run `yarn install` to install all dependencies.

3. Install Prettier extension(if using vscode):
   Look for and install the 'Prettier - Code formatter' extension in vscode. Once installed, go to File -> Preferences -> Settings, and enable the 'Format on Save' option.

Yarn is set up with workspaces, so there is no need to run `yarn install` inside each
project folder.

## Uninstall

1. Uninstall Serverless Framework:

```sh
serverless uninstall
```
