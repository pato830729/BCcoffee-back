import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  mprice: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少價格']
  },
  lprice: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少價格']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['latte', 'espresso', 'tea', 'special'],
      message: '分類錯誤'
    }
  },
  custom: {
    type: String,
    required: [true, '缺少客製化選項']
  }
}, { versionKey: false })

export default model('products', schema)
