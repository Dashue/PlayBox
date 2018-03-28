# Hormel Responsive Template

This is the experimental prototype of the Hormel Responsive Template Front End.

## Development

### Prerequisites

1. Install [NodeJS LTS](https://nodejs.org/en/download/)
    1. If you are on OS X, consider [NVM](https://github.com/creationix/nvm/blob/master/README.md) instead.
1. Install [Git](https://git-scm.com/downloads)
    1. If you are on OS X, you may want to install it via [MacPorts](https://www.macports.org/) or [HomeBrew](https://brew.sh/). 
1. Clone this repository to your local development machine using Git
1. `cd responsive-template`
1. If using NVM: `nvm use`
1. `npm install`

### Update your local Git Config

1. `git config user.email "john.doe@hormel.com"`
1. `git config user.name "John Doe"`

Use your name for `user.name` and your work email address for `user.email`.

### Development server
Run `npm start` for a dev server. Navigate to [localhost:4200](http://localhost:4200). 

* Run `npm run start-dev-server` to run locally using the dev-server environment.
* Run `npm run start-test` to run locally using the test environment.
* Run `npm run start-prod` to run locally using the prod environment.

You can modify the configuration of these environments in `src/environments/`.

The app will automatically reload if you change any of the source files.
If you add new files to the project, you may need to re-run `npm start` for Webpack to pick them up.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use:
 
`ng generate directive|pipe|service|class|guard|interface|enum|module`

For example: `ng g c main` to create a MainComponent in `main.component.ts/main.component.scss/main.component.html` or 
`ng g s user` to create a User Service in `user.service.ts`.

More powerful scaffolding is planned for Phase 3.

### Development Guidelines

Please review the [Contribution Guide](CONTRIBUTING.md) for information on git commit messages, branching,
creating Merge Requests, and more.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

* Run `npm run build-dev-server` to build using the dev-server environment.
* Run `npm run build-test` to build using the test environment.
* Run `npm run build-prod` to build using the prod environment.

You can modify the configuration of these environments in `src/environments/`.

### Static Code Analysis

Run `npm run lint` to run the static code analysis tooling.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Deployment

1. Verify that the [package.json](package.json) `deploy-prod` script entry 
has the correct destination path for the deployment. 
This should be a location served by your web server that is accessible from your current device. 
1. Run `npm run build-prod` for a production build 
1. Run `npm run deploy-prod` to copy the contents of the `/dist` folder to your web server

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
