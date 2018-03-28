# Hormel Responsive Template Docs

These are the docs built for the Hormel Responsive Template Front End.
They are based on the [material.angular.io](https://material.angular.io) docs but they are
customized for this template.

## Development

### Prerequisites

1. Install [NVM](https://github.com/creationix/nvm/blob/master/README.md)
1. Install [Git](https://git-scm.com/downloads)
    1. If you are on OS X, you may want to install it via [MacPorts](https://www.macports.org/) or [HomeBrew](https://brew.sh/). 
1. Clone this repository to your local development machine using Git
1. `cd docs-site`
1. `nvm use`
1. `npm install`

### Update your local Git Config

1. `git config user.email "michael.prentice@convective.com"`
1. `git config user.name "Michael Prentice"`

Use your name for `user.name` and your Convective email address for `user.email`.

### Development server
Run `ng serve` for a dev server. Navigate to [localhost:4200](http://localhost:4200). 

The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use `ng generate directive/pipe/service/class/module`.

For example: `ng g c main` to create a MainComponent in `main.component.ts/main.component.scss/main.component.html` or 
`ng g s user` to create a User Service in `user.service.ts`.

### Development Guidelines

Please review the [Contribution Guide](CONTRIBUTING.md) for information on git commit messages, branching,
creating Merge Requests, and more.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 
Use the `-prod` flag for a production build.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deployment

TBD

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
