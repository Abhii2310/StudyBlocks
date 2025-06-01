// Example Cypress test for login flow

describe('Login Flow', () => {
  it('should display login page and allow user to login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"], input[type="email"]').type('testuser@example.com');
    cy.get('input[name="password"], input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    // Wait for redirect or dashboard text
    cy.url().should('include', '/dashboard/my-profile');
    cy.contains(/my profile/i);
  });
});
