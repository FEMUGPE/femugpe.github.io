import 'babel-polyfill';
import fs from 'fs';
import path from 'path';


const searchFiles = (pathName = './js', type) => {
  if (fs.existsSync(pathName)) {
    console.warn(`No dir ${pathName}`);
  }
  const reader = fs.readdirSync(path.resolve(pathName));
  const swFiles = reader.map(item => `${pathName}/${item}`);
  return swFiles;
};


// const args = [{dir: './talks'}];

console.log(searchFiles('./talks/femugpe-1', 'ddd'));
