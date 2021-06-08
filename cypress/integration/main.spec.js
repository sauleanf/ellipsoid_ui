import _ from 'lodash';

context('Map Page', () => {
  const routes = [
    'locations',
    'newspapers',
  ];
  const inputText = 'my_location';

  beforeEach(() => {
    _.map(routes, (route) => cy.stubRoute(route));
  });

  it('allows the user to search', () => {
    cy.visit('localhost:3000');
    cy.get('[test-id=navbar-container] input').scrollIntoView().type(inputText);
    cy.get('[test-id=navbar-container] input').should('have.value', inputText);
    cy.get('[test-id=navbar-container] button').click();
    cy.get('[test-id=navbar-container] input').should('have.value', '');
  });

  it('renders the map', () => {
    cy.get('[test-id=map-page-container]');
  });
});
