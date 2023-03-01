import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/users.js'
import productRoute from './routes/products.js'
import newsRoute from './routes/news.js'
import codeRoute from './routes/code.js'
import qaRoute from './routes/qa.js'
import orderRoute from './routes/orders.js'
import './passport/passport.js'

mongoose.connect(process.env.DB_URL)
mongoose.set('sanitizeFilter', true)

const app = express()

app.use(cors({
  origin (origin, callback) {
    if (origin.includes('github') || origin.includes('localhost') || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error(), false)
    }
  }
}))
app.use((_, req, res, next) => {
  res.status(403).json({ success: false, message: '請求被拒' })
})

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).json({ success: false, message: '格式錯誤' })
})

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/news', newsRoute)
app.use('/code', codeRoute)
app.use('/qa', qaRoute)
app.use('/orders', orderRoute)

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})
