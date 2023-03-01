import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createQA, getShowQA, getQA, getAllQA, editQA } from '../controllers/qa.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createQA)
router.get('/', getShowQA)
router.get('/all', jwt, admin, getAllQA)
router.get('/:id', getQA)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editQA)

export default router
