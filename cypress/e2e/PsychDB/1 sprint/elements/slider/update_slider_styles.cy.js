describe("редактирование стилей слайдера", () => {

    before('Выполняется один раз, не перед каждым тестом!', () => {
        cy.register()
    })

    beforeEach('Перед каждым тестом it', () => {
        cy.intercept({
            method: 'GET',
            url: Cypress.env('apiUrl') + '/user/own',
        }).as('matchedUrl')                           // Перехватываем get запрос auth me

        cy.login()
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
        cy.createExperiment('testtest', 'id_experiment')

        cy.visit(Cypress.env('baseUrl'))
            .wait(2000)

        cy.wait("@matchedUrl")

        cy.get('[type="button"]')
            .contains('В конструктор')
            .click({ force: true })
            .wait(400)

    })

    afterEach(() => {
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it("оригинальный сценарий - изменение стилей слайдера", () => {

        cy.contains("СТИЛИ")
        .click({ force: true })

        cy.get('input[type="number"]')
        .clear()
        .type('25')
        
        cy.wait(700)

        cy.get('input[type="number"]')
            .click({ force: true })

        cy.get('[value="#FFFFFF"]')
            .click({ force: true })
            .clear()
            .wait(700)
            .type("#941606")
            .wait(500)

    })

})