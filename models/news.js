import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: [true, '缺少標題']
  },
  subtitle: {
    type: String,
    required: [true, '缺少副標題']
  },
  description: {
    type: String,
    required: [true, '缺少內文']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  show: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['新品上市', '活動消息', '媒體報導', '店鋪資訊'],
      message: '分類錯誤'
    }
  },
  date: {
    type: Date,
    default: 'Date.now'
  }
}, { versionKey: false })

export default model('news', schema)
