# stylelint-less

A collection of [Less](https://lesscss.org/) specific rules for [stylelint](https://github.com/stylelint/stylelint).

## Installation

```shell
npm install stylelint-less --save-dev
```

## Usage

Add the `stylelint-less` plugin to your configuration, and set the rules you want to use under the `less` namespace.

```json
{
  "plugins": ["stylelint-less"],
  "rules": {
    "at-rule-no-unknown": null,
    "color-no-invalid-hex": true,
    "less/color-no-invalid-hex": true
  }
}
```

Please refer to the [stylelint](https://stylelint.io/user-guide/get-started/) docs for additional information on how to create a configuration file or add rules.

## Rules

- [less/color-hex-case](src/rules/color-hex-case): Specify lowercase or uppercase for hex colors.
- [less/color-no-hex](src/rules/color-no-hex): Disallow hex colors.
- [less/color-no-invalid-hex](src/rules/color-no-invalid-hex): Disallow invalid hex colors.
- [less/no-duplicate-variables](src/rules/no-duplicate-variables): Disallow duplicate variables within a scope.

## Note

Please make sure there is

- No space between variable and ':'
- A space between ":" and value
  example
  `@color: red;`

so that these rules will work as expected. If the variable is not in the above format , you will
get `Invalid variable` error.
