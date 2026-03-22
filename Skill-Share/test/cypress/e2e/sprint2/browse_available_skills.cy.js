describe('Browse and search available skills', () => {
    let searchableSkill = `RareSkill_${Date.now()}`;
    let ownerName = `SkillOwner_${Date.now()}`;
    let ownerEmail = `owner_${Date.now()}@test.com`;

    before(() => {
        cy.visit('/register');
        cy.get('input[name="fullName"]').type(ownerName);
        cy.get('input[name="email"]').type(ownerEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').first().click();

        cy.visit('/login');
        cy.get('input[name="email"]').type(ownerEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').first().click();

        cy.visit('/skills');
        cy.get('.btn-add-skill').first().click();
        cy.get('#name').type(searchableSkill);
        cy.get('#category').select('ACADEMIC');
        cy.get('#prof-exp').click({ force: true });
        cy.get('#addSkillModal button[type="submit"]').first().click();
    });

    beforeEach(() => {
        cy.session('browseuser', () => {
            cy.visit('/login');
            cy.get('input[name="email"]').type(ownerEmail);
            cy.get('input[name="password"]').type('Tester123!');
            cy.get('button[type="submit"]').first().click();
        });
    });

    it('01 View available skills and their owner information prominently', () => {
        cy.visit('/browse');
        cy.get('.skill-row').should('have.length.at.least', 1);
        cy.screenshot('01-browse-skills-list');

        cy.get('.skill-row').first().within(() => {
            cy.get('.skill-title').should('be.visible');
            cy.get('.skill-owner').should('contain', 'Offered by');
            cy.get('.badge').should('be.visible');
        });
        cy.screenshot('02-browse-skills-owner-info');
    });

    it('02 Search skills by specific name and verify correct matches', () => {
        cy.visit('/browse');
        cy.get('input[name="q"]').type(searchableSkill);
        cy.get('button[type="submit"]').contains('Search').first().click();

        cy.get('.skill-row').should('have.length', 1);
        cy.contains('.skill-title', searchableSkill).should('be.visible');
        cy.contains('.skill-owner', ownerName).should('be.visible');
        cy.screenshot('03-browse-skills-search-match');
    });

    it('03 Open skill owner profiles from search results', () => {
        cy.visit(`/browse?q=${searchableSkill}`);
        cy.get('.skill-row').first().find('.btn-primary').contains('View Profile').first().click();

        cy.url().should('include', '/profile/');
        cy.contains(ownerName).should('be.visible');
        cy.screenshot('04-browse-skills-open-profile');
    });
});
