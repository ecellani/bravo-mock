import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Mock, { schema } from './model'

const router = new Router()

/**
 * @api {post} /mocks Create mock
 * @apiName CreateMock
 * @apiGroup Mock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam body Mock's body.
 * @apiSuccess {Object} mock Mock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mock not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ body }),
  create)

/**
 * @api {get} /mocks Retrieve mocks
 * @apiName RetrieveMocks
 * @apiGroup Mock
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of mocks.
 * @apiSuccess {Object[]} rows List of mocks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /mocks/:id Retrieve mock
 * @apiName RetrieveMock
 * @apiGroup Mock
 * @apiSuccess {Object} mock Mock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mock not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /mocks/:id Update mock
 * @apiName UpdateMock
 * @apiGroup Mock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam body Mock's body.
 * @apiSuccess {Object} mock Mock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mock not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ body }),
  update)

/**
 * @api {delete} /mocks/:id Delete mock
 * @apiName DeleteMock
 * @apiGroup Mock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Mock not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
