describe("настройки эксперимента", () => {

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
            url: '**/experiment/**',
        }).as('matchedPatchExperiment')

        cy.login()
        cy.getExperiments()
        cy.deleteExperiment()
        cy.visit(Cypress.env('baseUrl'))
            .wait(2000)
        cy.wait("@matchedUrl")

        cy.contains("Конструктор")
            .click({ force: true })
            .wait(400)

        cy.get('input[type="text"]')
            .eq(0)
            .type('testtest')
            .wait(400)

        cy.contains('Для настольных компьютеров')
            .click()
            .wait(400)

        cy.contains('Создать эксперимент')
            .click()
            .wait(400)

    })

    afterEach(() => {
        cy.getExperiments()
        cy.deleteExperiment()
    })

    it("оригинальный сценарий - изменение названия (1 символ в названии)", () => {

        cy.wait(700)
        cy.get('[data-testid="SettingsOutlinedIcon"]')
            .click()
            .wait(700)

        cy.get('[value="testtest"]')
            .clear()
            .type('t')

        cy.get('[value="Петр Петров"]')
            .clear()
            .should('be.empty')

        cy.contains('Сохранить изменения')
            .click({ force: true })

        cy.wait('@matchedPatchExperiment').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })

    })

    it.skip("альтрнативный сценарий - макс допустимое количество символов", () => {


        cy.wait(700)
        cy.get('[data-testid="SettingsOutlinedIcon"]')
            .click()
            .wait(700)

        cy.get('[value="testtest"]')
            .clear()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed di')

        cy.get('[value="Петр Петров"]')
            .clear()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea c')

        cy.get('textarea')
            .parent()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea c')

        cy.contains('Сохранить изменения')
            .click({ force: true })

        cy.get('[data-nimg="intrinsic"]')
            .click({ force: true })


    })

    it.skip("альтрнативный сценарий - макс количество  символов", () => {

        cy.wait(700)
        cy.get('[data-testid="SettingsOutlinedIcon"]')
            .click()
            .wait(700)

        cy.get('[value="testtest"]')
            .clear()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscincg elit, sed di')
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.get('[value="Петр Петров"]')
            .clear()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscincg elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea c')
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.get('textarea')
            .parent()
            .type('Lorem ipsum dolor sit amet, consectetuer adipiscicng elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea c')
            .parent()
            .find('fieldset')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)')

        cy.contains('Сохранить изменения')
            .should('be.disabled')
    })

})