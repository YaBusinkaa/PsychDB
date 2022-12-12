describe("редактирование настроек кнопки", () => {

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

    it.skip("оригинальный сценарий - настройки кнопки 1 символ в названии", () => {

        cy.contains('Далее')
            .click({ force: true })

        cy.get('[type="text"]')
            .eq(1)
            .clear()
            .wait(700)
            .type("r")

        cy.wait('@matchedUpdateElement')
            .then(({ response }) => {
                expect(response.statusCode).to.eq(200)

            })

    })

    it.skip("альтернативный сценарий - настройки, макс допустимое количество символов в названии и тексте", () => {

        cy.contains('Далее')
            .click({ force: true })

        cy.get('[type="text"]')
            .eq(0)
            .clear()
            .wait(700)
            .type("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed di")

        cy.get('[type="text"]')
            .eq(1)
            .clear()
            .wait(700)
            .type("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, se")

        cy.wait('@matchedUpdateElement')
            .then(({ response }) => {
                expect(response.statusCode).to.eq(200)

            })
    })

    it.skip("альтернативный сценарий - настройки, макс количество символов в названии и тексте", () => {

        cy.contains('Далее')
            .click({ force: true })

        cy.get('[type="text"]')
            .eq(0)
            .clear()
            .wait(700)
            .type("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, seс")
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.get('[type="text"]')
            .eq(1)
            .clear()
            .wait(700)
            .type("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolorд sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diaLorem ipsum dolor sit amet, consectetuer adipiscing elit, se")
            .parent()
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

    })

    it.skip("альтернативный сценарий - некорректные символы в текстовых полях", () => {

        cy.contains('Далее')
            .click({ force: true })

        cy.get('[type="text"]')
            .eq(0)
            .clear()
            .wait(700)
            .type("🎄🎄🎄")
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.get('[type="text"]')
            .eq(1)
            .clear()
            .wait(700)
            .type("🎄🎄🎄")
            .parent()
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')
    })

    it("альтернативный сценарий - пустые текстовые поля", () => {

        cy.contains('Далее')
            .click({ force: true })

        cy.get('[type="text"]')
            .eq(0)
            .clear()
            .wait(700)
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.get('[type="text"]')
            .eq(1)
            .clear()
            .wait(700)
            .parent()
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')
    })


})