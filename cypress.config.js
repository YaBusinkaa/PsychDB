const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    //baseUrl: 'https://front.research-platform.ipst-dev.com/',
    video: false, 
    viewportWidth: 1600,
    viewportHeight: 900
  },

  env: {
    //PsychDB
    baseUrl: "https://front.research-platform.ipst-dev.com",
    apiUrl: "https://api.research-platform.ipst-dev.com",
  
    /* ИМЯ И ФАМИЛИЯ */
    firstName: "Test",
    lastName: "Test",
    invalidFirstName: "123456",
    invalidLastName: "123456",
    maxSymbolName: "testetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetstesttestetsttesttest",
    
    

    /* ПАРОЛЬ */
    pass: "qwerty#",
    anotherPass: "qwerty###",
    invalidPass: "testtest",
    maxSymbolPass: "testetstesttestetstesttestetst####",
    minSymbolPass: "t#",
    incorrectPass: "1234Test#", //неподходящий пароль
    

    /* ЛОГИН */
    regMail: "moroxaj945@rubeshi.com",
    invalidMail: "1234567",
    maxSymbolMail: "testetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttest@mail.ru",
    unRegMail: "", //генератор?
    unVerifiedMail: "", ///нужно ли?

  /*   ______________________________________________________________________________________________________________________ */
    
    /* НАЗВАНИЕ ЭКСПЕРИМЕНТА*/
    newTitle: "",//генератор?
    maxSymbolTitle: "testetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstest",
    invalidTitle: "😂$👍👌✌🔩🔝🔃💸",
    useTitle: "Test",


    /* СОЗДАТЕЛИ ЭКСПЕРИМЕНТА*/
    creators: "",
    maxSymbolCreators: "testetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestest",
    invalidCreators: "😂$👍👌✌🔩🔝🔃💸",


    /* ОПИСАНИЕ ЭКСПЕРИМЕНТА*/
    descr: "",
    maxSymbolDescr: "testetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestetstesttestetsttestetstesttestest",
    invalidDescr: "😂$👍👌✌🔩🔝🔃💸",

/*   ______________________________________________________________________________________________________________________ */
    
    /* Поле HEX-кода */
    /* Название слайда */
    /* Текст */

  }
});

