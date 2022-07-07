/**
 * @fileoverview prevent empty import
 * @author hungry
 */
'use strict';

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
      description: 'prevent empty import',
      category: 'Fill me in',
      recommended: false,
      url: null // URL to the documentation page for this rule
    },
    fixable: 'whitespace', // Or `code` or `whitespace`
    schema: [] // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration: (node) => {
        if (node.specifiers.length <= 0) {
          context.report({
            node,
            message: 'remove this empty import please',
            fix: function (fixer) {
              return fixer.remove(node);
            }
          });
        }
      }
    };
  }
};
