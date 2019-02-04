# eslint-plugin-aquifer

contains 3 rules:

## starts-with-ts-check
make sure each file starts w/ //@ts-check. the editor-based typechecking has made development a lot less painless but yes just using typescript would be ideal.

## visual-test-contains-assert
make sure tests with visual regression bits ends with a certain line of code that allows the test to continue running even if a visual test fails. turns visual test asserts into "soft asserts". so the app's functionality will still be tested even if some pixels are off.

## uiContainer-child-constructor-ends-with-nameElements
make sure page object constructors end with a bit of code that ensures all web elements have been named. this makes for readable html test report. elements have nice names instead of just cryptic selectors. this is part of a goal to prioritize selector stability over readability. and also to avoid using visible element text bits in case your site develops foreign language support.


## Dev Resources

https://eslint.org/docs/developer-guide/working-with-rules

https://eslint.org/docs/developer-guide/working-with-rules#runtime-rules - Program vs IfStatement etc

simple example:

https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/src/sort.js

https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/test/sort.test.js

https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803
