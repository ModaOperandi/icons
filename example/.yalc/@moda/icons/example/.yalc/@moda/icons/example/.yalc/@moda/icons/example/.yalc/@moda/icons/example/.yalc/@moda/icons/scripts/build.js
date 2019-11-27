const glob = require("glob");
const del = require("del");
const fs = require("fs-extra");
const path = require("path");

const packageIcons = require("./packageIcons");
const { version } = require("../package.json");

const filepaths = glob.sync("build/svg/*.svg");
const BUILD_PATH = path.join(__dirname, "..", "build", "src");

del.sync(BUILD_PATH);

const files = packageIcons({
  svgs: filepaths.map(filepath => ({
    path: filepath,
    source: fs.readFileSync(filepath, { encoding: "utf8" })
  })),
  version
});

files.forEach(file => {
  fs.outputFile(path.join(BUILD_PATH, file.filepath), file.source, err => {
    console.log(`Wrote: ${file.filepath}`);
    if (err) console.error(err);
  });
});
