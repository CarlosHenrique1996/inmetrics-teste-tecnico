Feature: Produtos

  Scenario: Realize a busca de um produto
    Given que o usuario esta na pagina inicial do site
    When o usuario digitar o nome do produto na barra de busca
    Then o site deve apresentar resultados de acordo com o que foi escrito na barra de busca

  Scenario: Incluir produto no carrinho
    Given que o usuario esta na pagina de produtos
    When o usuario vê um produto que deseja disponível
    And o usuário clica no botão 'ADD TO CART'
    Then o produto deve ser adicionado ao carrinho

  Scenario: Validar os produtos incluídos no carrinho na tela de pagamento
    Given que o usuário adicionou produtos ao carrinho
    When o usuário clicar no carrinho
    And  clicar no botão 'CHECKOUT'
    Then os produtos adicionados ao carrinho devem ser exibidos na tela de pagamento