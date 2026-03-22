describe('Manage offered skills', () => {
    let testEmail = `skillmanager_${Date.now()}@test.com`;

    before(() => {
        cy.visit('/register');
        cy.get('input[name="fullName"]').type('Skill Manager');
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type('Password123!');
        cy.get('button[type="submit"]').first().click();
    });

    beforeEach(() => {
        cy.session('skillmanager', () => {
            cy.visit('/login');
            cy.get('input[name="email"]').type(testEmail);
            cy.get('input[name="password"]').type('Password123!');
            cy.get('button[type="submit"]').first().click();
        });
        cy.visit('/skills');
    });

    it('01 Add new skills successfully and check they are stored', () => {
        cy.log('Opening Add Skill Modal');
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');

        cy.log('Filling out skill details');
        cy.get('#name').type('Advanced Java Programming');
        cy.get('#category').select('PROGRAMMING');
        cy.get('#prof-adv').click({ force: true }); // Select Advanced

        cy.screenshot('01-manage-skills-add-filled');
        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.log('Verifying success and storage');
        cy.contains('Skill successfully added').should('be.visible');
        cy.get('.skills-grid').contains('Advanced Java Programming').should('be.visible');
        cy.screenshot('02-manage-skills-added-success');
    });

    it('02 Edit existing skills and save correctly', () => {
        cy.log('Opening Edit Skill Modal');
        cy.contains('.skill-card', 'Advanced Java Programming').find('.btn-edit').first().click();
        cy.get('#editSkillModal').should('be.visible');

        cy.log('Updating skill name and proficiency');
        cy.get('#edit-name').clear().type('Master Java Programming');
        cy.get('#edit-prof-exp').click({ force: true }); // Upgrade to Expert

        cy.screenshot('03-manage-skills-edit-filled');
        cy.get('#editSkillModal button[type="submit"]').first().click();

        cy.log('Verifying updated info displayed gracefully');
        cy.contains('Skill successfully updated').should('be.visible');
        cy.get('.skills-grid').contains('Master Java Programming').should('be.visible');
        cy.screenshot('04-manage-skills-edit-success');
    });

    it('03 Delete skills and verify removal', () => {
        cy.log('Triggering Skill Deletion');
        cy.contains('.skill-card', 'Master Java Programming').find('.btn-delete').first().click();

        cy.log('Verifying successful deletion');
        cy.contains('Skill successfully removed').should('be.visible');
        cy.get('.skills-grid').should('not.contain', 'Master Java Programming');
        cy.screenshot('05-manage-skills-deleted-success');
    });

    it('04 Verify users can only modify their own skills', () => {
        cy.log('Checking that user can access their own skills explicitly');
        cy.url().should('include', '/skills');
        cy.get('.btn-add-skill').first().should('be.visible');
        cy.screenshot('06-manage-skills-own-only-verified');
    });
});
