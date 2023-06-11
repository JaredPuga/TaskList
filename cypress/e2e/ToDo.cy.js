describe('Home', () => {

  beforeEach(() => {
    cy.exec("npm run start")
  })

  it('succesfully loads', () => {
    cy.visit('http://localhost:3000')
  })
})