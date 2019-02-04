// @ts-check
/**
 * @fileoverview ensure that each javascript file starts with '//@ts-check'
 * @author Stuart C. Robinson
 */


const os = require('os');

const isUiContainerChild = node => node.superClass && ['UiContainer', 'Page', 'UiElement', 'WordsmithPage', 'TableauPage'].includes(node.superClass.name);

const getConstructorStatements = (node) => {
  const methods = node.body.body;

  const constructor = methods.find(m => m.kind === 'constructor');

  const statements = constructor.value.body.body;

  return statements;
};

const isNameElements = (statement) => {
  try {
    return statement.expression.callee.object.type === 'Super' && statement.expression.callee.property.name === 'nameElements';
  } catch (err) {
    return false;
  }
};

module.exports = {
  meta: {
    docs: {
      description: 'the constructor for each child class of UiContainer must end with super.nameElements to ensure that uiElements get logged appropriately',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: 'code',
  },

  create(context) {
    return {

      ClassExpression: (node) => {
        if (isUiContainerChild(node)) {
          const statements = getConstructorStatements(node);

          const lastStatement = statements[statements.length - 1];

          if (!isNameElements(lastStatement)) {
            context.report({
              message: "UiContainer child class constructor must end with 'super.nameElements();'",
              loc: {
                start: lastStatement.start,
                end: lastStatement.end,
              },
              fix: fixer => fixer.replaceTextRange([lastStatement.end, lastStatement.end], `${os.EOL}super.nameElements();${os.EOL}`),
            });
          }
        }
      },
    };
  },
};
