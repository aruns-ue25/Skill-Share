describe('Active Users Page Features', () => {
    let testEmail = `active_${Date.now()}@test.com`;
    let userName = `ActiveTester_${Date.now()}`;

    before(() => {
        cy.visit('/register');
        cy.get('input[name="fullName"]').type(userName);
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').click();
    });

    it('01 Active Users Accessibility and Elements', () => {
        cy.log('Logging in');
        cy.visit('/login');
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').click();

        cy.log('Accessing Active Users List');
        cy.visit('/active-users');

        // Let the cards load
        cy.get('.user-grid').should('be.visible');
        cy.screenshot('01-active-users-list-loaded');

        // Check grid elements
        cy.get('body').then(($body) => {
            if ($body.find('.user-card').length > 0) {
                cy.log('Verifying user cards structure');
                cy.get('.user-card').first().within(() => {
                    cy.get('.user-avatar').should('be.visible');
                    cy.get('.user-name').should('be.visible');
                    cy.get('.status-dot').should('be.visible');
                    cy.get('.btn-view-profile').should('be.visible');
                });

                cy.log('Verifying logged-in user is NOT displayed in list');
                cy.get('.user-card').should('not.contain', userName);
            } else {
                cy.log('Verifying empty state');
                cy.contains('No users found').should('be.visible');
            }
        });

        cy.screenshot('02-active-users-verified');
    });
});
