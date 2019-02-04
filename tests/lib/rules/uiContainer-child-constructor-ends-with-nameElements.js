/**
 * @fileoverview ensure that each javascript file starts with &#39;//@ts-check&#39;
 * @author Stuart C. Robinson
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/uiContainer-child-constructor-ends-with-nameElements")
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
ruleTester.run("uiContainer-child-constructor-ends-with-nameElements", rule, {

  valid: [
    {
      code: `
      export const loginPage = new class Login extends WordsmithPage {
        constructor() {
          super("/");
          this.emailInput = new UiElement('input.email').tagAsLoadCriterion();
          this.passwordInput = new UiElement('input.password').tagAsLoadCriterion();
          this.logInButton = new UiElement('input[value="Log In"]');
          this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
          this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
          this.headerLogoLink = new UiElement('.header__logo').tagAsLoadCriterion();
          this.header = new UiElement('.header').tagAsLoadCriterion();
          super.nameElements();
        }
      
        attemptLogIn(email, password, url) {
          this.load();
          this.emailInput.setValue(email);
          this.passwordInput.setValue(password, global.aquiferOptions.hidePassword);
          this.logInButton.click();
        }
      
        /** Logs in and waits for Dashboard page to load. */
        logIn(email, password, url) {
          this.attemptLogIn(email, password, url)
          dashboardPage.waitForLoad();
        }
      }();
      `
    }
    ,
    {
      code: `
        export const loginPage = new class Login extends Asfoiesuhf {
          constructor() {
            super("/");
            this.emailInput = new UiElement('input.email').tagAsLoadCriterion();
            this.passwordInput = new UiElement('input.password').tagAsLoadCriterion();
            this.logInButton = new UiElement('input[value="Log In"]');
            this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
            this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
            this.headerLogoLink = new UiElement('.header__logo').tagAsLoadCriterion();
            this.header = new UiElement('.header').tagAsLoadCriterion();
          }
        
          attemptLogIn(email, password, url) {
            this.load();
            this.emailInput.setValue(email);
            this.passwordInput.setValue(password, global.aquiferOptions.hidePassword);
            this.logInButton.click();
          }
        
          /** Logs in and waits for Dashboard page to load. */
          logIn(email, password, url) {
            this.attemptLogIn(email, password, url)
            dashboardPage.waitForLoad();
          }
        }();
        `
    }
  ],

  invalid: [
    {
      code: `
      export const loginPage = new class Login extends WordsmithPage {
        constructor() {
          super("/");
          this.emailInput = new UiElement('input.email').tagAsLoadCriterion();
          this.passwordInput = new UiElement('input.password').tagAsLoadCriterion();
          this.logInButton = new UiElement('input[value="Log In"]');
          this.toast_signedOutSuccessfully = toast.withMessage('Signed out successfully.');
          this.toast_invalidEmailOrPwd = toast.withMessage('Invalid Email or password.');
          this.headerLogoLink = new UiElement('.header__logo').tagAsLoadCriterion();
          this.header = new UiElement('.header').tagAsLoadCriterion();
        }
      
        attemptLogIn(email, password, url) {
          this.load();
          this.emailInput.setValue(email);
          this.passwordInput.setValue(password, global.aquiferOptions.hidePassword);
          this.logInButton.click();
        }
      
        /** Logs in and waits for Dashboard page to load. */
        logIn(email, password, url) {
          this.attemptLogIn(email, password, url)
          dashboardPage.waitForLoad();
        }
      }();
      `,
      errors: 1
    }
  ]
});
