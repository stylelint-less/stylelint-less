# stylelint-config-recommended-less

> The recommended shareable Less config for stylelint.

It turns on all
the [possible errors](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules/list.md#possible-errors)
rules within stylelint.

Use it as is or as a foundation for your own config.

## Installation

First install Stylelint and stylelint-less packages

```
npm install stylelint --save-dev
```

and then install this config

```
npm install stylelint-config-recommended-less --save-dev
```

## Usage

If you've installed `stylelint-config-recommended-less` locally within your project, just set your `stylelint` config
to:

```json
{
  "extends": ["stylelint-config-recommended-less"]
}
```

## Extending the config

You can add `rules` key to your config there you can override and add new rules

```json
{
  "extends": ["stylelint-config-recommended-less"],
  "rules": {
    "block-no-empty": null,
    "unit-whitelist": ["em", "rem", "s"]
  }
}
```
