# Unscramble

Takes a string of letters and returns all valid dictionary words that can be formed from those letters.

```sh
> unscramble cabno

abo, ban, boa, cab, can, cob, con, nab, nob, oba, oca

bacon, banco
```

## Usage

```
unscramble <letters> [length] [pos1 pos2 ...] [--exact-match]
```

### Filter by word length

Pass a length as the second positional argument to return only words of that length.

```sh
> unscramble cabno 5

bacon, banco
```

### Match every input letter

`--exact-match` (or `-x`) restricts results to words that use every input letter.

```sh
> unscramble cabno -x

bacon, banco
```

### Constrain letters at specific positions

Pass a pattern after the length to constrain individual positions. Use `_` as a wildcard.

```sh
> unscramble cabno 5 b___n

bacon
```

Each position can also be given as its own argument, which lets you list multiple allowed letters per position (e.g. `bc` means "b or c"):

```sh
> unscramble cabno 5 b _ _ _ n
```

## Requirements

Node.js version 22 or higher.

## Local setup

```sh
pnpm install
pnpm test
node . cabno
```

Install globally from source:

```sh
npm install -g .
```

## Rebuilding the dictionary

The bundled dictionary is generated from `tasks/words.txt`:

```sh
pnpm run build:dictionary
```
