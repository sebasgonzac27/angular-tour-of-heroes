# Coverage Checking

Add the following lines in `karma.config.js` inside coverageReporter config.

```javascript
check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
```

# Mocha Report

1. Install

```bash
npm i karma-mocha-reporter --save-dev
```

2. Go to `karma.config.js` and add plugins.

```javascript
plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-mocha-reporter"),
    ],
```

3. Change name of reporter.

```javascript
reporters: ["mocha"],
```
