# stylelint-config-standard-less

![publish](https://github.com/crazyurus/stylelint-config-standard-less/actions/workflows/publish.yaml/badge.svg)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://badgen.net/npm/v/stylelint-config-standard-less)](https://www.npmjs.com/package/stylelint-config-standard-less)
[![npm dependents](https://badgen.net/npm/dependents/stylelint-config-standard-less)](https://www.npmjs.com/package/stylelint-config-standard-less?activeTab=dependents)
[![npm downloads](https://badgen.net/npm/dt/stylelint-config-standard-less)](https://www.npmjs.com/package/stylelint-config-standard-less)

> The standard shareable LESS config for Stylelint.

This config:

- extends the [`stylelint-config-standard` shared config](https://github.com/stylelint/stylelint-config-standard) and configures its rules for less
- extends the [`stylelint-config-recommended-less` shared config](https://github.com/ssivanatarajan/stylelint-config-recommended-less)

To see the rules that this config uses, please read the [config itself](/index.js).

## Installation

```shell
npm install --save-dev stylelint-config-standard-less
```

## Usage

Set your `stylelint` config to:

```json
{
  "extends": "stylelint-config-standard-less"
}
```

### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to turn off the `less/color-no-invalid-hex` rule:

```json
{
  "extends": "stylelint-config-standard-less",
  "rules": {
    "less/color-no-invalid-hex": null
  }
}
```

## [License](LICENSE)
