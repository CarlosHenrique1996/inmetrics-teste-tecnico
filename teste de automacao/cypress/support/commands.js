const URL_API_CATALOG = Cypress.env('urls').url_api_catalog
const URL_API_LOGIN = Cypress.env('urls').url_api_login

Cypress.Commands.add('GET_searchProduct', (name) => {
    cy.request({
        method: 'GET',
        url: `${URL_API_CATALOG}/api/v1/products/search?name=${name}`,
        failOnStatusCode: false
    }).then((response) => {
        const status = response.status
        const qtdArray = response.body

        for (let i = 0; i < qtdArray.length; i++) {
            const nameProducts = response.body[i].products[0].productName

            expect(nameProducts.toLowerCase()).to.include(name.toLowerCase())
        }

        return cy.wrap({ status })
    })
})

Cypress.Commands.add('POST_login', (username, password) => {
    let userId, token

    const xmlRequestBody = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <AccountLoginRequest xmlns="com.advantage.online.store.accountservice">
          <loginUser>${username}</loginUser>
          <loginPassword>${password}</loginPassword>
        </AccountLoginRequest>
      </soap:Body>
    </soap:Envelope>`

    cy.request({
        method: 'POST',
        url: `${URL_API_LOGIN}/ws/AccountLoginRequest`,
        headers: {
            'accept': 'application/xml, text/xml, */*; q=0.01',
            'content-type': 'text/xml; charset=UTF-8',
            'soapaction': 'com.advantage.online.store.accountserviceAccountLoginRequest'
        },
        body: xmlRequestBody
    }).then((response) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.body, 'text/xml')
        const statusLogin = xmlDoc.getElementsByTagName('ns2:success')[0].textContent
        const msgLogin = xmlDoc.getElementsByTagName('ns2:reason')[0].textContent

        if (statusLogin === 'true') {
            userId = xmlDoc.getElementsByTagName('ns2:userId')[0].textContent
            token = xmlDoc.getElementsByTagName('ns2:token')[0].textContent
        } else {
            assert.fail(msgLogin);
        }

        return cy.wrap({ userId, token })
    })
})

Cypress.Commands.add('POST_updateImageProduct', (username, password, source, color, idProduct, fileName) => {

    cy.POST_login(username, password)
        .then((response) => {
            const userId = response.userId
            const bearerToken = response.token

            cy.fixture(fileName, 'binary')
                .then(Cypress.Blob.binaryStringToBlob)
                .then(fileContent => {
                    const formData = new FormData()
                    formData.append('file', fileContent, fileName)
                    formData.append('name', fileName)

                    cy.request({
                        method: 'POST',
                        url: `${URL_API_CATALOG}/api/v1/product/image/${userId}/${source}/${color}?product_id=${idProduct}`,
                        headers: {
                            'accept': ' */*',
                            'Authorization': `Bearer ${bearerToken}`,
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData,
                        encoding: 'binary',
                    }).then((response) => {
                        const responseBodyText = new TextDecoder('utf-8').decode(response.body)
                        const bodyJson = JSON.parse(responseBodyText)

                        const message = bodyJson.reason
                        const changeConfirmation = bodyJson.success
                        const imageId = bodyJson.imageId
                        const status = response.status

                        return cy.wrap({ message, changeConfirmation, imageId, status })
                    })
                })
        })
})