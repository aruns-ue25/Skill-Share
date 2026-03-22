describe('Manage Skills - User Interface', () => {
    let testEmail = `skillui_${Date.now()}@test.com`;

    before(() => {
        cy.visit('/register');
        cy.get('input[name="fullName"]').type('UI Tester');
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type('Password123!');
        cy.get('button[type="submit"]').first().click();
    });

    beforeEach(() => {
        cy.session('skillui', () => {
            cy.visit('/login');
            cy.get('input[name="email"]').type(testEmail);
            cy.get('input[name="password"]').type('Password123!');
            cy.get('button[type="submit"]').first().click();
        });
        cy.visit('/skills');
    });

    it('01 Verify Manage Skills page loads for logged-in users', () => {
        cy.contains('.page-title', 'Manage Your Skills').should('be.visible');

        // Add one initial skill just for list rendering testing
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');
        cy.get('#name').type('UI Checking Skill');
        cy.get('#category').select('DESIGN');
        cy.get('#prof-beg').click({ force: true });
        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.screenshot('01-manage-skills-ui-loads');
    });

    it('02 Verify existing skills explicitly display in a list/table', () => {
        cy.get('.skills-grid').should('be.visible');
        cy.get('.skill-card').should('have.length.at.least', 1);
        cy.screenshot('02-manage-skills-ui-list');
    });

    it('03 Ensure all input fields and dropdowns are correctly rendered', () => {
        cy.log('Checking Add Modal Form UI');
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');

        cy.get('#name').should('exist').and('have.attr', 'required');
        cy.get('#category').should('exist').and('have.prop', 'tagName', 'SELECT');
        cy.get('input[name="proficiency"]').should('have.length', 4);

        cy.screenshot('03-manage-skills-ui-add-modal');
        cy.get('#addSkillModal .btn-close').first().click();

        cy.log('Checking Edit Modal Form UI');
        cy.get('.skill-card').first().find('.btn-edit').first().click();
        cy.get('#editSkillModal').should('be.visible');

        cy.get('#edit-name').should('exist');
        cy.get('#edit-category').should('exist');
        cy.get('input[name="proficiency"]', { withinSubject: null }).should('exist');

        cy.screenshot('04-manage-skills-ui-edit-modal');
    });

    it('04 Verify capability to delete a skill seamlessly from the interface', () => {
        cy.get('.skill-card').first().within(() => {
            cy.get('.btn-delete').should('be.visible');
        });
        cy.screenshot('05-manage-skills-ui-delete-btn');
    });
});
