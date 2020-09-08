describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Gonçalo Caetano',
      username: 'Goncalo',
      password: 'testtesting'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {

    it('succeds with correct credentials', function() {
      cy.get('#username').type('Goncalo')
      cy.get('#password').type('testtesting')
      cy.get('#login-button').click()

      cy.contains('Gonçalo Caetano logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Goncalo', password:'testtesting' })
    })

    it.only('A blog can be created', function(){
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'www.cypress.test'
      })
    })

    it.only('a user can like a blog', function(){
      cy.get('#newBlog-button').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.test')
      cy.get('#blog-submit').click()
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it.only('a user can delete his post', function() {
      cy.get('#newBlog-button').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.test')
      cy.get('#blog-submit').click()
      cy.contains('show').click()
      cy.contains('Delete').click()
      cy.contains('a blog created by cypress').should('not.exist')
    })
  })



})