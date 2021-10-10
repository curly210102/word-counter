import emojiRegexp from "emoji-regex/es2015/RGI_Emoji";

export interface IWordCountResult {
  words: number;
  lines: number;
  characters: number;
  charactersWithSpaces: number;
}

const PatternString = {
  cjk: "\\p{Script=Han}|\\p{Script=Kana}|\\p{Script=Hira}|\\p{Script=Hangul}",
  latin: "\\d+\\.\\d+|\\w+",
  emoji: emojiRegexp().source,
};

const wordPattern = new RegExp(
  `${PatternString.emoji}|${PatternString.cjk}|${PatternString.latin}`,
  "gu"
);

const characterPattern = new RegExp(
  `${PatternString.emoji}|${PatternString.cjk}|[^\\s\\n\\r\\t\\v\\f\\b]`,
  "gu"
);
const characterPatternWithSpace = new RegExp(
  `${PatternString.emoji}|${PatternString.cjk}|[^\\n\\r\\t\\v\\f\\b]`,
  "gu"
);

export const countWords = (text: string) => {
  return text.match(wordPattern)?.length ?? 0;
};

export const countLines = (text: string) => {
  return text.split("\n").length;
};
export const countCharacters = (text: string, withSpace: boolean = false) => {
  return (
    text.match(
      withSpace ? characterPatternWithSpace : characterPattern
    )?.length ?? 0
  );
};
export const count = (text: string): IWordCountResult => {
  return {
    words: countWords(text),
    lines: countLines(text),
    characters: countCharacters(text),
    charactersWithSpaces: countCharacters(text, true),
  };
};
