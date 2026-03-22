describe('Public Profile Display', () => {
    let targetName = `TargetUser_${Date.now()}`;
    let targetEmail = `target_${Date.now()}@publictest.com`;
    let viewerEmail = `viewer_${Date.now()}@publictest.com`;
    let password = 'Password123!';

    it('01 Setup Target User', () => {
        cy.log('Registering Target User');
        cy.visit('/register');
        cy.get('input[name="fullName"]').type(targetName);
        cy.get('input[name="email"]').type(targetEmail);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.log('Logging in Target User to update profile');
        cy.get('input[name="email"]').type(targetEmail);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.log('Updating location to verify later');
        cy.visit('/profile/edit');
        cy.get('input[name="location"]').type('Target City View');
        cy.get('button[type="submit"]').contains('Save Profile').click();

        cy.log('Logging out Target User');
        cy.get('form[action="/logout"] button').first().click();
    });

    it('02 View Another Users Profile without Edit Permissions', () => {
        cy.log('Registering Viewer User');
        cy.visit('/register');
        cy.get('input[name="fullName"]').type('Viewer User');
        cy.get('input[name="email"]').type(viewerEmail);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.log('Logging in Viewer User');
        cy.get('input[name="email"]').type(viewerEmail);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.log('Searching for target user in active users list');
        cy.visit('/active-users');
        cy.get('input[name="search"]').type(targetName);
        cy.get('button[type="submit"]').contains('Search').click();

        cy.screenshot('01-public-profile-searched');

        cy.log('Opening users public profile');
        cy.contains('.user-card', targetName).find('.btn-view-profile').click();

        cy.log('Verifying public profile layout and information');
        cy.contains(targetName).should('be.visible');
        cy.contains('Target City View').should('be.visible');
        cy.get('.profile-avatar').should('be.visible');

        cy.screenshot('02-public-profile-loaded');

        // Check that 'Edit Profile' button is NOT visible
        cy.contains('Edit Profile').should('not.exist');
        cy.screenshot('03-public-profile-read-only');
    });
});
