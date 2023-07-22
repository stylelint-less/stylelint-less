# stylelint-less

A collection of Less specific rules for [stylelint](https://github.com/stylelint/stylelint)

## Purpose

Stylelint supports less syntax, but some of the rules in stylelint not working as expected , So created this plugin to
supports those rules for less, since Stylelint is generally focused on standard CSS syntax.

## Installation and usage

First install Stylelint-less and stylelint (if it is not instlled already)

```
npm install stylelint stylelint-less
```

Create a config for stylelint and add `stylelint-less` to the plugins array and the rules you need to the rules list.
All rules from stylelint-less
need to be namespaced with `less`.

```
{
  "plugins": [
    "stylelint-less"
  ],
  "rules": {
    "at-rule-no-unknown": null,
    "color-no-invalid-hex":true,
    "less/color-no-invalid-hex":true
  }
}
```

Please refer to [stylelint](https://stylelint.io/user-guide/get-started/) docs for the detailed info on using this
linter.

## List of Rules

- color-hex-case
- color-no-hex
- color-no-invalid-hex
- no-duplicate-variables

Use these rules with `less` namespace example

`less/color-no-hex: "true"`

## Note

Please make sure there is

- No space between variable and ':'
- A space between ":" and value
  example
  `@color: red;`

so that these rules will work as expected. If the variable is not in the above format , you will
get `Invalid variable` error.
