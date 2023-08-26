# color-hex-case

Specify lowercase or uppercase for hex colors.

Can be `lower` or `upper`.

## Examples

### lower

```less
a { color: #fff; } // ✓ ok
a { color: #FFF; } // ✗ error
```

### upper

```less
a { color: #FFF; } // ✓ ok
a { color: #fff; } // ✗ error
```
