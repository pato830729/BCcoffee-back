import { Schema, model, ObjectId } from 'mongoose'

const orderSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  },
  custom: {
    type: String,
    required: [true, '缺少客製化選項']
  }

})
const schema = new Schema({
  u_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  address: {
    type: String,
    required: [true, '缺少收件人地址']
  },
  name: {
    type: String,
    required: [true, '缺少收件人姓名']
  },
  phone: {
    type: String,
    required: [true, '缺少收件人電話']
  },
  payway: {
    type: String,
    required: [true, '缺少付款方式']
  },
  products: {
    type: [orderSchema],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export default model('orders', schema)
