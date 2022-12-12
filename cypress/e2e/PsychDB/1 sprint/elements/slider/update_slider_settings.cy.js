describe("редактирование настроек слайдера", () => {

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
            method: 'PATCH',
            url: '**/row/**',
        }).as('matchedDeleteSlider')

        cy.intercept({
            method: 'POST',
            url: '**/row/**',
        }).as('matchedElement')

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

        cy.contains('Шкала')
            .click()

        cy.wait('@matchedElement').then(({ response }) => {
            expect(response.statusCode).to.eq(200)

        })

    })

    afterEach(() => {
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it.skip("оригинальный сценарий - редактирование настроек слайдера (1 символ названия, удаление шкалы, смена верного ответа)", () => {

        cy.contains('Ответ 1')
            .click({ force: true })

        cy.wait(1000)

        cy.get('input[value="slider 11"]')
            .clear()
            .type('t')

        cy.wait(700)

        cy.get('input[value="Ответ 2"]')
            .parent()
            .parent()
            .parent()
            .find('[type="radio"]')
            .click()
            .should('be.checked')

        cy.contains('Удалить шкалу')
            .click()

        cy.contains("Отмена")
            .parent()
            .contains('Удалить')
            .click({ force: true })
            .wait(1000)

        cy.wait('@matchedDeleteSlider').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })

    })

    it("альтернативный сценарий - редактирование настроек слайдера (макс количество символов названия)", () => {

        cy.contains('Ответ 1')
            .click({ force: true })

        cy.wait(1000)

        cy.get('input[value="slider 11"]')
            .clear()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed dia')
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')
    })



})