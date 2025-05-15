# Tests for Demobank application

## Demobank application

https://demobank.jaktestowac.pl/

Follow instructions in app README
## Prepare

### Local recommended tools:

-   VSC
-   Git
-   Node > 16

### Installation and setup

-   (optional) install VSC recommended plugins
-   install dependencies: `npm install`
-   setup Playwright with: `npx playwright install --with-deps chromium`
-   setup husky with: `npx husky init`

## Use
Run all tests:
```
npx playwright test
```
For more usage cases look in `package.json` scripts section.