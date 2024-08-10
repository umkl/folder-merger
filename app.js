import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
const __dirname = process.cwd();
const currentDirectory = __dirname;

async function moveContents(srcDir, destDir) {
	try {
		const files = await fs.readdir(srcDir);

		for (const file of files) {
			const srcPath = path.join(srcDir, file);
			const destPath = path.join(destDir, file);

			const stat = await fs.stat(srcPath);

			if (stat.isDirectory()) {
				await moveContents(srcPath, destDir);
			} else {
				await fs.rename(srcPath, destPath);
				console.log(`Moved ${srcPath} to ${destPath}`);
			}
		}
	} catch (err) {
		console.error(`Error processing directory ${srcDir}:`, err);
	}
}

export async function moveAllSubdirectoryContentsToCurrentDirectory() {
	try {
		console.log(currentDirectory);
		const files = await fs.readdir(currentDirectory);
		for (const file of files) {
			const srcPath = path.join(currentDirectory, file);
			console.log(srcPath);

			const stat = await fs.stat(srcPath);

			if (stat.isDirectory()) {
				await moveContents(srcPath, currentDirectory);
			}
		}
	} catch (err) {
		console.error(`Error reading current directory:`, err);
	}
}
