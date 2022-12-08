describe("Авторизация PsychDB", () => {

    before('Выполняется один раз, не перед каждым тестом!', () => {
        cy.register()
    })

    beforeEach('Перед каждым тестом it', () => {

        cy.visit(Cypress.env('baseUrl'))
                
    })


//ВАЛИДНАЯ АВТОРИЗАЦИЯ
it ("Валидная авторизация", () => {
    cy.get('[id=":r4:"]')
    .type(Cypress.env('regMail'))
   
    cy.get('[id=":r5:"]')
    .type(Cypress.env('pass'))

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Личные данные')
    .should('exist')
})

//ПРОБЕЛЫ И ПУСТЫЕ ПОЛЯ //хуйня
it.skip ("Валидная авторизация + пробелы впереди логина и пароля", () => {
        
    cy.contains("E-mail").parent().find('input')
    .type("                      sekagac111@ekbasia.com")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("                                  testtest#")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()
})
it.skip ("Валидная авторизация + пробелы в конце логина и пароля", () => {
         
    cy.contains("E-mail").parent().find('input')
    .type("sekagac111@ekbasia.com                     ")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("testtest#                                  ")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()
})
it.skip  ("Валидная авторизация + пробелы в начале и в конце логина и пароля", () => {
        
           
    cy.contains("E-mail").parent().find('input')
    .type("                      sekagac111@ekbasia.com                  ")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("                          testtest#                           ")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()
})


it.skip ("Сплошные пробелы", () => {
          
    cy.contains("E-mail").parent().find('input')
    .type("     ")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("          ")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Пожалуйста, введите корректные данные')
    cy.contains('Пароль должен содержать')
    .should('exist')
})
it.skip ("Пустые поля", () => {
          
    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Пожалуйста, введите email').should('exist')
    cy.contains('Пожалуйста, введите пароль').should('exist')
})

//НЕПОДТВЕРЖДЕННЫЙ Е-MAIL
it.skip ("Авторизация через неподтверженную почту -> не ввести код, нажать подтвердить", () => { //закончить
          
    cy.contains("E-mail").parent().find('input')
    .type("qwerty123@mail.ru")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("testtest#")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Восстановление пароля')
    .should('exist')
})
it.skip ("Авторизация через неподтверженную почту -> ввести неверный код, нажать подтвердить", () => { //закончить
          
        cy.contains("E-mail").parent().find('input')
        .type("qwerty123@mail.ru")
          
        cy.contains("Пароль").parent().find('input')
            
        .type("testtest#")
    
        cy.contains("Вход в личный кабинет").parent().parent()
        .contains('Войти')
        .click()
    
        cy.contains('Восстановление пароля')
        .should('exist')
})
//НЕВЕРНЫЙ ПАРОЛЬ ИЛИ ЛОГИН
it.skip ("Неверный пароль или логин", () => {
          
    cy.contains("E-mail").parent().find('input')
    .type("dvnkjdfnvkdfk@mail.ru")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("hjsdcbdsjh#")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Неверный e-mail или пароль')
    .should('exist')
})

//НЕВАЛИДНЫЙ E-MAIL И ПАРОЛЬ 
it.skip ("Невалидный пароль и логин (цифры)", () => {
          
    cy.contains("E-mail").parent().find('input')
    .type("12345678")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("12345678")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Пожалуйста, введите корректные данные')
    .should('exist')
    cy.contains('Пароль должен содержать от 6 символов, прописные')
    .should('exist')
})
it.skip ("Невалидный пароль и логин (символы, которые не эмодзи)", () => {
          
    cy.contains("E-mail").parent().find('input')
    .type("test♣☺test")
      
    cy.contains("Пароль").parent().find('input')
        
    .type("test♣☺test")

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Пожалуйста, введите корректные данные')
    .should('exist')
    cy.contains('Пароль должен содержать от 6 символов, прописные')
    .should('exist')
})
it.skip ("Невалидный пароль и логин (эмодзи)", () => {
          
    cy.contains("E-mail").parent().find('input')
    .type(Cypress.env('invalidTitle'))
    
    cy.contains("Пароль").parent().find('input')   
    .type(Cypress.env('invalidTitle'))

    cy.contains("Вход в личный кабинет").parent().parent()
    .contains('Войти')
    .click()

    cy.contains('Пожалуйста, введите корректные данные')
    .should('exist')
    cy.contains('Пароль должен содержать от 6 символов, прописные')
    .should('exist')
})
})