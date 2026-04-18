#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function exec(command) {
	try {
		return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
	} catch {
		return '';
	}
}

function isDependabotBranch() {
	const branch = exec('git rev-parse --abbrev-ref HEAD');
	return branch.startsWith('dependabot/');
}

function getAffectedPackages() {
	const staged = exec('git diff --cached --name-only');
	const files = staged.split('\n').filter(Boolean);
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

function hasChangeset() {
	const changesetsDir = resolve('.changeset');
	if (!existsSync(changesetsDir)) return false;

	const files = readdirSync(changesetsDir);
	return files.some((file) => file.endsWith('.md') && file !== 'README.md');
}

function createChangeset(packages) {
	const timestamp = Date.now();
	const filename = resolve('.changeset', `dependabot-${timestamp}.md`);

	const frontmatter = packages.map((pkg) => `"${pkg}": patch`).join('\n');
	const content = `---
${frontmatter}
---

Bump NPM dependencies
`;

	writeFileSync(filename, content, 'utf8');
	exec(`git add ${filename}`);
	console.log(`✓ Created changeset: ${filename}`);
}

if (isDependabotBranch() && !hasChangeset()) {
	const packages = getAffectedPackages();
	if (packages.length > 0) {
		createChangeset(packages);
	}
}
