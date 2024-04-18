const {globSync} = require("glob");
const fs = require("fs-extra");
const path = require("path");

const packageIcons = require("./packageIcons");
const { version } = require("../package.json");

const filepaths = globSync("build/svg/*.svg");
const BUILD_PATH = path.join(__dirname, "..", "build", "src");

const build = async () => {
  // This doesn't work if the "optimize" step hasn't been done, by running:
  // `rm -rf build/svg && svgo src/svg -o build/svg --config=svgo.config.js`.
  // which is aliased under the "optimize" run script in package.json.
  // This is because the svg files need to be in the "build" directory before being packaged.
  const files = await packageIcons({
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
}

build();
