describe("удаление кнопки", () => {

    before('Выполняется один раз, не перед каждым тестом!', () => {
        cy.register()
    })

    beforeEach('Перед каждым тестом it', () => {
        cy.intercept({
            method: 'GET',
            url: Cypress.env('apiUrl') + '/user/own',
        }).as('matchedUrl')                           // Перехватываем get запрос auth me

        cy.intercept({
            method: 'POST',
            url: Cypress.env('apiUrl') + '/row',
        }).as('matchedRow')

        cy.intercept({
            method: 'POST',
            url: '**/row/**',
        }).as('matchedElement')

        cy.intercept({
            method: 'PATCH ',
            url: '**/row/**',
        }).as('matchedDeleteElement')

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

        cy.get('[data-testid="AddBoxIcon"]')
            .click({ force: true })

        cy.contains('1 столбец')
            .click()

        cy.contains('Добавить элемент')
            .click()

        cy.contains('Кнопка')
            .click()

        cy.wait('@matchedElement')
            .then(({ response }) => {
                expect(response.statusCode).to.eq(200)

            })

        cy.contains('Далее')
            .click({ force: true })
    })

    afterEach(() => {
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it("оригинальный сценарий - удаление кнопки", () => {


        cy.contains('Удалить кнопку')
            .click()

        cy.contains("Отмена")
            .parent()
            .contains('Удалить')
            .click({ force: true })
            .wait(1000)

        cy.wait('@matchedDeleteElement')
            .then(({ response }) => {
                expect(response.statusCode).to.eq(200)

            })

    })

    it("оригинальный сценарий - отмена удаления кнопки", () => {

        cy.contains('Удалить кнопку')
            .click()

        cy.contains("Отмена")
            .click({ force: true })
            .wait(1000)

        cy.contains('Далее')
            .should('exist')

    })

})