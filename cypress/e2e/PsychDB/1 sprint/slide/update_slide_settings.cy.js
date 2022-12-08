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
            method: 'DELETE',
            url: '**/slide/**',
        }).as('matchedSlide')

        cy.login()
        cy.getExperiments()
        cy.deleteExperiment()
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
        cy.getExperiments()
        cy.deleteExperiment()
    })

    it("оригинальный сценарий - добавление слайдера, некоррекные символы, пустое поле ответов", () => {

        cy.get('input[value="Слайд 1"]')
        .clear()
        .type('t')
        
        cy.wait(700)

        cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]')
        .click()
        .wait(700)
    
        cy.contains('Слайд 2')
        .should('exist')
            
        cy.contains('Удалить слайд')
        .click()
        .wait(1000) 

        cy.contains("Отмена")
        .parent()
        .contains('Удалить')
        .click({force: true})
        .wait(1000)

        cy.wait('@matchedSlide').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })

    })

})