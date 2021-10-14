import emojiRegexp from "emoji-regex/es2015/RGI_Emoji";

const PatternString = {
  emoji: emojiRegexp().source,
  cjk: "\\p{Script=Han}|\\p{Script=Kana}|\\p{Script=Hira}|\\p{Script=Hangul}",
  word: "[\\p{L}|\\p{N}|._]+",
};
export interface IWordCountResult {
  words: number;
  lines: number;
  characters: number;
  charactersWithSpaces: number;
}

const wordPattern = new RegExp(
  `${PatternString.emoji}|${PatternString.cjk}|${PatternString.word}`,
  "gu"
);

const characterPattern = new RegExp(`${PatternString.emoji}|\\S`, "ug");

const characterPatternWithSpace = new RegExp(`${PatternString.emoji}|.`, "ug");

export const countWords = (text: string) => {
  return text.match(wordPattern)?.length ?? 0;
};

export const countLines = (text: string) => {
  return text.split("\n").length;
};

export const countCharacters = (text: string, withSpace: boolean = false) => {
  return (
    text.match(withSpace ? characterPatternWithSpace : characterPattern)
      ?.length ?? 0
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
