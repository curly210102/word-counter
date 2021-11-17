This is a word count package which is support cjk and emoji

## Getting started

```bash
npm install @homegrown/word-counter
```

```js
const wordCounter = require("@homegrown/word-counter");

const text = "# 🙂 Hello, World.\n探索充满创新的世界。";

wordCounter.countWords(text); // count Words: 12
wordCounter.countLines(text); // count Lines: 2
wordCounter.countCharacters(text); // count characters without spaces: 24
wordCounter.countCharacters(text, true); // count characters with spaces: 27
wordCounter.count(text); // count all above items: {words: 12, lines: 2, characters: 24, charactersWithSpaces: 27}
```

## Changelog

### 0.1.7

- Fix include letter but except cjk letter, e.g. "Innodb的二级索引存储的值"

### 0.1.6

- Update emoji regexp
- Update word recognition
