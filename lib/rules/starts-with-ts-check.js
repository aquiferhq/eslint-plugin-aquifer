// @ts-check
/**
 * @fileoverview ensure that each javascript file starts with '//@ts-check'
 * @author Stuart C. Robinson
 */


const os = require('os');
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "ensure that each javascript file starts with '//@ts-check'",
      category: 'Fill me in',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const text = sourceCode.getText();

    return {

      Program: (node) => {
        if (!text.startsWith('//@ts-check') && !text.startsWith('// @ts-check')) {
          context.report({
            message: 'files gotta start with //@ts-check',
            loc: {
              start: 0,
              end: 1,
            },
            fix: fixer => fixer.replaceTextRange([0, 0], `//@ts-check${os.EOL}`),
          });
        }
      },
    };
  },
};
