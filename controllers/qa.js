import qa from '../models/qa.js'

export const createQA = async (req, res) => {
  try {
    const result = await qa.create({
      question: req.body.question,
      answer: req.body.answer,
      show: req.body.show,
      category: req.body.category
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.question === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]] })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getShowQA = async (req, res) => {
  try {
    const result = await qa.find({ show: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllQA = async (req, res) => {
  try {
    const result = await qa.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getQA = async (req, res) => {
  try {
    const result = await qa.findById(req.params.id)
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

export const editQA = async (req, res) => {
  try {
    const result = await qa.findByIdAndUpdate(req.params.id, {
      question: req.body.question,
      answer: req.body.answer,
      show: req.body.show,
      category: req.body.category
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.question === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.question === 'CaseError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
