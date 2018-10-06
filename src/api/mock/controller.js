import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Mock } from '.'

export const create = ({ user, body }, res, next) =>
  Mock.create({ ...body, createdBy: user })
    .then((mock) => mock.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Mock.count(query)
    .then(count => Mock.find(query, select, cursor)
      .populate('createdBy')
      .then((mocks) => ({
        count,
        rows: mocks.map((mock) => mock.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Mock.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((mock) => mock ? mock.customView() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Mock.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((mock) => mock ? Object.assign(mock, body).save() : null)
    .then((mock) => mock ? mock.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Mock.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((mock) => mock ? mock.remove() : null)
    .then(success(res, 204))
    .catch(next)
