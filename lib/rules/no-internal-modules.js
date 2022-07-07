/**
 * @fileoverview no internal modules
 * @author Hungry
 */
'use strict';
import minimatch from 'minimatch'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      url: null // URL to the documentation page for this rule
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
    }, // Add a schema if the rule has options
    messages: {
      noInternalModules: 'no internal modules'
    }
  },

  create(context) {

    const reportPath = (node, option) => {
      context.report({
        node: node.source,
        messageId: 'noInternalModules',
        fix: function (fixer) {
          return fixer.replaceText(node.source, `'${option.replace}'`);
        }
      });
    };

    const reportModule = (spec, node, option, isLast) => {
      context.report({
        node: spec.imported,
        messageId: 'noInternalModules',
        fix: function (fixer) {
          return [
            fixer.removeRange([spec.range[0], isLast ? spec.range[1] : spec.range[1] + 1]),
            fixer.insertTextAfter(node, `\nimport { ${spec.imported.name} } from '${option.replace}';`)
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
          if (regexp.test(node.source.value)) {
            if (option.modules) {
              reportModuleList(node, option);
              return;
            }

            reportPath(node, option);
          }
        });
      }
    };
  }
};
