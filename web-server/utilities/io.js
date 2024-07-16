// buildMenuFromFiles.mjs
import { readdir, lstat } from 'fs/promises';
import { join, parse } from 'path';

export async function buildMenuFromFiles(directoryPath, menuName = 'Resources') {
    try {
        const files = await readdir(directoryPath);

        const submenu = [];
        for (const file of files) {
            const fullPath = join(directoryPath, file);
            const stat = await lstat(fullPath);
            if (stat.isFile()) {
                const { name } = parse(file); // Remove extension
                submenu.push({ name, link: `/${name.toLowerCase().replace(/ /g, '-')}` });
            }
        }

        return { name: menuName, submenu };
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}
