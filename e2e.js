// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
//import  'cypress-ag-grid';
import 'cypress-mochawesome-reporter/register';
import 'cypress-get-table';
import 'cypress-plugin-tab';
import 'mysql'
import 'cypress-if'
import "cypress-real-events/support"
import "mochawesome/src/addContext"
import '@shelex/cypress-allure-plugin';

const addContext = require('mochawesome/src/addContext')


//import 'tedious'


// module.exports = (on, config) => {

//     on('task', {
//         execSql: sql => {
//             return queryTestDb(sql, config.env.dbConnect)
//         },
//     })

//     return config
// }



function loginViaAAD(username, password) {
    cy.visit('https://credit-data-reporting.uat.mercuria.systems/dashboard', { failOnStatusCode: false })
    cy.origin(
        'login.microsoftonline.com',
        {
            args: {
                username,
            },
        },
        ({ username }) => {
            cy.get('input[type="email"]').type(username, {
                log: false,
            })
            cy.get('input[type="submit"]').click()
        }
    )

    // depending on the user and how they are registered with Microsoft, the origin may go to live.com
    cy.origin(
        'login.live.com',
        {
            args: {
                password,
            },
        },
        ({ password }) => {
            cy.get('input[type="password"]').type(password, {
                log: false,
            })
            cy.get('input[type="submit"]').click()
            //cy.screenshot()
            cy.pause()
            cy.get('#idBtn_Back').click()
        }
    )
    cy.pause()
    cy.visit('/', { failOnStatusCode: false })
    //Ensure Microsoft has redirected us back to the sample app with our logged in user.
    // cy.url().should('equal', 'https://credit-data-reporting.uat.mercuria.systems/dashboard')
    // cy.get('#welcome-div').should(
    //     'contain',
    //     `Welcome ${Cypress.env('aad_username')}!`
    // )
}


//const tedious = require('tedious')



// Cypress.Commands.add('sqlServerDB1', (sqlquery) => {
//     if (!sqlquery) {
//         throw new Error('Query must be set')
//     }

//     cy.task('sqlServerDB1', sqlquery).then(response => {
//         let result = []

//         const flatten = (r) => Array.isArray(r) && r.length === 1 ? flatten(r[0]) : r;

//         if (response) {
//             for (let i in response) {
//                 result[i] = []
//                 for (let c in response[i]) {
//                     result[i][c] = response[i][c].column;

//                 }
//             }
//             result = flatten(result)
//         } else {
//             result = response
//         }
//         cy.log(result)
//         return result
//     })
// })


// Cypress.Commands.add('loginToAAD', (username, password) => {
//     const log = Cypress.log({
//         displayName: 'Azure Active Directory Login',
//         message: [`🔐 Authenticating | ${username}`],
//         autoEnd: false,
//     })
//     log.snapshot('before')

//     loginViaAAD(username, password)

//     log.snapshot('after')
//     log.end()
// })


