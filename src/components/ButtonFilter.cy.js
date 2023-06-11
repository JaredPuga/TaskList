import React from 'react'
import ButtonFilter from './ButtonFilter'

describe('ButtonFilter', () => {
  it('debe tener la clase "text-white" cuando esté activo', () => {
    cy.mount(<ButtonFilter action={() => {}} active="Active Filter" filter="Active Filter" />)
    cy.get('button').should('have.class', 'text-white')
  })

  it('debe llamar a la función de acción cuando se haga clic', () => {

    const actionSpy = cy.spy()

    cy.mount(<ButtonFilter action={actionSpy} active="Active Filter" filter="Active Filter" />)

    cy.get('button').click()

    cy.wrap(actionSpy).should('be.called')
  })
})
