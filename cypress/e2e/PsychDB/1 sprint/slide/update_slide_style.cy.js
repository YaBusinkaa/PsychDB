describe("редактирование стилей слайда", () => {

    before('Выполняется один раз, не перед каждым тестом!', () => {
        cy.register()
    })

    beforeEach('Перед каждым тестом it', () => {
        cy.intercept({
            method: 'GET',
            url: Cypress.env('apiUrl') + '/user/own',
        }).as('matchedUrl')                           // Перехватываем get запрос auth me

        cy.intercept({
            method: 'PATCH',
            url: Cypress.env('apiUrl') + '/row/**',
        }).as('matchedPatch')

        cy.login()
        cy.getExperiments()
        cy.deleteExperiment()
        cy.createExperiment('testtest', 'id_experiment')
        //cy.createSlide('id_experiment', 'id_slide')

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

    it("оригинальный сценарий - редактирование стилей слайда", () => {

        cy.wait(700)
        cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]')
        .click({force: true})
        .wait(700)
    
        cy.contains('Слайд 2')
        .should('exist')

        //применение стиля для слайда
        cy.contains("СТИЛИ")
            .click({ force: true })

        cy.get('[type="text"]')
            .click({ force: true })

        cy.get('[value="#FFFFFF"]')
            .click({ force: true })
            .clear()
            .wait(700)
            .type("#bf28a6")
            .wait(500)

        //применение стиля для всех слайдов
        cy.contains("СТИЛИ")
            .click({ force: true })
            .wait(500)

        cy.contains("Применить ко всем слайдам")
            .click({ force: true })
            .wait(500)

        cy.contains("Слайд 1")
            .click({ force: true })

        cy.get('[color="#bf28a6"]')
            .should('exist')
            .wait(500)

        cy.contains("Слайд 2")
            .click({ force: true })

        cy.get('[color="#bf28a6"]')
            .should('exist')
            .wait(500)

    })

})