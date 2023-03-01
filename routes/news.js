import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createNews, getShowNews, getNews, getAllNews, editNews } from '../controllers/news.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createNews)
router.get('/', getShowNews)
router.get('/all', jwt, admin, getAllNews)
router.get('/:id', getNews)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editNews)

export default router
