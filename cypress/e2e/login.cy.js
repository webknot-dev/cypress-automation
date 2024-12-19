
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
        cy.xpath('//tr[@data-sap-ui="__item210-__xmlview9--regoverviewTable-3"]').should('exist')
        cy.xpath('//td[@id="__item210-__xmlview9--regoverviewTable-3_cell1"]').should('have.text', 'Active')
        cy.xpath('//td[@id="__item210-__xmlview9--regoverviewTable-3_cell2"]').should('have.text', '100035299500007')
        cy.get('#__item142-__item143-__xmlview10--sideNavigationList-1-1 > .sapTntNavLIItem > .sapMText').click()

        cy.scrollInView('#__title62-__container49-__xmlview14--panelScrollcontainer-3-9-inner')
    });

});