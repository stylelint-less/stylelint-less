# stylelint-plugin

A collection of LESS specific rules for [stylelint](https://github.com/stylelint/stylelint).

> The plugin is automatically enabled if you use the `@stylelint-less/config-standard` package.

## Installation

```sh
npm install stylelint @stylelint-less/stylelint-plugin --save-dev
```

## Usage

Add the plugin to your configuration:

```
{
  "plugins": [
    "@stylelint-less/stylelint-plugin"
  ]
}
```

## List of Rules

- [less/color-hex-case](src/rules/color-hex-case)
- [less/color-no-hex](src/rules/color-no-hex)
- [less/color-no-invalid-hex](src/rules/color-no-invalid-hex)
- [less/no-duplicate-variables](src/rules/no-duplicate-variables)

## Note

Please make sure there is

- No space between variable and ':'
- A space between ":" and value
  example
  `@color: red;`

so that these rules will work as expected. If the variable is not in the above format , you will
get `Invalid variable` error.
