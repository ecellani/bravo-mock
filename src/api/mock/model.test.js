import { Mock } from '.'
import { User } from '../user'

let user, mock

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  mock = await Mock.create({ createdBy: user, body: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = mock.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(mock.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.body).toBe(mock.body)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = mock.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(mock.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.body).toBe(mock.body)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
