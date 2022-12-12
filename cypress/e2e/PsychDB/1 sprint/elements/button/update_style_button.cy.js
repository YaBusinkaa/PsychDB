describe("редактирование стилей кнопки", () => {

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
        }).as('matchedUpdateElement')

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


    })

    afterEach(() => {
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it.skip("оригинальный сценарий - настройки стилей кнопки", () => {

        cy.contains('Далее')
            .click({ force: true })
        //размер текста кнопки
        cy.contains("СТИЛИ")
            .click({ force: true })

        cy.contains('Размер текста')
            .parent()
            .find('input')
            .clear()
            .wait(700)
            .type("25")

        //цвет текста кнопки

        cy.contains('Цвет текста')
            .parent()
            .find('input')
            .click({force:true})
            .get('input[value="#FFFFFF"]')
            .clear()
            .wait(700)
            .type("#7aba3a")


        //цвет кнопки

        cy.contains('Цвет заливки')
            .parent()
            .find('input')
            .click({force:true})
            .get('input[value="#1976D2"]')
            .clear()
            .wait(700)
            .type("#a81832")

        cy.wait('@matchedUpdateElement')
            .then(({ response }) => {
                expect(response.statusCode).to.eq(200)

            })

    })

    it("альтернативный сценарий - настройки стилей кнопки невалидные данные", () => {

        cy.contains('Далее')
            .click({ force: true })
        //размер текста кнопки
        cy.contains("СТИЛИ")
            .click({ force: true })

        cy.contains('Размер текста')
            .parent()
            .find('input')
            .clear()
            .wait(700)
            .type("55")
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

    })


})