describe('StudyBlocks Homepage', () => {
  it('should load and display the homepage', () => {
    cy.visit('/');
    cy.contains('StudyBlocks'); // Adjust this selector to match your homepage content
  });
});
