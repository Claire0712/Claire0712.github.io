import { cp, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'docs');
const directories = ['assets', 'MMM2027', 'PKUcourse'];
const files = ['index.html', 'LSGI2801.pdf', 'LSGI2801_Assignment.pdf'];

await mkdir(output, { recursive: true });
await Promise.all(directories.map((directory) => cp(resolve(root, directory), resolve(output, directory), { recursive: true, force: true })));
await Promise.all(files.map((file) => cp(resolve(root, file), resolve(output, file), { force: true })));
await writeFile(resolve(output, '.nojekyll'), '# Static GitHub Pages deployment.\n');
