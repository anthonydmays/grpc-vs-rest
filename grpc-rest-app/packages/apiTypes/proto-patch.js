// proto-patch.js
import fs from 'fs';
import glob from 'glob';

const protoRoot = 'src';

glob(protoRoot + '/**/*.ts', async (err, files) => {
  files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf-8');

    content = content
      .split('\n')
      .map((s) => s.replace(/^(import .+? from ["']\..+?)(["'];)$/, '$1.js$2'))
      .join('\n');

    fs.writeFileSync(file, content, 'utf-8');
  });
});
