const Fs = require("fs");

const Path = require("path");

const Sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => ({
      input: `src/${type}/${file}`,
      output: `src/lib/${file.slice(0, -4) + "css"}`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compile = (path, fileName) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve('src/global.scss')).toString(),
    outputStyle: "expanded",
    outFile: "global.css",
    includePaths: [Path.resolve('src')],
  });

  // const result = Sass.compile(Path.resolve(path));

  Fs.writeFileSync(Path.resolve(fileName), result.css.toString());
};

getComponents().forEach((component) => {
  compile(component.input, component.output);
});

