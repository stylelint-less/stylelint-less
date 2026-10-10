# stylelint-config-recommended-less

The recommended base [Less](https://lesscss.org/) config for [stylelint](https://github.com/stylelint/stylelint).

- Uses the [postcss-less](https://github.com/shellscape/postcss-less) custom syntax
- Uses the [stylelint-less](../stylelint-less) plugin
- Extends [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)
- Configures the rules to be Less specific

## Installation

```shell
npm install stylelint-config-recommended-less --save-dev
```

## Usage

Add the recommended configuration to your `stylelint` config:

```json
{
  "extends": ["stylelint-config-recommended-less"]
}
```
