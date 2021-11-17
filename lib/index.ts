import emojiPattern from "./emojiPattern";

const cjkPattern =
  "\\p{Script=Han}|\\p{Script=Kana}|\\p{Script=Hira}|\\p{Script=Hangul}";
const PatternString = {
  emoji: emojiPattern,
  cjk: cjkPattern,
  word: `((?!${cjkPattern})[\\p{Alphabetic}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}])+`,
  number: "(?:[\\p{Decimal_Number}](?:\\.?\\p{Decimal_Number})+)",
};
export interface IWordCountResult {
  words: number;
  lines: number;
  characters: number;
  charactersWithSpaces: number;
}

const wordPattern = new RegExp(
  `${PatternString.emoji}|${PatternString.cjk}|${PatternString.number}|${PatternString.word}`,
  "gu"
);

const characterPattern = new RegExp(`${PatternString.emoji}|\\S`, "ug");

const characterPatternWithSpace = new RegExp(`${PatternString.emoji}|.`, "ug");

export const countWords = (text: string) => {
  return text.normalize().match(wordPattern)?.length ?? 0;
};

export const countLines = (text: string) => {
  return text.split("\n").length ?? 0;
};

export const countCharacters = (text: string, withSpace: boolean = false) => {
  return (
    text
      .normalize()
      .match(withSpace ? characterPatternWithSpace : characterPattern)
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
