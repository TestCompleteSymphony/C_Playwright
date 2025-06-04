// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const jsonAssertion = require('soft-assert')
import addContext from 'mochawesome/addContext';


Cypress.Commands.add('softAssert', (actual, expected, message) => {

  jsonAssertion.softAssert(actual, expected, message)

  if (jsonAssertion.jsonDiffArray.length) {
    jsonAssertion.jsonDiffArray.forEach(diff => {
      const log = Cypress.log({
        name: 'Soft assertion error',
        displayName: 'softAssert',
        message: diff.error.message
      })
    })
  }
});

Cypress.Commands.add("selectCheckboxInAutoSelect", (autoSelectId, checkboxLabel) => {
  //cy.get(`#${autoSelectId}`).click();
  cy.get('.MuiCheckbox-root > .PrivateSwitchBase-input').click();
});
Cypress.Commands.add('softAssertAll', () => jsonAssertion.softAssertAll())

Cypress.Commands.add('addContext', (context) => {

  cy.once('test:after:run', (test) => addContext({ test }, context));

});
Cypress.Commands.add('execSql', (sql) => {
  if (!sql) {
    throw new Error('Query must be set')
  }

  cy.task('execSql', sql).then(response => {
    let result = []

    const flatten = r => Array.isArray(r) && r.length === 1 ? flatten(r[0]) : r;

    if (response) {
      for (let i in response) {
        result[i] = []
        for (let c in response[i]) {
          result[i][c] = response[i][c].value;
        }
      }
      result = flatten(result)
    } else {
      result = response
    }

    return result
  })

})

Cypress.Commands.add('loginBySSO', (username, password) => {
  cy.pause()
cy.visit('https://credit-data-reporting.uat.mercuria.systems/dashboard', { failOnStatusCode: false })
  cy.origin(
    'https://login.microsoftonline.com',
    {
      args: {
        username,
      },
    },
    ({ username }) => {
      cy.get('input[type="email"]').clear().type(username, {
        log: false,
      })
      cy.pause()
      cy.get('input[type="submit"]').click()
    }
  )
  cy.pause()
  // depending on the user and how they are registered with Microsoft, the origin may go to live.com
  // cy.origin(
  //   'https://login.live.com',
  //   {
  //     args: {
  //       password,
  //     },
  //   },
  //   ({ password }) => {
  //     cy.get('input[type="password"]').type(password, {
  //       log: false,
  //     })
  //     cy.get('input[type="submit"]').click()
  //     //cy.screenshot()
  //     cy.pause()
  //     cy.get('#idBtn_Back').click()
  //   }
  // )
  cy.origin('https://credit-data-reporting.uat.mercuria.systems/dashboard', { failOnStatusCode: false })
  cy.get('input[type="password"]').type(password)
  cy.get('input[type="submit"]').click()
  //cy.screenshot()
  cy.pause()
  cy.get('#idBtn_Back').click()
  cy.pause()
  cy.visit('/', { failOnStatusCode: false })
  //Ensure Microsoft has redirected us back to the sample app with our logged in user.
  // cy.url().should('equal', 'https://credit-data-reporting.uat.mercuria.systems/dashboard')
  // cy.get('#welcome-div').should(
  //     'contain',
  //     `Welcome ${Cypress.env('aad_username')}!`
  // )
  // cy.visit('https://credit-data-reporting.uat.mercuria.systems/dashboard', { failOnStatusCode: false }); // Replace with your SSO login URL
  // cy.get('input[name="username"]').type(Cypress.env('SSO_USERNAME')); // Adjust the selector as needed
  // cy.get('input[name="password"]').type(Cypress.env('SSO_PASSWORD')); // Adjust the selector as needed
  // cy.get('button[type="submit"]').click(); // Adjust the selector as needed

  // // Wait for the login to complete and the redirect to the application
  // cy.url().should('include', 'https://credit-data-reporting.uat.mercuria.systems/dashboard'); // Replace with your application's URL
});


Cypress.Commands.add("ssoLogin", (name, password) => {
  const args = {
    name,
    password

  }
  cy.visit(Cypress.config('baseUrl'),{ failOnStatusCode: false })
  //cy.session("User Session", () => {
 

  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })
  cy.wait(3000)
  //cy.get('.microsoft').click()
  cy.origin('https://login.microsoftonline.com', {
    args
  }, ({
    name,
    password

  }) => {
    cy.wait(1000)
    cy.pause()
    cy.window().then(win => win.sessionStorage.clear());
    cy.clearCookies();
    cy.clearLocalStorage()
  
    cy.wait(1000)
    cy.get('body').then((body) => {
      if (body.find('#otherTileText').length > 0) {
        cy.contains('Use another account').click()
        cy.pause(name)
        cy.get('input[type="email"]').clear().type(name)
      } else {
        cy.pause(name)
        cy.get('input[type="email"]').clear().type(name)

       // cy.pause()
        cy.get('input[type="submit"]').click()
      }
    })
    cy.pause()
  }) 
// //
//   cy.visit('/',{ failOnStatusCode: false })
//   cy.get('#idSIButton9').click()
//   cy.wait(3000)
//   cy.get('#i0118').type(password)
//   cy.contains('Sign in').click()
//   // cy.get('div.tile:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)').click()
//   // cy.task("generateOTP", token).then(token => {
//   //   cy.get("#idTxtBx_SAOTCC_OTC").type(token);
//   //   cy.get('#idSubmit_SAOTCC_Continue').click()
//   cy.wait(3000)
// //})
cy.on('uncaught:exception', (err, runnable) => {
  return false
})
//})

    




})
// cy.wait(5000)
// cy.get('body').then((body1) => {
//   cy.wait(5000)
//   if (body1.find('#idBtn_Back').is(":visible")) {
//     cy.wait(5000)
//     cy.get('#idBtn_Back').click()
//   }

// })



//hooks file

// before(() => {

//   cy.origin('https://login.microsoftonline.com', () => {
   

//   })
//   cy.on('uncaught:exception', (err, runnable) => {

//     return false

//   })
  
//   cy.window().then(win => win.sessionStorage.clear());
//   cy.clearCookies();
//   cy.clearLocalStorage()

//   cy.wait(11000)

// })


