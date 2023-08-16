# config-recommended

This configuration is the foundation for all other configurations. It turns on all the possible errors rules within stylelint, and uses the correct parser for LESS.

## Installation

```sh
npm install @stylelint-less/config-recommended --save-dev
```

## Usage

Set your `stylelint` config to:

```json
{
  "extends": "@stylelint-less/config-recommended"
}
```
