// 校园二手交易平台 - 本地测试后端
// 启动：node server/index.js（或 npm run server）
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import {
  adminAccount,
  menus,
  categories,
  users,
  goods,
  orders,
  imageClasses,
  images,
  getStatistics1,
  getStatistics2,
  getStatistics3,
} from './data.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 简单请求日志，方便排查前端调用了哪些接口
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode}`)
  })
  next()
})

/* ------------------------------ 通用工具 ------------------------------ */

// 前端 axios 响应拦截器取的是 response.data.data，所以统一包裹一层
const ok = (res, data = {}, msg = 'ok') => res.json({ code: 200, msg, data })
const fail = (res, msg = '请求参数有误', code = 400) => res.status(code).json({ code, msg })

const originOf = req => `${req.protocol}://${req.get('host')}`
const absUrl = (req, url) => {
  if (!url) return ''
  return /^https?:\/\//.test(url) ? url : originOf(req) + url
}
const toInt = (value, defaultValue) => {
  const n = parseInt(value, 10)
  return Number.isFinite(n) ? n : defaultValue
}
const paginate = (arr, page, limit) => {
  const p = Math.max(1, toInt(page, 1))
  const size = Math.max(1, toInt(limit, 10))
  return {
    list: arr.slice((p - 1) * size, p * size),
    totalCount: arr.length,
    total: arr.length,
    page: p,
    limit: size,
  }
}
const nextId = arr => arr.reduce((max, item) => Math.max(max, item.id), 0) + 1
const now = () =>
  new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')

const findCategory = id => categories.find(c => c.id === Number(id))
const categoryName = id => (findCategory(id) || {}).name || '未分类'

const serializeUser = (req, u) => ({
  ...u,
  username: u.student_no,
  avatar: absUrl(req, u.avatar),
})
const serializeGoods = (req, g) => ({
  ...g,
  img: absUrl(req, g.img),
  category_name: categoryName(g.category_id),
})
const serializeOrder = (req, o) => ({
  ...o,
  item_img: absUrl(req, o.item_img),
  seller_avatar: absUrl(req, o.seller_avatar),
  buyer_avatar: absUrl(req, o.buyer_avatar),
})
const serializeImage = (req, img) => ({ ...img, url: absUrl(req, img.url) })

/* ------------------------------ 占位图 ------------------------------ */
// 本地生成 SVG 占位图，避免依赖外网图片，保证离线也能看到图片
app.get('/placeholder/:name', (req, res) => {
  const raw = decodeURIComponent(req.params.name).replace(/\.svg$/i, '')
  const palette = ['#626aef', '#4f83cc', '#38a169', '#d69e2e', '#e53e3e', '#805ad5', '#319795']
  const color = palette[raw.length % palette.length]
  const text = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  res.type('image/svg+xml').send(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" fill="#ffffff" font-size="26" font-family="Arial, sans-serif"
    text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`)
})

/* ------------------------------ 图片上传 ------------------------------ */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.join(__dirname, 'uploads')
fs.mkdirSync(uploadDir, { recursive: true })
app.use('/uploads', express.static(uploadDir))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '.jpg').toLowerCase()
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) {
      return cb(new Error('仅支持 jpg/png 格式图片'))
    }
    cb(null, true)
  },
})

/* ------------------------------ 登录鉴权 ------------------------------ */

const tokens = new Map()

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) return fail(res, '账号和密码不能为空')
  if (username !== adminAccount.username || password !== adminAccount.password) {
    return fail(res, '账号或密码错误')
  }
  const token = randomUUID()
  tokens.set(token, adminAccount.id)
  ok(res, { token }, '登录成功')
})

// 登录之后的所有 /admin 接口都需要携带 token 请求头
app.use('/admin', (req, res, next) => {
  const token = req.headers.token
  if (!token || !tokens.has(token)) return fail(res, '登录已过期，请重新登录', 401)
  next()
})

app.post('/admin/getinfo', (req, res) => {
  ok(res, {
    id: adminAccount.id,
    username: adminAccount.username,
    avatar: absUrl(req, adminAccount.avatar),
    super: adminAccount.super,
    ruleNames: adminAccount.ruleNames,
    menus,
  })
})

app.post('/admin/logout', (req, res) => {
  tokens.delete(req.headers.token)
  ok(res, {}, '退出成功')
})

app.post('/admin/updatepassword', (req, res) => {
  const { oldpassword, password, repassword } = req.body || {}
  if (!oldpassword || !password || !repassword) return fail(res, '请填写完整的密码信息')
  if (oldpassword !== adminAccount.password) return fail(res, '旧密码不正确')
  if (password !== repassword) return fail(res, '两次输入的新密码不一致')
  if (password.length < 3 || password.length > 12) return fail(res, '新密码长度需在 3-12 位之间')
  adminAccount.password = password
  ok(res, {}, '修改密码成功')
})

/* ------------------------------ 首页统计 ------------------------------ */

app.get('/admin/statistics1', (req, res) => ok(res, getStatistics1()))
app.get('/admin/statistics2', (req, res) => ok(res, getStatistics2()))
app.get('/admin/statistics3', (req, res) => ok(res, getStatistics3(String(req.query.type || 'week'))))

/* ------------------------------ 用户管理 ------------------------------ */

app.get('/admin/user/:page', (req, res) => {
  const { college = '', keyword = '' } = req.query
  const kw = String(keyword).trim().toLowerCase()
  const filtered = users.filter(u => {
    const matchCollege = !college || u.college === college
    const matchKeyword =
      !kw ||
      u.student_no.toLowerCase().includes(kw) ||
      u.nickname.toLowerCase().includes(kw)
    return matchCollege && matchKeyword
  })
  const result = paginate(filtered, req.params.page, req.query.limit)
  ok(res, { ...result, list: result.list.map(u => serializeUser(req, u)) })
})

app.post('/admin/user', (req, res) => {
  const { student_no, nickname, college, grade, major } = req.body || {}
  if (!student_no || !nickname) return fail(res, '学号和昵称不能为空')
  if (users.some(u => u.student_no === student_no)) return fail(res, '该学号已存在')

  const user = {
    id: nextId(users),
    student_no: String(student_no),
    nickname,
    college: college || '',
    grade: grade || '',
    major: major || '',
    credit: 60,
    status: 'active',
    avatar: null,
    create_time: now(),
  }
  users.push(user)
  ok(res, serializeUser(req, user), '新增成功')
})

app.post('/admin/user/:id/delete', (req, res) => {
  const id = Number(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return fail(res, '用户不存在', 404)
  users.splice(index, 1)
  ok(res, {}, '删除成功')
})

// 会员等级：当前页面没有使用，保留接口避免前端后续接入时报错
app.get('/admin/user_level/:page', (req, res) => {
  const levels = [
    { id: 1, name: '普通会员', level: 1, discount: 100 },
    { id: 2, name: '校园认证', level: 2, discount: 95 },
    { id: 3, name: '信用优选', level: 3, discount: 90 },
  ]
  ok(res, paginate(levels, req.params.page, req.query.limit))
})

/* ------------------------------ 物品分类 ------------------------------ */

// 注意：/all 必须定义在 /:page 之前
app.get('/admin/goods_category/all', (req, res) => {
  ok(res, { list: [...categories].sort((a, b) => b.order - a.order) })
})

app.get('/admin/goods_category/:page', (req, res) => {
  const sorted = [...categories].sort((a, b) => b.order - a.order)
  ok(res, paginate(sorted, req.params.page, req.query.limit))
})

app.post('/admin/goods_category', (req, res) => {
  const { name, order } = req.body || {}
  if (!name) return fail(res, '分类名称不能为空')
  const category = { id: nextId(categories), name, order: toInt(order, 50) }
  categories.push(category)
  ok(res, category, '新增成功')
})

app.post('/admin/goods_category/:id/delete', (req, res) => {
  const id = Number(req.params.id)
  const index = categories.findIndex(c => c.id === id)
  if (index === -1) return fail(res, '分类不存在', 404)
  categories.splice(index, 1)
  // 分类删除后，物品仍然保留，列表里会显示为「未分类」
  ok(res, {}, '删除成功')
})

app.post('/admin/goods_category/:id', (req, res) => {
  const id = Number(req.params.id)
  const category = findCategory(id)
  if (!category) return fail(res, '分类不存在', 404)
  const { name, order } = req.body || {}
  if (name !== undefined) category.name = name
  if (order !== undefined) category.order = toInt(order, category.order)
  ok(res, category, '修改成功')
})

/* ------------------------------ 二手物品 ------------------------------ */

app.get('/admin/goods', (req, res) => {
  const { category_id = '', status = '', keyword = '' } = req.query
  const kw = String(keyword).trim().toLowerCase()
  const filtered = goods.filter(g => {
    const matchCategory = !category_id || g.category_id === Number(category_id)
    const matchStatus = !status || g.status === status
    const matchKeyword = !kw || g.name.toLowerCase().includes(kw)
    return matchCategory && matchStatus && matchKeyword
  })
  const result = paginate(filtered, req.query.page, req.query.limit)
  ok(res, { ...result, list: result.list.map(g => serializeGoods(req, g)) })
})

app.post('/admin/goods', (req, res) => {
  const body = req.body || {}
  if (!body.name) return fail(res, '物品名称不能为空')
  if (body.category_id === undefined || body.category_id === null || body.category_id === '') {
    return fail(res, '请选择物品分类')
  }
  const item = {
    id: nextId(goods),
    name: body.name,
    category_id: Number(body.category_id),
    price: Number(body.price) || 0,
    condition: body.condition || '九成新',
    seller: body.seller || '',
    contact: body.contact || '',
    location: body.location || '',
    status: body.status || 'on_sale',
    img: body.img || null,
    content: body.content || '',
  }
  goods.unshift(item)
  ok(res, serializeGoods(req, item), '发布成功')
})

app.post('/admin/goods/:id/delete', (req, res) => {
  const id = Number(req.params.id)
  const index = goods.findIndex(g => g.id === id)
  if (index === -1) return fail(res, '物品不存在', 404)
  goods.splice(index, 1)
  ok(res, {}, '删除成功')
})

app.post('/admin/goods/:id', (req, res) => {
  const id = Number(req.params.id)
  const item = goods.find(g => g.id === id)
  if (!item) return fail(res, '物品不存在', 404)

  const body = req.body || {}
  const fields = ['name', 'price', 'condition', 'seller', 'contact', 'location', 'status', 'img', 'content']
  fields.forEach(key => {
    if (body[key] !== undefined) item[key] = body[key]
  })
  if (body.category_id !== undefined) item.category_id = Number(body.category_id)
  if (body.price !== undefined) item.price = Number(body.price) || 0

  ok(res, serializeGoods(req, item), '修改成功')
})

/* ------------------------------ 交易记录 ------------------------------ */

const ORDER_STATUS = ['pending', 'trading', 'completed', 'cancelled']

app.get('/admin/order', (req, res) => {
  const { status = '', keyword = '' } = req.query
  const kw = String(keyword).trim().toLowerCase()
  const filtered = orders.filter(o => {
    const matchStatus = !status || o.status === status
    const matchKeyword =
      !kw ||
      o.item_name.toLowerCase().includes(kw) ||
      o.seller.toLowerCase().includes(kw) ||
      o.buyer.toLowerCase().includes(kw)
    return matchStatus && matchKeyword
  })
  const result = paginate(filtered, req.query.page, req.query.limit)
  ok(res, { ...result, list: result.list.map(o => serializeOrder(req, o)) })
})

app.get('/admin/order/:id', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id))
  if (!order) return fail(res, '交易记录不存在', 404)
  ok(res, serializeOrder(req, order))
})

app.post('/admin/order/:id/status', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id))
  if (!order) return fail(res, '交易记录不存在', 404)
  const { status } = req.body || {}
  if (!ORDER_STATUS.includes(status)) return fail(res, '非法的交易状态')
  order.status = status
  ok(res, serializeOrder(req, order), '状态更新成功')
})

/* ------------------------------ 图片库 ------------------------------ */

app.get('/admin/image_class/:page', (req, res) => {
  const sorted = [...imageClasses].sort((a, b) => b.order - a.order)
  ok(res, paginate(sorted, req.params.page, req.query.limit))
})

app.post('/admin/image_class', (req, res) => {
  const { name, order } = req.body || {}
  if (!name) return fail(res, '分类名称不能为空')
  const item = { id: nextId(imageClasses), name, order: toInt(order, 50) }
  imageClasses.push(item)
  ok(res, item, '创建成功')
})

app.post('/admin/image_class/:id/delete', (req, res) => {
  const id = Number(req.params.id)
  const index = imageClasses.findIndex(c => c.id === id)
  if (index === -1) return fail(res, '分类不存在', 404)
  imageClasses.splice(index, 1)
  // 同时清理该分类下的图片，保证列表数据一致
  for (let i = images.length - 1; i >= 0; i--) {
    if (images[i].image_class_id === id) images.splice(i, 1)
  }
  ok(res, {}, '删除成功')
})

app.post('/admin/image_class/:id', (req, res) => {
  const id = Number(req.params.id)
  const item = imageClasses.find(c => c.id === id)
  if (!item) return fail(res, '分类不存在', 404)
  const { name, order } = req.body || {}
  if (name !== undefined) item.name = name
  if (order !== undefined) item.order = toInt(order, item.order)
  ok(res, item, '修改成功')
})

app.get('/admin/image_class/:id/image/:page', (req, res) => {
  const classId = Number(req.params.id)
  if (!imageClasses.some(c => c.id === classId)) return fail(res, '图片分类不存在', 404)
  const list = images.filter(img => img.image_class_id === classId)
  const result = paginate(list, req.params.page, req.query.limit)
  ok(res, { ...result, list: result.list.map(img => serializeImage(req, img)) })
})

app.post('/admin/image/upload', upload.single('img'), (req, res) => {
  if (!req.file) return fail(res, '请选择要上传的图片')
  const url = `/uploads/${req.file.filename}`
  const imageClassId = toInt(req.body.image_class_id, 0)
  if (imageClassId && imageClasses.some(c => c.id === imageClassId)) {
    images.push({
      id: nextId(images),
      image_class_id: imageClassId,
      name: req.file.originalname,
      url,
    })
  }
  ok(res, { url: absUrl(req, url), name: req.file.originalname }, '上传成功')
})

/* ------------------------------ 兜底处理 ------------------------------ */

app.use((req, res) => fail(res, `接口不存在：${req.method} ${req.originalUrl}`, 404))

app.use((err, req, res, next) => {
  const status = err.status || 500
  fail(res, err.message || '服务器内部错误', status)
})

app.listen(PORT, () => {
  console.log(`\n本地测试后端已启动：http://localhost:${PORT}`)
  console.log(`登录账号：admin    登录密码：123456`)
  console.log(`图片上传目录：${uploadDir}\n`)
})
