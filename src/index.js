const fs = require('fs');
const path = require('path');
const marked = require('marked');
const yaml = require('yaml');

function main () {
  const pathToTableOfContents = process.argv[2];

  if (!pathToTableOfContents) {
    console.error('You must specify the path to the table of contents YAML file');
    process.exit(1);
  }

  if (!fs.existsSync(pathToTableOfContents)) {
    console.error(`Table of contents YAML file not found for path: ${pathToTableOfContents}`);
    process.exit(1);
  }

  const {
    frontCover,
    backCover,
    articles,
    stylesheets
  } = loadTableOfContents(pathToTableOfContents);

  const outputPath = 'output';

  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true, force: true  });
  }

  fs.mkdirSync(outputPath);

  const parentDir = path.dirname(pathToTableOfContents);
  const tableOfContents = [];
  const articleData = [];

  for (const article of articles) {
    const { metadata, html } = processArticle(
      path.join(parentDir, `${article}.md`),
      { stylesheets }
    );
    const outputFilename = article + '.html';
    articleData.push({
      outputFilename,
      metadata,
      html
    });

    tableOfContents.push({
      title: metadata.get('@title'),
      url: outputFilename,
    });
  }

  for (const imageFile of fs.readdirSync(parentDir).filter(isResourceFilename)) {
    fs.copyFileSync(
      path.join(parentDir, imageFile),
      path.join(outputPath, imageFile)
    );
  }

  tableOfContents.unshift({
    title: 'Front Cover',
    url: 'front_cover.html',
  });
  articleData.unshift({
    outputFilename: 'front_cover.html',
    html: `<img src="${frontCover}" class="cover" />`,
    metadata: new Map([['@title', 'Front Cover']]),
  });
  tableOfContents.push({
    title: 'Back Cover',
    url: 'back_cover.html',
  });
  articleData.push({
    outputFilename: 'back_cover.html',
    html: `<img src="${backCover}" class="cover" />`,
    metadata: new Map([['@title', 'Back Cover']]),
  });

  const toc = `<ol>
    ${tableOfContents.map(({ title, url }) => `<li><a href="${url}">${title}</a></li>`).join('\n')}
  </ol>`;

  for ({ outputFilename, metadata, html } of articleData) {
    const stylesheetIncludes = [metadata.get('@stylesheet'), ...stylesheets]
      .filter(Boolean)
      .map(pathname => `<link href="${pathname}" rel="stylesheet">`)
      .join('\n');
    const wrappedHtml = `<!doctype html>
<html>
<head>
<title>${metadata.get('@title')}</title>
${stylesheetIncludes}
</head>
<body>
<nav class="top">
${toc}
</nav>
<article>
${html}
</article>
<nav class="bottom">
${toc}
</nav>
</body>
</html>
`;
    fs.writeFileSync(path.join(outputPath, outputFilename), wrappedHtml);
  }
}

function loadTableOfContents(pathToTableOfContents) {
  console.log('Loading table of contents...');
  const tableOfContentsYaml = fs.readFileSync(pathToTableOfContents, 'utf8');
  return yaml.parse(tableOfContentsYaml);
}

function processArticle(pathToArticle, { stylesheets }) {
  console.log(`Generating article for ${pathToArticle}...`)
  const articleData = fs.readFileSync(pathToArticle, 'utf8');
  const lines = articleData.split('\n');
  const metadata = new Map();
  while (lines[0].startsWith('@')) {
    const line = lines.shift();
    const [key, value] = line.split(':').map(token => token.trim());
    metadata.set(key, value);
  }
  const markdown = lines.join('\n');
  const html = marked(markdown) + '<div id="end_square"></div>';

  return { metadata, html };
}

function isResourceFilename(filename) {
  return ['css', 'svg', 'gif', 'png', 'jpg', 'jpeg']
    .some(extension => filename.endsWith(extension));
}

main();