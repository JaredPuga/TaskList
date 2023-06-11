import ToDo from "../../src/components/ToDo"

describe('Home', () => {

  beforeEach(() => {
    // Mockear la función useAuth0
    cy.intercept('GET', '**/useAuth0').as('getAuth')
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.eval(`var useAuth0 = () => ({
          loginWithRedirect: cy.stub().as('loginWithRedirect'),
          isLoading: false,
          error: null
        })`)
      }
    })
    cy.wait('@getAuth')
  })

  it('succesfully loads', () => {
    cy.visit('http://localhost:3000')
  })

  it


})