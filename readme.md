# Unscramble

Takes a string of letters and returns all possible words.

```sh
> unscramble cabno

abo, ban, boa, cab, can, cob, con, nab, nob, oba, oca

bacon, banco
```

You can also specify the exact number of letters to match.

```sh
> unscramble cabno 5

bacon, banco
```

## Requirements

To use this application, you will need [Node.js](https://nodejs.org/) version 22 or higher.

## Local Setup From Source Code

1. Clone or download and unzip the source code.
2. Open your terminal or command prompt and change to the source code folder.
3. Install dependencies

```sh
npm install
```

Run the app locally:

```sh
node . cabno
```

Install the app locally from source code:

```sh
npm install -g .
```
