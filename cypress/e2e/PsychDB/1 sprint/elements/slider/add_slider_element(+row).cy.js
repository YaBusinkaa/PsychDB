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

    })

    afterEach(() => {
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it.skip("оригинальный сценарий - добавление слайдера, некоррекные символы, пустое поле ответов", () => {

        cy.contains('Добавить элемент')
            .click()

        cy.contains('Шкала')
            .click()

        cy.wait('@matchedElement').then(({ response }) => {
            expect(response.statusCode).to.eq(200)

        })

        cy.contains('Ответ 1')
            .click({ force: true })

        cy.wait(1000)

        cy.contains('Добавить ответ')
            .click()

        cy.wait(500)
        cy.contains('Добавить ответ')
            .click()

        cy.get('input[value="Ответ 3"]')
            .clear()
            .type('o')

        cy.get('input[value="Ответ 4"]')
            .clear()
            .wait(500)
            .type('🎄🎄🎄')
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.get('input[value="o"]')
            .clear()
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

    })

    it.skip("альтернативный сценарий - максимальное количество символов и вариантов ответа", () => {

        cy.contains('Добавить элемент')
            .click()

        cy.contains('Шкала')
            .click()

        cy.wait('@matchedElement').then(({ response }) => {
            expect(response.statusCode).to.eq(200)

        })

        cy.contains('Ответ 1')
            .click({ force: true })

        cy.wait(1000)

        cy.contains('Добавить ответ')
            .click()

        cy.wait(500)

        cy.contains('Добавить ответ')
            .click()

        cy.wait(500)

        cy.contains('Добавить ответ')
            .click()

        cy.wait(500)

        cy.contains('Добавить ответ')
            .click()

        cy.wait(500)

        cy.contains('Добавить ответ')
            .click()

        cy.contains('Добавить ответ')
            .should('be.disabled')

        cy.get('input[value="Ответ 1"]')
            .clear()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliqua')
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

    })

    it("альтернативный сценарий - минимальное количество вариантов ответа", () => {

        cy.contains('Добавить элемент')
            .click()

        cy.contains('Шкала')
            .click()

        cy.wait('@matchedElement').then(({ response }) => {
            expect(response.statusCode).to.eq(200)

        })

        cy.contains('Ответ 1')
            .click({ force: true })

        cy.wait(1000)

        cy.contains('Добавить ответ')
            .click()

        cy.wait(500)

        cy.get('input[value="Ответ 3"]')
            .parent()
            .find('[data-testid="DeleteRoundedIcon"]')
            .click()

        cy.wait('@matchedDeleteElement').then(({ response }) => {
            expect(response.statusCode).to.eq(200)

        })

        cy.get('input[value="Ответ 1"]')
            .parent()
            .find('button')
            .should('be.disabled')

        cy.get('input[value="Ответ 2"]')
            .parent()
            .find('button')
            .should('be.disabled')

    })

})