/* eslint-disable no-undef */
describe('Login flow', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should display alert when login with wrong credentials', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder="Email"]').type('wrong@email.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button').contains('Login').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed.');
    });
  });

  it('should login successfully with correct credentials', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder="Email"]').type('uhuy@gmail.com');
    cy.get('input[placeholder="Password"]').type('uhuy123');
    cy.get('button').contains('Login').click();

    cy.get('nav').should('be.visible');
    cy.url().should('include', '/');
    cy.get('a').contains('Leaderboards').should('be.visible');
  });
});
