import code from '../models/code.js'

export const createCode = async (req, res) => {
  try {
    const result = await code.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      code: req.body.code,
      description: req.body.description,
      image: req.file?.path || '',
      show: req.body.show,
      category: req.body.category
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.title === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]] })
    } else {
      res.status(500).json({ success: false, message: '蝦' })
    }
  }
}

export const getShowCode = async (req, res) => {
  try {
    const result = await code.find({ show: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllCode = async (req, res) => {
  try {
    const result = await code.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getCode = async (req, res) => {
  try {
    const result = await code.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.title === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editCode = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      code: req.body.code,
      description: req.body.description,
      show: req.body.show,
      category: req.body.category
    }
    if (req.file?.path) {
      data.image = req.file?.path
    }
    const result = await code.findByIdAndUpdate(req.params.id, data, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.title === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.title === 'CaseError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
