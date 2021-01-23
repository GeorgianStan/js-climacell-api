const fs = require('fs');
const { join } = require('path');

const TARGET = './dist';

fs.readdirSync('./dist').forEach((file) => {
  const path = join(TARGET, file);
  fs.copyFileSync(path, join(__dirname, file));
});
