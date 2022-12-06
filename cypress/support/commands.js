Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('register', () =>{
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl')+"/user",
    failOnStatusCode: false,
    body: {
      "firstName": "Test",
      "lastName": "Test",
      "email": Cypress.env('regMail'),
      "password": "qwerty#"
    }
  }).as('register')
})


Cypress.Commands.add('login', () =>{
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl')+"/auth/sign-in",
    failOnStatusCode: false,
    body: {
      "email": Cypress.env('regMail'),
      "password": "qwerty#"
    }
  }).as('login')
  .then((resp) => {
    window.localStorage.setItem('accessToken', resp.body.data.tokens.accessToken)
    window.localStorage.setItem('refreshToken', resp.body.data.tokens.refreshToken)
    Cypress.env('accessToken', resp.body.data.tokens.accessToken)
  })
})

Cypress.Commands.add('getExperiments', () =>{
  cy.request({
    method: 'GET',
    url: Cypress.env('apiUrl')+"/experiment/own/all/1?sortBy=datePublished&order=desc",
    failOnStatusCode: false,
    headers: { 
      'Authorization': 'Bearer '+ Cypress.env('accessToken'),       
    }
  }).as('getExperiments')
  .then((resp) => {
    expect(resp.status).to.eq(200)
    for(let i = 0; i < resp.body.data.experiments.length; i++){
      if(resp.body.data.experiments[i].title == 'testtest'){
        Cypress.env('id_experiment', resp.body.data.experiments[i].id)
        cy.log(Cypress.env('id_experiment'))
        break
      }
    }
  })
})

Cypress.Commands.add('createExperiment', (title,id_experiment) =>{
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl')+"/experiment",
    failOnStatusCode: false,
    headers: { 
      'Authorization': 'Bearer '+ Cypress.env('accessToken'),       
    },
    body:{
      "title": title,
      "platform": "web"
    }
  }).as('createExperiment')
  .then((response) => {
    expect(response.status).to.eq(201)
    Cypress.env(id_experiment, response.body.id)
  })
})

Cypress.Commands.add('createSlide', (title,id_experiment, id_slide) =>{
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl')+"/slide",
    failOnStatusCode: false,
    headers: { 
      'Authorization': 'Bearer '+ Cypress.env('accessToken'),       
    },
    body:{
      "title": title,
      "experimentId": Cypress.env(id_experiment)
    }
  }).as('createSlide')
  .then((response) => {
    expect(response.status).to.eq(201)
    Cypress.env(id_slide, response.body.id)
  })
})

Cypress.Commands.add('deleteSlide', () =>{
  cy.request({
    method: 'DELETE',
    url: Cypress.env('apiUrl')+"/slide/"+Cypress.env('id_slide'),
    failOnStatusCode: false,
    headers: { 
      'Authorization': 'Bearer '+ Cypress.env('accessToken'),       
    },
  }).as('deleteSlide')
})

Cypress.Commands.add('deleteExperiment', () =>{
  cy.request({
    method: 'DELETE',
    url: Cypress.env('apiUrl')+"/experiment/"+Cypress.env('id_experiment'),
    failOnStatusCode: false,
    headers: { 
      'Authorization': 'Bearer '+ Cypress.env('accessToken'),       
    },
  }).as('deleteExperiment')
})
