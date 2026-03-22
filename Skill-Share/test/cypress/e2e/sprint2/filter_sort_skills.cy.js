describe('Filter and sort available skills', () => {
    let testSkill = `FilterTestSkill_${Date.now()}`;
    let ownerEmail = `filterowner_${Date.now()}@test.com`;

    before(() => {
        cy.visit('/register');
        cy.get('input[name="fullName"]').type('Filter Tester');
        cy.get('input[name="email"]').type(ownerEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').first().click();

        cy.visit('/login');
        cy.get('input[name="email"]').type(ownerEmail);
        cy.get('input[name="password"]').type('Tester123!');
        cy.get('button[type="submit"]').first().click();

        cy.visit('/skills');
        cy.get('.btn-add-skill').first().click();
        cy.get('#name').type(testSkill);
        cy.get('#category').select('PROGRAMMING');
        cy.get('#prof-beg').click({ force: true });
        cy.get('#addSkillModal button[type="submit"]').first().click();

        cy.visit('/profile/edit');
        cy.get('input[name="availabilityStatus"][value="AVAILABLE"]').check();
        cy.get('button[type="submit"]').contains('Save Profile').first().click();
    });

    beforeEach(() => {
        cy.session('filteruser', () => {
            cy.visit('/login');
            cy.get('input[name="email"]').type(ownerEmail);
            cy.get('input[name="password"]').type('Tester123!');
            cy.get('button[type="submit"]').first().click();
        });
    });

    it('01 Filter active users by skill category and proficiency level', () => {
        cy.visit('/browse');

        cy.get('select[name="category"]').select('PROGRAMMING');
        cy.get('select[name="proficiency"]').select('BEGINNER');

        cy.get('.skill-row').should('be.visible');
        cy.location('search').should('include', 'category=PROGRAMMING');
        cy.location('search').should('include', 'proficiency=BEGINNER');

        cy.contains('.skill-title', testSkill).should('be.visible');
        cy.screenshot('01-filter-skills-category-prof');
    });

    it('02 Sort active skills by proficiency correctly', () => {
        cy.visit('/browse');

        cy.get('select[name="sort"]').select('proficiency');

        cy.location('search').should('include', 'sort=proficiency');
        cy.get('.skill-row').should('be.visible');

        cy.screenshot('02-sort-skills-proficiency');
    });

    it('03 Filter users specifically by Availability parameter', () => {
        cy.visit('/active-users');

        cy.get('select[name="availability"]').select('AVAILABLE');

        cy.location('search').should('include', 'availability=AVAILABLE');
        cy.get('.user-card').should('exist');

        cy.screenshot('03-filter-users-availability');
    });

    it('04 Show a “No users found” message if no matches exist natively', () => {
        cy.visit('/browse?q=NonExistentSkillSearchTerm123');

        cy.get('.empty-state').should('be.visible');
        cy.contains('No matching skills found').should('be.visible');

        cy.screenshot('04-filter-skills-empty-state');
    });
});
