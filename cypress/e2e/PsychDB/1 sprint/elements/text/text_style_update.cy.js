describe("добавление слайдера и строки", () => {

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

        cy.contains('Текст')
            .click()

        cy.wait('@matchedElement')
            .then(({ response }) => {
                expect(response.statusCode).to.eq(200)

            })
        cy.get('[placeholder="Введите текст"]')
            .type("t")
            .wait(700)//добавление текста в текст

    })

    afterEach(() => {
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it.skip("оригинальный сценарий - изменение размера и цвета шрифта на валидные данные", () => {

        //размер текста 
        cy.contains("СТИЛИ")
            .click({ force: true })

        cy.get('[type="number"]')
            .click({ force: true })
            .clear()
            .wait(700)
            .type("20")

        //цвет текста

        cy.get('[color="#000000"]')
            .eq(0)
            .click({ force: true })

        cy.get('[value="#000000"]')
            .click({ force: true })
            .clear()
            .wait(700)
            .type("#7a18a8")

    })

    it("альтернативный сценарий - изменение размера и цвета шрифта на невалидные данные", () => {

        //размер текста 
        cy.contains("СТИЛИ")
            .click({ force: true })

        cy.get('[type="number"]')
            .click({ force: true })
            .clear()
            .wait(700)
            .type("60")
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.contains('Размер текста')
            .click({ force: true })

        cy.get('[type="number"]')
            .should('have.value', '32')

    })

})