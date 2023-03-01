import { Schema, model } from 'mongoose'

const schema = new Schema({
  question: {
    type: String,
    required: [true, '缺少問題提問']
  },
  answer: {
    type: String,
    required: [true, '缺少問題回答']
  },
  show: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['交易相關問題', '食材相關問題', '運輸相關問題'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('qa', schema)
