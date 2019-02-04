// @ts-check
/**
 * @fileoverview ensure that each javascript file starts with '//@ts-check'
 * @author Stuart C. Robinson
 */
const os = require('os');

const isCheckVisualFunction = (statement) => {
  try {
    return statement.expression.callee.property.name === 'checkVisual';
  } catch (error) {
    return false;
  }
};


const containsCheckVisualStatement = (expressionStatements) => {
  if (!expressionStatements) {
    return false;
  }

  for (let i = 0; i < expressionStatements.length; i++) {
    if (isCheckVisualFunction(expressionStatements[i])) {
      return true;
    }
  }
  return false;
};


const endsWithVisualTestAssert = (statement) => {
  try {
    return statement.expression.callee.property.name === 'visualTestsPassed';
  } catch (err) {
    return false;
  }
};

module.exports = {
  meta: {
    docs: {
      description: "each 'it' test block that contains a 'checkVisual' must end with AquiferAssert.visualTestsPassed(), effectively creating soft asserts for visual tests",
      category: 'Fill me in',
      recommended: false,
    },
    fixable: 'code',
  },

  create(context) {
    return {

      ArrowFunctionExpression: (node) => {
        const expressionStatements = node.body.body;

        if (containsCheckVisualStatement(expressionStatements)) {
          const lastStatement = expressionStatements[expressionStatements.length - 1];

          if (!endsWithVisualTestAssert(lastStatement)) {
            context.report({
              message: 'test with visual test must end with AquiferAssert.visualTestsPassed()',
              loc: {
                start: lastStatement.start,
                end: lastStatement.end,
              },
              fix: fixer => fixer.replaceTextRange([lastStatement.end, lastStatement.end], `${os.EOL}AquiferAssert.visualTestsPassed();${os.EOL}`),
            });
          }
        }
      },
    };
  },
};
