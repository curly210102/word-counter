"use strict";
const expect = require("chai").expect;
const wordCounter = require("../dist/index");

describe("word count test", () => {
  const countWords = wordCounter.countWords;
  it("should count cjk", () => {
    expect(countWords("你好，世界。")).to.equal(4);
    expect(countWords("𠁆𠇖𠋦𠋥𠍵")).to.equal(5);
    expect(countWords("こんにちは")).to.equal(5);
    expect(countWords("안녕하십니까")).to.equal(6);
  });

  it("should count emoji", () => {
    expect(countWords("👋🏃‍♀️👨‍👩‍👧‍👦👨‍💻👋🏻🇨🇳🏴󠁧󠁢󠁥󠁮󠁧󠁿#️⃣")).to.equal(8);
    expect(countWords("🙏❎✅🤓🧐❗️")).to.equal(6);
    expect(countWords("👫👨‍👩‍👧‍👦")).to.equal(2);
    expect(countWords("🤴🏾")).to.equal(1);
  });

  it("should count english word", () => {
    expect(
      countWords("We look forward to welcoming you to our stores. ")
    ).to.equal(9);
    expect(countWords("const name2Value = {}")).to.equal(2);
    expect(countWords("a_b")).to.equal(1);
    expect(countWords("a1.2b")).to.equal(2);
  });

  it("should count number", () => {
    expect(countWords("10.11")).to.equal(1);
    expect(countWords("1000")).to.equal(1);
    expect(countWords(".112")).to.equal(1);
  });
});

describe("line count test", () => {
  const countLines = wordCounter.countLines;
  it("should count multiple lines", () => {
    expect(countLines("# Heading \nHello, world.")).to.equal(2);
  });

  it("should count with no content lines", () => {
    expect(countLines("# Heading \n\n\nHello, world.")).to.equal(4);
  });
});

describe("characters count test", () => {
  const countCharacters = wordCounter.countCharacters;
  it("when count without spaces", () => {
    expect(countCharacters("📕 Same: “一𠍵”")).to.equal(10);
    expect(
      countCharacters("# 🙂 Hello, World.\n探索充满创新的世界。")
    ).to.equal(24);
  });
  it("when count with spaces", () => {
    expect(countCharacters("📕 Same: “一𠍵”", true)).to.equal(12);
    expect(
      countCharacters("# 🙂 Hello, World.\n\n探索充满创新的世界。", true)
    ).to.equal(27);
  });
});

describe("count test", () => {
  const count = wordCounter.count;
  it("count with paragraph", () => {
    const countResult = count("# 🍎 Apple\n\n探索 Apple 充满创新的世界。");
    expect(countResult.words).to.equal(12);
    expect(countResult.lines).to.equal(3);
    expect(countResult.characters).to.equal(22);
    expect(countResult.charactersWithSpaces).to.equal(26);
  });
});
