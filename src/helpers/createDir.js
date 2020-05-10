import fs from 'fs';

export function createDir(path) {
    fs.rmdirSync(path, {recursive: true});
    fs.mkdirSync(path);
}