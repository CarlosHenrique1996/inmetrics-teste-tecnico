class pageProduct {
    elements = {
        iptSearch: () => cy.get('#mobileSearch > .roboto-medium'),
        btnSearch: () => cy.get('#mobileSearch > #menuSearch'),
        lblNameSearch: () => cy.get('.select'),
        lblNameProduct: () => cy.get('.cell.categoryRight ul li a.productName'),
        cardProduct: (id) => cy.get(`:nth-child(${id}) > :nth-child(4) > .productName`),
        btnAddShoppingCart: () => cy.get('.fixedBtn > .roboto-medium'),
        mdlShoppingCart: () => cy.get('table'),
        lblQtdProductCart: () => cy.get('#shoppingCartLink > .cart'),
        returnOnBreadcrumbs: () => cy.get('[href=""]'),
        btnShoppingCart: () => cy.get('#shoppingCartLink'),
        btnCheckout: () => cy.get('#checkOutButton'),
        txtOrderPayment: () => cy.get('.sticky'),
        mdlOrderSummary: () => cy.get('#userCart'),
        lblQtdProductInTheOrder: () => cy.get('.itemsCount'),
    }

    searchProduct(name) {
        this.elements.iptSearch()
            .should('be.visible')
            .click()
            .type(name)

        this.elements.btnSearch()
            .should('be.visible')
            .click()
    }

    confirmationSearch(name) {
        this.elements.lblNameSearch()
            .should('be.visible')
            .and('have.text', ` Search result: "${name}" `)

        this.elements.lblNameProduct()
            .each(($text) => {
                const text = $text.text().toLowerCase()
                expect(text).to.include(name)
            })
    }

    selectProduct(id) {
        this.elements.cardProduct(id)
            .click()
    }

    addProductCart() {
        this.elements.btnAddShoppingCart()
            .click()
    }

    confirmationProductCart(qtd) {
        this.elements.mdlShoppingCart()
            .should('be.visible')

        this.elements.lblQtdProductCart()
            .should('be.visible')
            .and('have.text', qtd)
    }

    addProductsShoppingCart() {
        this.selectProduct(1)

        this.addProductCart()

        this.confirmationProductCart(1)

        this.elements.returnOnBreadcrumbs()
            .click()

        this.selectProduct(3)

        this.elements.btnAddShoppingCart()
            .click({ force: true })

        this.confirmationProductCart(2)
    }

    shoppingCart() {
        this.elements.btnShoppingCart()
            .click()
    }

    checkout() {
        this.elements.btnCheckout()
            .click()
    }

    confirmationOrderSummary() {
        const qtd = 2

        this.elements.txtOrderPayment()
            .should('be.visible')
            .and('have.text', 'ORDER PAYMENT')

        this.elements.mdlOrderSummary()
            .should('be.visible')

        this.elements.lblQtdProductInTheOrder()
            .should('be.visible')
            .and('have.text', `${qtd} ITEMS`)
    }
}
export default pageProduct