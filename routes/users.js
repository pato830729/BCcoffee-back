import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import * as auth from '../middleware/auth.js'
import { register, login, logout, extend, getUser, editCart, getCart, editUserInfo, getAllUsers, editUser } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getUser)
router.post('/me', content('application/json'), auth.jwt, editUserInfo)
router.post('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)
router.get('/all', jwt, admin, getAllUsers)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editUser)

export default router
