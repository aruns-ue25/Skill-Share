describe('Implement validation and error handling for skill management', () => {
    let devEmail = `dev_${Date.now()}@validation.com`;

    before(() => {
        cy.visit('/register');
        cy.get('input[name="fullName"]').type('Validation Tester');
        cy.get('input[name="email"]').type(devEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').first().click();
    });

    beforeEach(() => {
        cy.session('validationuser', () => {
            cy.visit('/login');
            cy.get('input[name="email"]').type(devEmail);
            cy.get('input[name="password"]').type('Tester123!');
            cy.get('button[type="submit"]').first().click();
        });
        cy.visit('/skills');
    });

    it('01 Validates required fields proactively on submission', () => {
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');

        cy.get('#name').invoke('removeAttr', 'required');
        cy.get('#category').invoke('removeAttr', 'required');

        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.get('.alert-error-custom').should('be.visible');
        cy.contains('Please fix the errors in the form').should('be.visible');

        cy.screenshot('01-skill-validation-rejected');
    });

    it('02 Ensures skill name cannot be empty and attributes validated', () => {
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');

        cy.get('#category').select('DESIGN');
        cy.get('#prof-int').click({ force: true });
        cy.get('#name').invoke('removeAttr', 'required');

        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.contains('.alert-error-custom', 'errors').should('be.visible');
        cy.screenshot('02-skill-validation-name-rejected');
    });

    it('03 Ensures category and proficiency level must be explicitly selected', () => {
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');

        cy.get('#name').type('Broken Skill Testing');
        cy.get('#category').invoke('removeAttr', 'required');
        cy.get('input[name="proficiency"]').invoke('removeAttr', 'required');

        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.contains('.alert-error-custom', 'errors').should('be.visible');
        cy.screenshot('03-skill-validation-dropdowns-rejected');
    });

    it('04 Valid skill entries are natively accepted without errors', () => {
        cy.get('.btn-add-skill').first().click();
        cy.get('#addSkillModal').should('be.visible');

        cy.get('#name').type('Validation Passed Skill');
        cy.get('#category').select('OTHER');
        cy.get('#prof-beg').click({ force: true });

        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.contains('.alert-success-custom', 'successfully').should('be.visible');
        cy.get('.skills-grid').contains('Validation Passed Skill').should('be.visible');
        cy.screenshot('04-skill-validation-success-accepted');
    });
});
