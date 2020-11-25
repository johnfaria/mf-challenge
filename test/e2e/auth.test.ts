describe('Authentication Tests', () => {
  it('should return 201 when a user is created', async () => {
    const user = {
      email: 'johny@mail.com',
      password: '123@#myPass',
    }

    const response = await global.testRequest.post('/auth/signup').send(user)

    expect(response.status).toBe(201)
  })

  it('should return an Auth token when a user is created', async () => {
    const user = {
      email: 'johny@mail.com',
      password: '123@#myPass',
    }

    const response = await global.testRequest.post('/auth/signup').send(user)

    expect(response.headers).toHaveProperty('authorization')
  })

  it('should return 200 when a user is logged in', async () => {
    const user = {
      email: 'johny@mail.com',
      password: '123@#myPass',
    }

    await global.testRequest.post('/auth/signup').send(user)

    const response = await global.testRequest.post('/auth/signin').send(user)
    expect(response.status).toBe(200)
  })

  it('should return an Auth token when a user is logged in', async () => {
    const user = {
      email: 'johny@mail.com',
      password: '123@#myPass',
    }

    await global.testRequest.post('/auth/signup').send(user)

    const response = await global.testRequest.post('/auth/signin').send(user)
    expect(response.headers).toHaveProperty('authorization')
  })
})
