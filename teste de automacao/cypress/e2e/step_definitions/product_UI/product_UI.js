import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import pageProduct from '../../../pagesobjects/pageProduct.js'
const productObj = new pageProduct()

const nameProductSearch = 'tablet'

// Realize a busca de um produto
Given('que o usuario esta na pagina inicial do site', () => {
    cy.visit("/#/")
})

When('o usuario digitar o nome do produto na barra de busca', () => {
    productObj.searchProduct(nameProductSearch)
})

Then('o site deve apresentar resultados de acordo com o que foi escrito na barra de busca', () => {
    productObj.confirmationSearch(nameProductSearch)
})



// Incluir produto no carrinho
Given('que o usuario esta na pagina de produtos', () => {
    cy.visit("/#/category/Laptops/1")
})

When('o usuario vê um produto que deseja disponível', () => {
    productObj.selectProduct(1)
})

And("o usuário clica no botão 'ADD TO CART'", () => {
    productObj.addProductCart()
})

Then('o produto deve ser adicionado ao carrinho', () => {
    productObj.confirmationProductCart(1)
})



// Validar os produtos incluídos no carrinho na tela de pagamento
Given('que o usuário adicionou produtos ao carrinho', () => {
    cy.visit("/#/category/Laptops/1")
    productObj.addProductsShoppingCart()
})

When('o usuário clicar no carrinho', () => {
    productObj.shoppingCart()
})

And("clicar no botão 'CHECKOUT'", () => {
    productObj.checkout()
})

Then('os produtos adicionados ao carrinho devem ser exibidos na tela de pagamento', () => {
    productObj.confirmationOrderSummary()
})