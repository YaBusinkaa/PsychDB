describe("редактирование настроек эксперимента", () => {

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
            url: '**/experiment/settings/**',
        }).as('matchedUpdateExperiment')

        cy.login()
        cy.getExperiments('testtest', 'id_experiment')
        cy.deleteExperiment('id_experiment')
        cy.getExperiments('t', 'id_experiment')
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
        cy.getExperiments('t', 'id_experiment')
        cy.deleteExperiment('id_experiment')
    })

    it("оригинальный сценарий - добавление слайдера, некоррекные символы, пустое поле ответов", () => {

        cy.get('[data-testid="SettingsOutlinedIcon"]')
        .click()
        .wait(700)

        cy.get('input[value="testtest"]')
        .clear()
        .type('t')
    
        cy.get('input[value="Петр Петров"]')
        .clear()
        .type('t')

        cy.contains('Сохранить изменения')
        .click()

        cy.wait('@matchedUpdateExperiment').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })

    })

})