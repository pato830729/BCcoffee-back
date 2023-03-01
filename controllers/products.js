import products from '../models/products.js'

export const createProduct = async (req, res) => {
  try {
    const result = await products.create({
      name: req.body.name,
      mprice: req.body.mprice,
      lprice: req.body.lprice,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      category: req.body.category,
      custom: req.body.custom
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]] })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getSellProducts = async (req, res) => {
  try {
    const result = await products.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getProduct = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editProduct = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      mprice: req.body.mprice,
      lprice: req.body.lprice,
      description: req.body.description,
      sell: req.body.sell,
      category: req.body.category,
      custom: req.body.custom
    }
    if (req.file?.path) {
      data.image = req.file?.path
    }
    const result = await products.findByIdAndUpdate(req.params.id, data, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CaseError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
