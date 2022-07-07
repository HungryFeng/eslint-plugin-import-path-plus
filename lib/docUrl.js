const pkg = require('../package.json');

const repoUrl = 'https://github.com/HungryFeng/eslint-plugin-import-path-plus';

export default function docsUrl(ruleName, commitish = `v${pkg.version}`) {
  return `${repoUrl}/blob/${commitish}/docs/rules/${ruleName}.md`;
}
