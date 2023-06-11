import React from 'react'
import NoTasks from './NoTasks'

describe('<NoTasks />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoTasks />)
    cy.get('h1').should('have.text', '')
  })
})