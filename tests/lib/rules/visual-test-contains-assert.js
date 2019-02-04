/**
 * @fileoverview ensure that each javascript file starts with &#39;//@ts-check&#39;
 * @author Stuart C. Robinson
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/visual-test-contains-assert")
var RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("visual-test-contains-assert", rule, {

  valid: [
    {
      code: `
      it('go home2', () => {
        fastWebpage.checkVisual();
  
        fastWebpage.h2.click();
  
        fastWebpage.h2.hover();
        console.log('test 2');
        AquiferAssert.visualTestsPassed();
      });
  `
    }
      ,
      {
        code: `
        it('go home2', () => {
          fastWebpage.h2.click();

          fastWebpage.h2.hover();
          console.log('test 2');
        });
    `
      }
  ],

  invalid: [
    {
      code: `
      it('go home2', () => {
        fastWebpage.checkVisual();
  
        fastWebpage.h2.click();
  
        fastWebpage.h2.hover();
        console.log('test 2');
      });
  `,
      errors: 1
    }
  ]
});
