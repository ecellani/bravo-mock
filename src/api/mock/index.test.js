import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Mock } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, mock

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  mock = await Mock.create({ createdBy: user })
})

test('POST /mocks 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, body: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.body).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /mocks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /mocks 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /mocks/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${mock.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(mock.id)
})

test('GET /mocks/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /mocks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${mock.id}`)
    .send({ access_token: userSession, body: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(mock.id)
  expect(body.body).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /mocks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${mock.id}`)
    .send({ access_token: anotherSession, body: 'test' })
  expect(status).toBe(401)
})

test('PUT /mocks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${mock.id}`)
  expect(status).toBe(401)
})

test('PUT /mocks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, body: 'test' })
  expect(status).toBe(404)
})

test('DELETE /mocks/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${mock.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /mocks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${mock.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /mocks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${mock.id}`)
  expect(status).toBe(401)
})

test('DELETE /mocks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
