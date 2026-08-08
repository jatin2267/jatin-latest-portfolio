const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const JavaScriptObfuscator = require("javascript-obfuscator");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

async function build() {
  ensureDir(DIST);
  ensureDir(path.join(DIST, "css"));
  ensureDir(path.join(DIST, "js"));

  // ---- HTML ----
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const minifiedHtml = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    useShortDoctype: true,
    collapseBooleanAttributes: true,
    quoteCharacter: '"',
  });
  fs.writeFileSync(path.join(DIST, "index.html"), minifiedHtml, "utf8");

  // ---- CSS ----
  const css = fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8");
  const minifiedCss = new CleanCSS({ level: 2 }).minify(css).styles;
  fs.writeFileSync(path.join(DIST, "css", "style.css"), minifiedCss, "utf8");

  // ---- JS ----
  const js = fs.readFileSync(path.join(ROOT, "js", "main.js"), "utf8");
  const obfuscated = JavaScriptObfuscator.obfuscate(js, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    identifierNamesGenerator: "hexadecimal",
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 8,
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
  }).getObfuscatedCode();
  fs.writeFileSync(path.join(DIST, "js", "main.js"), obfuscated, "utf8");

  // ---- IMG ----
  if (fs.existsSync(path.join(ROOT, "img"))) {
    copyDir(path.join(ROOT, "img"), path.join(DIST, "img"));
  }

  console.log("Build complete! Output in dist/");
  console.log("  - dist/index.html");
  console.log("  - dist/css/style.css");
  console.log("  - dist/js/main.js");
  console.log("  - dist/img/");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});

