describe('Browse and Search Users', () => {
    let searchableUser = `SkillUser_${Date.now()}`;
    let userEmail = `skill_${Date.now()}@searchtest.com`;
    let seekerEmail = `seeker_${Date.now()}@searchtest.com`;

    before(() => {
        // Register the user to be searched
        cy.visit('/register');
        cy.get('input[name="fullName"]').type(searchableUser);
        cy.get('input[name="email"]').type(userEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').click();

        // Register seeker
        cy.visit('/register');
        cy.get('input[name="fullName"]').type('Seeker User');
        cy.get('input[name="email"]').type(seekerEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').click();
    });

    it('01 Browse Users with Search Keywords', () => {
        cy.log('Logging in');
        cy.visit('/login');
        cy.get('input[name="email"]').type(seekerEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').click();

        cy.log('Navigating to Users Browse Page');
        cy.visit('/active-users');
        cy.screenshot('01-browse-users-initial');

        cy.log('Entering search keywords');
        cy.get('input[name="search"]').type(searchableUser);
        cy.screenshot('02-browse-users-search-input');
        cy.get('button[type="submit"]').contains('Search').click();

        cy.log('Verifying matching users');
        cy.get('.user-card').should('contain', searchableUser);
        cy.screenshot('03-browse-users-search-result');

        cy.log('Opening profile from search results');
        cy.contains('.user-card', searchableUser).find('.btn-view-profile').click();
        cy.url().should('include', '/profile/');
        cy.screenshot('04-browse-users-profile-opened');
    });
});
