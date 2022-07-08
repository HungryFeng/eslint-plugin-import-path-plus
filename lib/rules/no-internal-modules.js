/**
 * @fileoverview no internal modules
 * @author Hungry
 */
'use strict';
const minimatch = require('minimatch');
const docsUrl = require('../docUrl');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      url: docsUrl('no-internal-modules') // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          target: { type: 'string' },
          replace: { type: 'string' },
          modules: { type: 'array', items: { type: 'string' } }
        }
      }
    },
    messages: {
      'replace-path': "replace the path '{{ target }}' with '{{ replace }}' please",
      'replace-module': "import the module '{{ name }}' from '{{ replace }}' please"
    }
  },

  create(context) {
    const reportPath = (node, option) => {
      context.report({
        node: node.source,
        messageId: 'replace-path',
        data: { target: node.source.value, replace: option.replace },
        fix: function (fixer) {
          return fixer.replaceText(node.source, `'${option.replace}'`);
        }
      });
    };

    const reportModule = (spec, node, option, isLast) => {
      const moduleName =
        spec.imported.name == spec.local.name ? spec.imported.name : `${spec.imported.name} as ${spec.local.name}`;
      context.report({
        node: spec.imported,
        messageId: 'replace-module',
        data: { name: moduleName, replace: option.replace },
        fix: function (fixer) {
          return [
            fixer.removeRange([spec.range[0], isLast ? spec.range[1] : spec.range[1] + 1]),
            fixer.insertTextAfter(node, `\nimport { ${moduleName} } from '${option.replace}';`)
          ];
        }
      });
    };

    const reportModuleList = (node, option) => {
      node.specifiers.forEach((spec, index) => {
        if (spec.type !== 'ImportSpecifier') {
          return;
        }
        if (option.modules.includes(spec.imported.name)) {
          reportModule(spec, node, option, index === node.specifiers.length - 1);
        }
      });
    };

    return {
      ImportDeclaration: (node) => {
        context.options.forEach((option) => {
          const regexp = minimatch.makeRe(option.target);
          if (!regexp.test(node.source.value)) {
            return;
          }

          if (option.modules) {
            reportModuleList(node, option);
            return;
          }

          reportPath(node, option);
        });
      }
    };
  }
};
