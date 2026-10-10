# declaration-property-value-no-unknown

Disallow unknown values for properties within declarations.

```less
a {
  top: unknown;
}
/** ^|    ^|
 * property and value pairs like these */
```

This rule considers values for properties defined within the CSS specifications to be known. You can use the `propertiesSyntax` and `typesSyntax` secondary options to extend the syntax.

This rule is only appropriate for CSS. It correctly handles Less syntax including:

- Less variables (`@variable`)
- Less variable interpolation (`@{variable}`)
- Less escape sequences (`~"value"`)

This rule is experimental with some false negatives that we'll patch in minor releases.

It sometimes overlaps with:

- `color-no-invalid-hex`
- `function-no-unknown`
- `string-no-newline`
- `unit-no-unknown`

If duplicate problems are flagged, you can turn off the corresponding rule.

## Options

### `true`

The following patterns are considered problems:

```less
a {
  top: red;
}
```

```less
a {
  top: unknown;
}
```

The following patterns are _not_ considered problems:

```less
a {
  top: 0;
}
```

```less
a {
  top: var(--foo);
}
```

```less
a {
  padding: 0 @spacer-4;
}
```

```less
a {
  border: 1px solid @blue;
}
```

```less
a {
  transform: translate(-@spacer-3, 0);
}
```

```less
a {
  width: calc(100% + @spacer-3 + @spacer-3);
}
```

## Optional secondary options

### `ignoreProperties: { "property": ["/regex/", /regex/, "non-regex"]|"/regex/"|/regex/|"non-regex" }`

Ignore the specified property and value pairs. Keys in the object indicate property names. If a string in the object is surrounded with `"/"`, it's interpreted as a regular expression. For example, `"/.+/"` matches any strings.

Given:

```json
{
  "top": ["unknown"],
  "/^margin-/": "/^@/",
  "padding": "/.+/",
  "/.+/": "--unknown-value"
}
```

The following patterns are _not_ considered problems:

```less
a {
  top: unknown;
}
```

```less
a {
  margin-top: @foo-bar;
}
```

```less
a {
  padding: invalid;
}
```

```less
a {
  width: --unknown-value;
}
```

### `propertiesSyntax: { property: syntax }`

Extend or alter the properties syntax dictionary. [CSS Value Definition Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax) is used to define a value's syntax. If a definition starts with `|` it is added to the existing definition value if any.

Given:

```json
{ "size": "<length-percentage>" }
```

The following patterns are _not_ considered problems:

```less
a {
  size: 0;
}
```

```less
a {
  size: 10px;
}
```

### `typesSyntax: { type: syntax }`

Extend or alter the types syntax dictionary. [CSS Value Definition Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax) is used to define a value's syntax. If a definition starts with `|` it is added to the existing definition value if any.

Types are something like a preset which allows you to reuse a definition across other definitions. So, you'll likely want to also use the `propertiesSyntax` option when using this option.

Given:

```json
{
  "propertiesSyntax": { "top": "| <--foo()>" },
  "typesSyntax": { "--foo()": "--foo( <length-percentage> )" }
}
```

The following patterns are _not_ considered problems:

```less
a {
  top: --foo(0);
}
```

```less
a {
  top: --foo(10px);
}
```
