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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'sergey', password: 'sergeypass' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('sergeys blog')
            cy.get('#author').type('sergey')
            cy.get('#url').type('abc.com')
            cy.contains('submit blog').click()
            cy.contains('sergeys blog')
        })


        describe('and multiple blogs exist', function () {

            beforeEach(function () {
                cy.createBlog({ title: 'sergeys blog', author: 'sergey', url: 'abc.com' })
                cy.createBlog({ title: 'sergeys blog 2', author: 'sergey', url: 'abc.com' })
                cy.createBlog({ title: 'sergeys blog 3', author: 'sergey', url: 'abc.com' })
            })

            it('A user can like a blog', function () {
                cy.contains('sergeys blog 2').click()
                    .contains('view')
                    .click()

                cy.contains('sergeys blog 2')
                    .contains('like')
                    .click()

                cy.contains('1')
                    .contains('like')
                    .click()

                cy.contains('2')
            })

            it('A user can delete  ablog', function () {
                cy.contains('sergeys blog 2').click()
                    .contains('view')
                    .click()

                cy.contains('sergeys blog 2')
                    .contains('delete')
                    .click()

                cy.get('html').should('not.contain', 'sergeys blog 2')
                cy.get('html').should('contain', 'sergeys blog')
            })

            it('Notes are ordered by numebr of likes', function () {

                cy.contains('sergeys blog 2').click()
                    .contains('view')
                    .click()

                cy.contains('sergeys blog 2')
                    .contains('like')
                    .click()

                cy.contains('1')
                    .contains('like')
                    .click()

                cy.contains('2')

                cy.contains('sergeys blog 3').click()
                    .contains('view')
                    .click()

                cy.contains('sergeys blog 3')
                    .contains('like')
                    .click()

                cy.get('#blogs').then($blogs => {
                    const blogsLikes = $blogs.map($el => $el.likes)
                    cy.wrap(blogsLikes).should('equal', blogsLikes.sort())


                })


            })



        })

    })

})