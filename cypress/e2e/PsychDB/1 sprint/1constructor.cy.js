describe("Авторизация PsychDB", () => {

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
        cy.wait("@matchedUrl")

        cy.contains("Конструктор").click({force: true})
        cy.get('[type="text"]').eq(1).type('testtest')
        cy.contains('Для настольных компьютеров').click().wait(400)
        cy.contains('Создать эксперимент').click().wait(400)
        cy.get('[data-testid="AddBoxIcon"]').click({force: true}).wait(400)
        cy.contains('Выбор структуры строки').should('exist').wait(2000)
        cy.contains("1 столбец").click({force: true}).wait(400)
        cy.contains("Добавить элемент").click({force: true}).wait(400)
        
    })

    afterEach(()=>{
        cy.getExperiments()
    })

    it.skip("Манипуляции с кнопкой", () => {

    //добавление кнопки
    cy.contains("Кнопка").click({force: true}) 

    //изменение текста кнопки
    cy.contains("Далее").click({force: true})
    cy.get('[type="text"]').eq(1).clear().wait(700).type("Кнопка") 

    //размер текста кнопки
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[type="number"]').click({force: true})
    cy.get('[value="16"]').click({force: true}).clear().wait(700).type("20")

    //цвет текста кнопки
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[color="#FFFFFF"]').eq(1).click({force: true})
    cy.get('[value="#FFFFFF"]').click({force: true}).clear().wait(700).type("#19171a")

    //цвет кнопки
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[color="#1976D2"]').click({force: true})
    cy.get('[value="#1976D2"]').click({force: true}).clear().wait(700).type("#bf28a6")

    //удаление кнопки
    cy.contains("НАСТРОЙКИ").click({force: true}).wait(500)
    
    cy.get('[data-testid="DeleteOutlinedIcon"]').click({force: true}) 
    cy.contains("Отмена").parent().contains('Удалить').click({force: true})

    // 
    cy.wait('@matchedPatch').then(({response}) => { 
        expect(response.statusCode).to.eq(200)
    })

    })

    it.skip("Манипуляции с слайдером", () => { 
    cy.contains("Шкала").click({force: true})
    cy.contains("Ответ 1").click({force: true})
    //изменение названия шкалы
    cy.get('[type="text"]').eq(0).click({force: true}).clear().type('testtest').wait(700) 
    //изменение текста ответа
    cy.get('[type="text"]').eq(1).click({force: true}).wait(700).clear().wait(700).type('testtest').wait(700) 
    cy.get('[type="text"]').eq(2).click({force: true}).wait(700).clear().wait(700).type('testtest').wait(700) 
    //добавление вариантов ответа 
    cy.get('[data-testid="AddCircleOutlineRoundedIcon"]').click({force: true}).wait(700) 
    cy.get('[data-testid="AddCircleOutlineRoundedIcon"]').click({force: true}).wait(700) 
    cy.get('[data-testid="AddCircleOutlineRoundedIcon"]').click({force: true}).wait(700) 
    cy.get('[data-testid="AddCircleOutlineRoundedIcon"]').click({force: true}).wait(700) 
    //выбор правильного варианта ответа 
    cy.get('[data-testid="RadioButtonUncheckedIcon"]').eq(2).click({force: true}).wait(700) 
    cy.get('[data-testid="RadioButtonUncheckedIcon"]').eq(4).click({force: true}).wait(700)
     //удаление вариантов ответа 
    cy.get('[data-testid="DeleteRoundedIcon"]').eq(5).click({force: true}).wait(700)
    cy.get('[data-testid="DeleteRoundedIcon"]').eq(4).click({force: true}).wait(700)
    cy.get('[data-testid="DeleteRoundedIcon"]').eq(3).click({force: true}).wait(700)
    cy.get('[data-testid="DeleteRoundedIcon"]').eq(2).click({force: true}).wait(700)
    //выбор правильного варианта ответа 
    cy.get('[data-testid="RadioButtonUncheckedIcon"]').eq(0).click({force: true}).wait(700)
    //размер текста 
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[type="number"]').click({force: true})
    cy.get('[value="16"]').click({force: true}).clear().wait(700).type("20")

    //цвет индикатора
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[color="#1976D2"]').eq(0).click({force: true})
    cy.get('[value="#1976D2"]').click({force: true}).clear().wait(700).type("#19171a")
    //удаление шкалы
    cy.contains("НАСТРОЙКИ").click({force: true}).wait(500)
    
    cy.get('[data-testid="DeleteOutlinedIcon"]').click({force: true}) 
    cy.contains("Отмена").parent().contains('Удалить').click({force: true})


    




       /*  cy.get('[data-testid="DeleteOutlinedIcon"]').click({force: true}) //удаление слайдера
        cy.contains("Отмена").parent().contains('Удалить').click({force: true}) */

    })
    
it ("Манипуляции с текстом - валидные данные", () => {   
                                                      
    cy.contains("Текст").click({force: true}).wait(700) //добавление текста
    cy.get('[placeholder="Введите текст"]').type("Текст1").wait(700)//добавление текста в текст

    //размер текста 
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[type="number"]').click({force: true})
    cy.get('[value="16"]').click({force: true}).clear().wait(700).type("20")
    
    //цвет текста
    cy.contains("СТИЛИ").click({force: true})
    cy.get('[color="#000000"]').eq(0).click({force: true})
    cy.get('[value="#000000"]').click({force: true}).clear().wait(700).type("#E60000")
    cy.contains("НАСТРОЙКИ").click({force: true}).wait(500)

    //удаление текста
    cy.get('[data-testid="DeleteOutlinedIcon"]').click({force: true}) 
    cy.contains("Отмена").parent().contains('Удалить').click({force: true})

        
})

it ("Манипуляции с текстом - НЕвалидные данные - эмодзи", () => {   
                                                      
    cy.contains("Текст").click({force: true}).wait(700) //добавление текста
    cy.get('[placeholder="Введите текст"]').type("😘😘😘😘😘😘😘😘😘").wait(700)//добавление текста в текст
    cy.contains("СТИЛИ").click({force: true})
    cy.contains('Пожалуйста, введите корректные данные').should('exist').wait(700)
    
        
})   

it ("Манипуляции с текстом - НЕвалидные данные - смаилики", () => {   
                                                      
    cy.contains("Текст").click({force: true}).wait(700) //добавление текста
    cy.get('[placeholder="Введите текст"]').type("☺☻☹ ㋛ ").wait(700)//добавление текста в текст       
    cy.contains("СТИЛИ").click({force: true})
    cy.contains('Пожалуйста, введите корректные данные').should('exist').wait(700)
}) 

it ("Манипуляции с текстом - превышающее кол-во символов", () => {   
                                                      
    cy.contains("Текст").click({force: true}).wait(700) //добавление текста
    cy.get('[placeholder="Введите текст"]').type("По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.")
    cy.wait(700)//добавление текста в текст
    cy.contains("СТИЛИ").click({force: true})
}) 

})