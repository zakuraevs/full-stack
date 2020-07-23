describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'sergey',
            username: 'sergey',
            password: 'sergeypass'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
        cy.get('#username-form')
        cy.get('#password-form')
        cy.get('#login-submit-button')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username-form').type('sergey')
            cy.get('#password-form').type('sergeypass')
            cy.get('#login-submit-button').click()

            cy.contains('sergey logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username-form').type('lisa')
            cy.get('#password-form').type('lisapass')
            cy.get('#login-submit-button').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
            cy.get('html').should('not.contain', 'Matlisa logged-in')
        })
    })

})