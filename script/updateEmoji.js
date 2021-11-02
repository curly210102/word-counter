const fs = require("fs");

const emojiPattern = fs
  .readFileSync(
    "./node_modules/emoji-test-regex-pattern/dist/latest/javascript-u.txt",
    "utf8"
  )
  .toString()
  .trim();

fs.writeFileSync("./lib/emojiPattern.ts", `export default "${emojiPattern}"`);
