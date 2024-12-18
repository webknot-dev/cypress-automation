
describe('Verify login', () => {
    before(() => {
        cy.viewport(1024, 764)
    })
    it('login using credentials', () => {
        const email = 'gaurav.chugani@ae.andersen.com'
        const password = 'Praveen@2022'
        const spec = 'login.cy.js'
        cy.loginWebsite(email, password, spec);

        cy.get('#__button55-__xmlview4--taxablePersonContainer-0').click()
        cy.get('#__item142-__item143-__xmlview10--sideNavigationList-1-1 > .sapTntNavLIItem > .sapMText').click()

    });

});
