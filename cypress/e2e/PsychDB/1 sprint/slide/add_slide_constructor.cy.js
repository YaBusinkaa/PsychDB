describe("Слайд", () => {

    before('Выполняется один раз, не перед каждым тестом!', () => {
        cy.register()
    })

    beforeEach('Перед каждым тестом it', () => {
        cy.intercept({
            method: 'GET',
            url: Cypress.env('apiUrl')+'/user/own',
        }).as('matchedUrl')                           // Перехватываем get запрос auth me

        cy.intercept({
            method: 'PATCH',
            url: Cypress.env('apiUrl')+'/row/**',
        }).as('matchedPatch') 

        cy.login()
        cy.getExperiments()
        cy.deleteExperiment()
        cy.visit(Cypress.env('baseUrl'))
        .wait(2000)
        cy.wait("@matchedUrl")

        cy.contains("Конструктор")
        .click({force: true})
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

    afterEach(()=>{
        cy.getExperiments()
        cy.deleteExperiment()
    })

    it.skip ("оригинальный сценарий - создание и переименование (1 символ в названии)", () => {

        //добавление слайда
    cy.wait(700)
    cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]')
    .click({force: true})
    .wait(700)

    cy.contains('Слайд 2')
    .should('exist')

    //переименование слайда
    cy.get('input[value="Слайд 2"]')
    .clear()
    .type('t')
    })

    it.skip ("альтернативный сценарий - существующее название слайда", () => {

        //добавление слайда

    cy.wait(700)
    cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]')
    .click({force: true})
    .wait(700)

    cy.contains('Слайд 2')
    .should('exist')

    //переименование слайда
    cy.get('input[value="Слайд 2"]')
    .clear()
    .type('Слайд 1')

    cy.contains('Слайд с таким названием уже существует')
     .should('exist')
    
    // cy.contains("НАСТРОЙКИ").click({force: true}).wait(1000)
        
    // cy.get('[data-testid="DeleteOutlinedIcon"]').click({force: true}).wait(1000) 
    // cy.contains("Отмена").parent().contains('Удалить').click({force: true}).wait(1000)

    })
    it ("альтернативный сценарий - Пустое поле названия слайда", () => {

        //добавление слайда

    cy.wait(700)
    cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]')
    .click({force: true})
    .wait(700)

    cy.contains('Слайд 2')
    .should('exist')

    //переименование слайда
    cy.get('input[value="Слайд 2"]')
    .clear()

    cy.get('label').contains('Название слайда')
    .parent()
    .find('fieldset')
    .should('have.css', 'border-color', 'rgb(244, 67, 54)')
   
    // cy.contains("НАСТРОЙКИ").click({force: true}).wait(1000)
        
    // cy.get('[data-testid="DeleteOutlinedIcon"]').click({force: true}).wait(1000) 
    // cy.contains("Отмена").parent().contains('Удалить').click({force: true}).wait(1000)
    
    })

    //уникальное знач слайда прописать тест
    it.skip ("Проверка на уникальность названия слайда", () => {
        //проверка на уникальность названия слайда 
        cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]').wait(500).click({force: true}).wait(500)
    cy.contains("Слайд 2").click({force: true}).wait(700)
    cy.get('[type="text"]').clear().type('Слайд 1').wait(700)
    cy.contains("СТИЛИ").click({force: true}).wait(700)
    cy.contains("Слайд 1").click({force: true}).wait(700)
    })

    
    
    
})