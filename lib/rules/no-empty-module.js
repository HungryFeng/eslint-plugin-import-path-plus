/**
 * @fileoverview prevent empty import
 * @author hungry
 */
'use strict';
const docsUrl = require('../docUrl');

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
      url: docsUrl('no-empty-module')
    },
    fixable: 'whitespace', // Or `code` or `whitespace`
    schema: [] // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration: (node) => {
        if (
          node.specifiers.length <= 0 &&
          context
            .getSourceCode(node)
            .getTokens(node)
            .some((token) => token.type === 'Punctuator' && token.value === '{')
        ) {
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
