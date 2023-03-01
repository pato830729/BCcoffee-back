import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createCode, getShowCode, getCode, getAllCode, editCode } from '../controllers/code.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createCode)
router.get('/', getShowCode)
router.get('/all', jwt, admin, getAllCode)
router.get('/:id', getCode)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editCode)

export default router
