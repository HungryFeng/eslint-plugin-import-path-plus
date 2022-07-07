/**
 * @fileoverview no internal modules
 * @author Hungry
 */
'use strict';
const minimatch = require('minimatch');

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
      description: 'no internal modules',
      category: 'Fill me in',
      recommended: false,
      url: null // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          target: { type: 'string' },
          replace: { type: 'string' },
          modules: { type: 'array', items: { type: 'string' } }
        }
      }
    ], // Add a schema if the rule has options
    messages: {
      noInternalModules: 'no internal modules'
    }
  },

  create(context) {
    // variables should be defined here
    const options = context.options[0] || {};
    const regexp = minimatch.makeRe(options.target);

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration: (node) => {
        if (regexp.test(node.source.value)) {
          if (options.modules) {
            node.specifiers.forEach((spec, index) => {
              if (spec.type !== 'ImportSpecifier') {
                return;
              }
              if (options.modules.includes(spec.imported.name)) {
                console.log(spec.imported.name)
                context.report({
                  node: spec.imported,
                  messageId: 'noInternalModules',
                  fix: function (fixer) {
                    return [
                      fixer.removeRange([
                        spec.range[0],
                        index === node.specifiers.length - 1 ? spec.range[1] : spec.range[1] + 1
                      ]),
                      fixer.insertTextAfter(node, `\nimport { ${spec.imported.name} } from '${options.replace}';`)
                    ];
                  }
                });
              }
            });

            return;
          }

          context.report({
            node: node.source,
            messageId: 'noInternalModules',
            fix: function (fixer) {
              return fixer.replaceText(node.source, `'${options.replace}'`);
            }
          });
        }
      }
    };
  }
};
