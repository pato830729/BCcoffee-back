import news from '../models/news.js'

export const createNews = async (req, res) => {
  try {
    const result = await news.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      image: req.file?.path || '',
      show: req.body.show,
      category: req.body.category,
      date: req.body.date
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.title === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]] })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getShowNews = async (req, res) => {
  try {
    const result = await news.find({ show: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllNews = async (req, res) => {
  try {
    const result = await news.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getNews = async (req, res) => {
  try {
    const result = await news.findById(req.params.id)
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

export const editNews = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      show: req.body.show,
      category: req.body.category
    }
    if (req.file?.path) {
      data.image = req.file?.path
    }
    const result = await news.findByIdAndUpdate(req.params.id, data, { new: true })
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
