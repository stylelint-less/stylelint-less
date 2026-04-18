#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function exec(command) {
	try {
		return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
	} catch {
		return '';
	}
}

function isProductionDependencies() {
	const message = exec('git log -1 --pretty=%B');
	return message.includes('production-dependencies');
}

function getAffectedPackages() {
	const changed = exec('git diff --name-only HEAD~1 HEAD');
	const files = changed.split('\n').filter(Boolean);
	const packageJsonFiles = files.filter((file) => file.endsWith('package.json'));

	const packages = [];
	for (const file of packageJsonFiles) {
		if (file === 'package.json') continue;
		try {
			const content = readFileSync(file, 'utf8');
			const pkg = JSON.parse(content);
			if (pkg.name && !pkg.private) {
				packages.push(pkg.name);
			}
		} catch {}
	}

	return packages;
}

function createChangeset(packages) {
	const timestamp = Date.now();
	const filename = resolve('.changeset', `dependabot-${timestamp}.md`);
	const frontmatter = packages.map((pkg) => `"${pkg}": patch`).join('\n');
	const content = `---\n${frontmatter}\n---\n\nBump NPM dependencies\n`;

	writeFileSync(filename, content, 'utf8');
	console.log(`✓ Created changeset: ${filename}`);
}

if (!isProductionDependencies()) {
	console.log('ℹ Skipping: not production dependencies');
	process.exit(0);
}

const packages = getAffectedPackages();
if (packages.length === 0) {
	console.log('ℹ No affected packages found');
	process.exit(0);
}

createChangeset(packages);
