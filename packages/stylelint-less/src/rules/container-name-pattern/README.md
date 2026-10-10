# container-name-pattern

Specify a pattern for container names (Supports Less variables).

This rule extends the original stylelint [container-name-pattern](https://stylelint.io/user-guide/rules/container-name-pattern/) rule to support Less variables in container names.

```less
@container foo (width > 400px) {
}
/**        ^|
 * The pattern of this */
```

Less variables (starting with `@`) are automatically excluded from pattern matching.

## Options

### `string`

Specify a regex string (not surrounded with `/`).

Given:

```json
{
  "less/container-name-pattern": "foo-.+"
}
```

The following patterns are considered problems:

```less
@container bar {
}

.foo {
  container-name: bar;
}

.foo {
  container: baz / inline-size;
}
```

The following patterns are _not_ considered problems:

```less
@container foo-bar {
}

@container @container-name (width < 400px) {
}

.foo {
  container-name: foo-bar;
}

.foo {
  container-name: @container-name;
}

.foo {
  container: foo-baz / inline-size;
}

.foo {
  container: @container-var / inline-size;
}
```
