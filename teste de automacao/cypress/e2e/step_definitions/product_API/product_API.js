import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'


// Procure por um produto
let searchName, status
Given('o usuario deseja buscar um produto especifico', () => {
    searchName = "laptop"
})

When('o usuário digitar o nome do produto na barra de busca', () => {
    cy.GET_searchProduct(searchName)
        .then((response) => { status = response.status })
})

Then('o sistema deve apresentar os resultados de acordo com o que foi informado na busca', () => {
    cy.then(() => {
        expect(status).to.eq(200)
    })
})



// Atualize a imagem de um produto
let source, color, idProduct, fileName, message, changeConfirmation, imageId, statusHttp
const USER = Cypress.env('credentials').user
const PASSWORD = Cypress.env('credentials').password
Given('o usuario deseja alterar a imagem do produto', () => {
    source = "testUpdate"
    color = 'black'
    idProduct = 29
    fileName = "testImage.jpg"
})

When('o usuario fizer upload da imagem desejada', () => {
    cy.POST_updateImageProduct(USER, PASSWORD, source, color, idProduct, fileName)
        .then((response) => {
            statusHttp = response.status
            message = response.message
            changeConfirmation = response.changeConfirmation
            imageId = response.imageId
        })
})

Then('o sistema deve confirmar se a alteração foi efetuada com sucesso', () => {
    cy.then(() => {
        expect(message).to.eq("Product was updated successful")
        expect(changeConfirmation).to.eq(true)

        expect(imageId).to.include(`custom_image_${source}_`)

        expect(statusHttp).to.eq(200)
    })
})