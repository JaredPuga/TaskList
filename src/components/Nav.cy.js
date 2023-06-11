import React from 'react'
import Nav from './Nav'

describe('Debe mostrar el nombre del usuario', () => {
  it('renders', () => {
    
    cy.mount(<Nav />)
    cy.get('h2').should('have.text', 'Welcome, ')
  })
})