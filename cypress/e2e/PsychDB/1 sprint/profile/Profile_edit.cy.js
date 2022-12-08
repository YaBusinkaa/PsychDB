describe("Авторизация PsychDB", () => {

    beforeEach( () => {

        cy.login()
        cy.visit(Cypress.env('baseUrl'))
        
                
    })



//---------------------------------//ИМЯ И ФАМИЛИЯ/--------------------------------------------//




it ("Валидное изменение имени и фамилии - СОХРАНЕНЫ ИЗМЕНЕНИЯ", () => { 
    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().type('Петр').wait(700)
    cy.get('[type="text"]').eq(1).clear().type('Петров').wait(700)

    cy.contains("Сохранить изменения").click({force: true}).wait(700)
    
})

it ("Валидное изменение имени и фамилии - НЕ СОХРАНЕНЫ ИЗМЕНЕНИЯ, остаться на странице", () => { 

    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().type('мвамав').wait(700)
    cy.get('[type="text"]').eq(1).clear().type('мавмвамв').wait(700)

    cy.get('[data-testid="AccountCircleIcon"]').click({force: true}).wait(1000)
    cy.get('[role="menuitem"]').contains('Мои эксперименты').click().wait(1000)
    cy.contains("Подтвердите переход").should('exist')
    cy.contains("Остаться на странице").click({force: true}).wait(700)
    cy.contains('Личные данные').wait(700).should('exist')
    
  
})

it ("Валидное изменение имени и фамилии - НЕ СОХРАНЕНЫ ИЗМЕНЕНИЯ, покинуть стр без сохранения", () => { 
    
    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().type('мвамав').wait(700)
    cy.get('[type="text"]').eq(1).clear().type('мавмвамв').wait(700)

    cy.get('[data-testid="AccountCircleIcon"]').click({force: true}).wait(1000)
    cy.get('[role="menuitem"]').contains('Мои эксперименты').click().wait(1000)
    cy.contains("Подтвердите переход").should('exist')
    cy.contains("Покинуть без сохранения").click({force: true}).wait(700)
    cy.contains('Мои эксперименты').wait(700).should('exist')
    
    
})

it ("НЕ валидное изменение имени и фамилии - эмодзи", () => { 
    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().type('😂😂😂😂😂😂').wait(700)
    cy.get('[type="text"]').eq(1).clear().type('😂😂😂😂😂😂').wait(700)

    cy.contains("Сохранить изменения").click({force: true}).wait(700)
    cy.contains('Пожалуйста, введите корректные данные').wait(700).should('exist')
    cy.contains('Пожалуйста, введите корректные данные').wait(700).should('exist')
    
})

it ("НЕ валидное изменение имени и фамилии - символы", () => { 
    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().type('٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶').wait(700)
    cy.get('[type="text"]').eq(1).clear().type('٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶٩(●̮̮̃●̃)۶').wait(700)

    cy.contains("Сохранить изменения").click({force: true}).wait(700)
    cy.contains('Пожалуйста, введите корректные данные').wait(700).should('exist')
    cy.contains('Пожалуйста, введите корректные данные').wait(700).should('exist')
    
})


it ("НЕ валидное изменение имени и фамилии - символы", () => { 
    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().type(Cypress.env("maxSymbolName")).wait(700)
    cy.get('[type="text"]').eq(1).clear().type(Cypress.env("maxSymbolName")).wait(700)

    cy.contains("Сохранить изменения").click({force: true}).wait(700)
    cy.contains('Длина поля Имя должно быть не менее 1 и не более 255 символов').wait(700).should('exist')
    
})

it ("Пустые поля", () => { 
    cy.get('[data-testid="PersonOutlineOutlinedIcon"]').click({force: true}).wait(700)

    cy.get('[type="text"]').eq(0).clear().wait(700)
    cy.get('[type="text"]').eq(1).clear().wait(700)

    cy.contains("Сохранить изменения").click({force: true}).wait(700)
    cy.contains('Пожалуйста, введите фамилию').wait(700).should('exist')
    cy.contains('Пожалуйста, введите имя').wait(700).should('exist')
    
})

})
