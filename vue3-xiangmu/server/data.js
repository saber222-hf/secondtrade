// 本地测试后端的种子数据（内存存储，重启服务后恢复初始状态）
// 数据中特意保留了一些边界/异常数据，方便测试表格、分页、空值等场景

export const adminAccount = {
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: '',
  super: 1,
  ruleNames: ['getStatistics1,GET', 'getStatistics2,GET', 'getStatistics3,GET'],
}

// 侧边栏菜单：name / icon / frontpath / child
// 说明：store 里过滤掉了「订单管理 / 管理员管理 / 系统设置 / 分销模块」，这里不要用这些名字
export const menus = [
  { id: 1, name: '用户管理', icon: 'User', type: 1, frontpath: '/user/list' },
  {
    id: 2,
    name: '物品管理',
    icon: 'ShoppingCart',
    type: 0,
    child: [
      { id: 21, name: '二手物品', icon: 'ShoppingCart', frontpath: '/goods/list' },
      { id: 22, name: '物品分类', icon: 'Files', frontpath: '/category/list' },
    ],
  },
  {
    id: 3,
    name: '交易管理',
    icon: 'Tickets',
    type: 0,
    child: [
      { id: 31, name: '交易记录', icon: 'Tickets', frontpath: '/order/list' },
      { id: 32, name: '评论管理', icon: 'ChatDotRound', frontpath: '/comment/list' },
    ],
  },
  {
    id: 4,
    name: '内容管理',
    icon: 'Picture',
    type: 0,
    child: [
      { id: 41, name: '图片库', icon: 'Picture', frontpath: '/image/list' },
      { id: 42, name: '公告管理', icon: 'Bell', frontpath: '/notice/list' },
      { id: 43, name: '优惠券', icon: 'Discount', frontpath: '/coupon/list' },
    ],
  },
  { id: 5, name: '交易统计', icon: 'TrendCharts', type: 1, frontpath: '/indexChar' },
  { id: 6, name: '平台配置', icon: 'Setting', type: 1, frontpath: '/setting/base' },
]

export const categories = [
  { id: 1, name: '教材书籍', order: 100 },
  { id: 2, name: '数码电子', order: 90 },
  { id: 3, name: '生活用品', order: 80 },
  { id: 4, name: '运动器材', order: 70 },
  { id: 5, name: '乐器', order: 60 },
  { id: 6, name: '其他', order: 10 },
]

export const users = [
  { id: 1, student_no: '2022010101', nickname: '林小雨', college: '计算机学院', grade: '大三', major: '软件工程', credit: 98, status: 'active', avatar: '/placeholder/avatar-1.svg', create_time: '2026-09-01 08:12:33' },
  // 超长昵称：测试表格 show-overflow / 布局
  { id: 2, student_no: '2022010102', nickname: '超级超级长的昵称用来测试表格省略显示效果的同学', college: '文学院', grade: '大二', major: '汉语言文学', credit: 85, status: 'active', avatar: null, create_time: '2026-09-01 09:05:12' },
  // emoji + 无头像
  { id: 3, student_no: '2022010103', nickname: '🐱爱学习的猫', college: '数学学院', grade: '大一', major: '数学与应用数学', credit: 60, status: 'active', avatar: null, create_time: '2026-09-02 10:30:00' },
  // 信用分 0 + 已禁用
  { id: 4, student_no: '2022010104', nickname: '张伟', college: '机械工程学院', grade: '大四', major: '机械设计制造及其自动化', credit: 0, status: 'disabled', avatar: '/placeholder/avatar-4.svg', create_time: '2026-09-02 11:20:45' },
  // 信用分 100
  { id: 5, student_no: '2022010105', nickname: '王思远', college: '电子信息学院', grade: '研一', major: '通信工程', credit: 100, status: 'active', avatar: '/placeholder/avatar-5.svg', create_time: '2026-09-03 08:00:00' },
  { id: 6, student_no: '2022010106', nickname: '陈静', college: '经济管理学院', grade: '大二', major: '会计学', credit: 92, status: 'active', avatar: null, create_time: '2026-09-03 14:22:10' },
  { id: 7, student_no: '2022010107', nickname: '李雷', college: '外国语学院', grade: '大三', major: '英语', credit: 88, status: 'active', avatar: '/placeholder/avatar-7.svg', create_time: '2026-09-04 09:10:00' },
  { id: 8, student_no: '2022010108', nickname: '韩梅梅', college: '物理学院', grade: '大一', major: '应用物理', credit: 76, status: 'active', avatar: null, create_time: '2026-09-04 16:40:18' },
  { id: 9, student_no: '2022010109', nickname: '赵一鸣', college: '化学学院', grade: '大二', major: '化学', credit: 81, status: 'active', avatar: null, create_time: '2026-09-05 10:02:56' },
  { id: 10, student_no: '2022010110', nickname: '孙悦', college: '艺术学院', grade: '大四', major: '视觉传达设计', credit: 95, status: 'active', avatar: '/placeholder/avatar-10.svg', create_time: '2026-09-05 15:33:07' },
  { id: 11, student_no: '2022010111', nickname: '周杰', college: '体育学院', grade: '大三', major: '体育教育', credit: 70, status: 'active', avatar: null, create_time: '2026-09-06 08:45:29' },
  { id: 12, student_no: '2022010112', nickname: '吴敏', college: '法学院', grade: '研二', major: '法学', credit: 90, status: 'active', avatar: null, create_time: '2026-09-06 19:12:44' },
  { id: 13, student_no: '2022010113', nickname: '郑浩', college: '医学院', grade: '大四', major: '临床医学', credit: 87, status: 'active', avatar: '/placeholder/avatar-13.svg', create_time: '2026-09-07 07:58:12' },
  { id: 14, student_no: '2022010114', nickname: '冯雪', college: '计算机学院', grade: '大二', major: '人工智能', credit: 99, status: 'active', avatar: null, create_time: '2026-09-07 13:26:50' },
  { id: 15, student_no: '2022010115', nickname: '蒋涛', college: '电子信息学院', grade: '大三', major: '电子科学与技术', credit: 84, status: 'active', avatar: null, create_time: '2026-09-08 09:41:03' },
  { id: 16, student_no: '2022010116', nickname: '沈梦', college: '经济管理学院', grade: '大一', major: '市场营销', credit: 78, status: 'active', avatar: null, create_time: '2026-09-08 18:05:37' },
  // 已禁用账号
  { id: 17, student_no: '2022010117', nickname: '何东', college: '机械工程学院', grade: '大四', major: '车辆工程', credit: 66, status: 'disabled', avatar: null, create_time: '2026-09-09 10:15:22' },
  { id: 18, student_no: '2022010118', nickname: '马丽', college: '文学院', grade: '大三', major: '新闻传播学', credit: 89, status: 'active', avatar: '/placeholder/avatar-18.svg', create_time: '2026-09-09 21:08:46' },
  { id: 19, student_no: '2022010119', nickname: '高翔', college: '数学学院', grade: '大二', major: '统计学', credit: 91, status: 'active', avatar: null, create_time: '2026-09-10 08:33:15' },
  // 学院为空：测试空值展示（按学院筛选时不会出现在任何学院下）
  { id: 20, student_no: '2022010120', nickname: '罗颖', college: '', grade: '大一', major: '日语', credit: 82, status: 'active', avatar: null, create_time: '2026-09-10 12:47:09' },
  { id: 21, student_no: '2022010121', nickname: '杨帆', college: '物理学院', grade: '大四', major: '光电信息科学与工程', credit: 74, status: 'active', avatar: null, create_time: '2026-09-11 09:20:58' },
  { id: 22, student_no: '2022010122', nickname: '徐蕾', college: '化学学院', grade: '大三', major: '材料化学', credit: 86, status: 'active', avatar: null, create_time: '2026-09-11 17:04:31' },
  { id: 23, student_no: '2022010123', nickname: '朱鹏', college: '计算机学院', grade: '研三', major: '计算机技术', credit: 97, status: 'active', avatar: '/placeholder/avatar-23.svg', create_time: '2026-09-12 08:19:40' },
]

export const goods = [
  { id: 1, name: '高等数学（第七版）上下册 同济大学 正版教材', category_id: 1, price: 25, condition: '九成新', seller: '林小雨', contact: '微信：linxiaoyu2026', location: '图书馆一楼大厅', status: 'on_sale', img: '/placeholder/goods-1.svg', content: '教材无笔记，只在期末复习时用过，两本一起出。' },
  { id: 2, name: '二手 iPad 2021 64G 深空灰 含保护壳', category_id: 2, price: 1200, condition: '八成新', seller: '张伟', contact: 'QQ：100200300', location: '东区食堂门口', status: 'on_sale', img: '/placeholder/goods-2.svg', content: '电池健康 89%，屏幕无划痕，配原装充电器和保护壳。' },
  { id: 3, name: '宿舍迷你小冰箱 双开门 冷藏冷冻', category_id: 3, price: 180, condition: '八成新', seller: '陈静', contact: '手机：13800001111', location: '南苑 5 号宿舍楼', status: 'on_sale', img: '/placeholder/goods-3.svg', content: '毕业清仓，功能完好，需自提。' },
  { id: 4, name: '山地自行车 26 寸 21 速 变速骑行', category_id: 4, price: 350, condition: '七成新', seller: '周杰', contact: '微信：zhoujie_bike', location: '体育馆西侧停车棚', status: 'on_sale', img: '/placeholder/goods-4.svg', content: '骑了两年，链条新换过，送车锁。' },
  { id: 5, name: '雅马哈 F310 民谣吉他 41 寸 带琴包', category_id: 5, price: 480, condition: '九成新', seller: '孙悦', contact: '微信：sunyue_music', location: '艺术楼 302', status: 'on_sale', img: '/placeholder/goods-5.svg', content: '音准很好，附赠变调夹、拨片和琴包。' },
  // 超长名称：测试表格省略与 tooltip
  { id: 6, name: '【超长名称测试】这是一条非常非常长的二手物品名称，用来验证表格列的 show-overflow-tooltip 是否正常工作，同时检查详情弹窗和编辑表单在超长文本下的换行与布局表现，请勿真实购买', category_id: 1, price: 66.66, condition: '九成新', seller: '测试用户', contact: '微信：long_name_test', location: '图书馆三楼自习区靠窗位置', status: 'on_sale', img: '/placeholder/goods-6.svg', content: '超长内容测试：' + '内容'.repeat(120) },
  // 特殊字符 / XSS 测试
  { id: 7, name: "<script>alert('xss')</script> 测试特殊字符的物品", category_id: 6, price: 1, condition: '有瑕疵', seller: '安全测试员', contact: '邮箱：test@example.com', location: '信息楼 101', status: 'on_sale', img: '/placeholder/goods-7.svg', content: '用于验证前端是否正确转义 HTML 特殊字符。' },
  { id: 8, name: '🎮 Switch 游戏卡带 塞尔达传说 旷野之息', category_id: 2, price: 200, condition: '九成新', seller: '冯雪', contact: '微信：fengxue_game', location: '北苑快递驿站', status: 'on_sale', img: '/placeholder/goods-8.svg', content: '卡带无划痕，包装盒完好。' },
  // 无图片：测试「无图」占位
  { id: 9, name: '护眼 LED 台灯 三档调光', category_id: 3, price: 15, condition: '九成新', seller: '韩梅梅', contact: '微信：hanmeimei', location: '西苑 3 号楼', status: 'on_sale', img: null, content: '搬宿舍带不走，低价出。' },
  { id: 10, name: '斯伯丁篮球 7 号 室内外通用', category_id: 4, price: 30, condition: '七成新', seller: '周杰', contact: '微信：zhoujie_bike', location: '篮球场', status: 'sold', img: '/placeholder/goods-10.svg', content: '打过一学期，弹性正常。' },
  { id: 11, name: '卡西欧 fx-991CN X 科学计算器', category_id: 1, price: 45, condition: '九成新', seller: '赵一鸣', contact: 'QQ：88990011', location: '化学楼 A 座', status: 'on_sale', img: '/placeholder/goods-11.svg', content: '考试可用型号，功能全部正常。' },
  { id: 12, name: '哑铃一对 5kg 包胶防滑', category_id: 4, price: 40, condition: '八成新', seller: '周杰', contact: '微信：zhoujie_bike', location: '体育馆器材室', status: 'on_sale', img: '/placeholder/goods-12.svg', content: '自提，较重请自备交通工具。' },
  { id: 13, name: '静音电风扇 三档风速 台立两用', category_id: 3, price: 25, condition: '八成新', seller: '沈梦', contact: '微信：shenmeng', location: '东苑 8 号楼', status: 'on_sale', img: '/placeholder/goods-13.svg', content: '夏天用了一个季度，声音很小。' },
  { id: 14, name: 'AOC 24 寸 144Hz 电竞显示器', category_id: 2, price: 500, condition: '九成新', seller: '蒋涛', contact: '手机：13900002222', location: '信息楼 505', status: 'on_sale', img: '/placeholder/goods-14.svg', content: '无坏点，附 DP 线和电源适配器。' },
  { id: 15, name: 'AirPods 2 代 单只左耳（充电盒损坏）', category_id: 2, price: 80, condition: '有瑕疵', seller: '李雷', contact: '微信：lilei_english', location: '外语楼一楼', status: 'on_sale', img: '/placeholder/goods-15.svg', content: '左耳正常，充电盒无法充电，仅出耳机。' },
  { id: 16, name: '考研英语真题 2010-2025 全套 有笔记', category_id: 1, price: 10, condition: '七成新', seller: '马丽', contact: '微信：mali_news', location: '文学院图书室', status: 'on_sale', img: '/placeholder/goods-16.svg', content: '笔记较多，适合基础复习使用。' },
  // 价格为 0：免费赠送场景
  { id: 17, name: '瑜伽垫 全新未拆封 免费赠送', category_id: 4, price: 0, condition: '全新', seller: '吴敏', contact: '微信：wumin_law', location: '法学院门口', status: 'on_sale', img: '/placeholder/goods-17.svg', content: '买重复了，免费送，先到先得。' },
  { id: 18, name: '二手电动车 雅迪 48V 续航约 40km', category_id: 3, price: 800, condition: '八成新', seller: '何东', contact: '', location: '南门车棚', status: 'sold', img: '/placeholder/goods-18.svg', content: '电池一年前更换，牌照齐全。' },
  { id: 19, name: '惠普黑白激光打印机 家用小型', category_id: 2, price: 200, condition: '九成新', seller: '杨帆', contact: '微信：yangfan_phy', location: '物理楼 208', status: 'sold', img: '/placeholder/goods-19.svg', content: '含一个半满墨粉盒。' },
  { id: 20, name: '人体工学电竞椅 可躺', category_id: 3, price: 150, condition: '八成新', seller: '朱鹏', contact: '微信：zhupeng_cs', location: '研究生公寓 2 栋', status: 'off_shelf', img: '/placeholder/goods-20.svg', content: '因搬宿舍暂时下架，可预约看货。' },
  { id: 21, name: '二胡 初学款 附教材与松香', category_id: 5, price: 120, condition: '七成新', seller: '孙悦', contact: '微信：sunyue_music', location: '艺术楼 302', status: 'off_shelf', img: '/placeholder/goods-21.svg', content: '琴皮完好，适合初学者练习。' },
  // 超大价格：测试数值展示
  { id: 22, name: '价格上限测试商品 999999.99', category_id: 6, price: 999999.99, condition: '全新', seller: '测试用户', contact: '微信：price_test', location: '测试地点', status: 'on_sale', img: '/placeholder/goods-22.svg', content: '用于测试大额价格在表格中的显示。' },
  // 卖家信息为空 + 分类不存在
  { id: 23, name: '匿名发布的化学实验器材 试管架', category_id: 99, price: 15, condition: '八成新', seller: '', contact: '', location: '', status: 'on_sale', img: '/placeholder/goods-23.svg', content: '分类被删除后遗留的数据，用于测试「未分类」展示。' },
  { id: 24, name: '冬季羽绒服 男款 L 码 黑色', category_id: 3, price: 60, condition: '八成新', seller: '高翔', contact: 'QQ：55667788', location: '北苑 1 号楼', status: 'sold', img: '/placeholder/goods-24.svg', content: '去年冬天买的，洗过一次。' },
  { id: 25, name: '宿舍折叠床上书桌 可调节', category_id: 3, price: 35, condition: '九成新', seller: '罗颖', contact: '微信：luoying_jp', location: '西苑 6 号楼', status: 'on_sale', img: '/placeholder/goods-25.svg', content: '桌面无划痕，折叠方便。' },
  { id: 26, name: '羽毛球拍两支装 含手胶', category_id: 4, price: 55, condition: '九成新', seller: '徐蕾', contact: '微信：xulei_chem', location: '体育馆羽毛球场', status: 'on_sale', img: '/placeholder/goods-26.svg', content: '两支一起出，送三个羽毛球。' },
]

export const orders = [
  { id: 1, item_name: '高等数学（第七版）上下册 正版教材', item_img: '/placeholder/goods-1.svg', price: 25, seller: '林小雨', seller_avatar: '/placeholder/avatar-1.svg', seller_contact: '微信：linxiaoyu2026', buyer: '王思远', buyer_avatar: '/placeholder/avatar-5.svg', buyer_contact: '微信：wangsiyuan', location: '图书馆一楼大厅', trade_time: '2026-11-15 18:20:00', create_time: '2026-11-15 17:50:12', status: 'pending' },
  { id: 2, item_name: '二手 iPad 2021 64G 深空灰 含保护壳', item_img: '/placeholder/goods-2.svg', price: 1200, seller: '张伟', seller_avatar: '/placeholder/avatar-4.svg', seller_contact: 'QQ：100200300', buyer: '陈静', buyer_avatar: null, buyer_contact: '手机：13800003333', location: '东区食堂门口', trade_time: '2026-11-15 12:00:00', create_time: '2026-11-14 20:11:05', status: 'trading' },
  // 超长物品名
  { id: 3, item_name: '【超长名称测试】这是一条非常非常长的二手物品名称，用来验证交易记录表格在超长文本下的显示效果，请勿真实购买', item_img: '/placeholder/goods-6.svg', price: 66.66, seller: '测试用户', seller_avatar: null, seller_contact: '微信：long_name_test', buyer: '测试买家', buyer_avatar: null, buyer_contact: '', location: '图书馆三楼自习区靠窗位置', trade_time: '2026-11-13 09:30:00', create_time: '2026-11-12 22:03:44', status: 'completed' },
  // 买家联系方式为空 + 物品无图
  { id: 4, item_name: '宿舍迷你小冰箱 双开门 冷藏冷冻', item_img: null, price: 180, seller: '陈静', seller_avatar: null, seller_contact: '手机：13800001111', buyer: '沈梦', buyer_avatar: null, buyer_contact: '', location: '南苑 5 号宿舍楼', trade_time: '2026-11-16 19:00:00', create_time: '2026-11-16 10:20:00', status: 'pending' },
  // 交易时间为空：前端回退展示 create_time
  { id: 5, item_name: '山地自行车 26 寸 21 速 变速骑行', item_img: '/placeholder/goods-4.svg', price: 350, seller: '周杰', seller_avatar: null, seller_contact: '微信：zhoujie_bike', buyer: '蒋涛', buyer_avatar: null, buyer_contact: '手机：13900002222', location: '体育馆西侧停车棚', trade_time: null, create_time: '2026-11-11 08:15:30', status: 'completed' },
  { id: 6, item_name: '雅马哈 F310 民谣吉他 41 寸 带琴包', item_img: '/placeholder/goods-5.svg', price: 480, seller: '孙悦', seller_avatar: '/placeholder/avatar-10.svg', seller_contact: '微信：sunyue_music', buyer: '韩梅梅', buyer_avatar: null, buyer_contact: '微信：hanmeimei', location: '艺术楼 302', trade_time: null, create_time: '2026-11-10 16:40:00', status: 'cancelled' },
  { id: 7, item_name: '🎮 Switch 游戏卡带 塞尔达传说 旷野之息', item_img: '/placeholder/goods-8.svg', price: 200, seller: '冯雪', seller_avatar: null, seller_contact: '微信：fengxue_game', buyer: '朱鹏', buyer_avatar: '/placeholder/avatar-23.svg', buyer_contact: '微信：zhupeng_cs', location: '北苑快递驿站', trade_time: '2026-11-16 20:30:00', create_time: '2026-11-16 09:00:00', status: 'trading' },
  { id: 8, item_name: '护眼 LED 台灯 三档调光', item_img: null, price: 15, seller: '韩梅梅', seller_avatar: null, seller_contact: '微信：hanmeimei', buyer: '罗颖', buyer_avatar: null, buyer_contact: '微信：luoying_jp', location: '西苑 3 号楼', trade_time: '2026-11-09 21:10:00', create_time: '2026-11-09 18:00:00', status: 'completed' },
  { id: 9, item_name: '斯伯丁篮球 7 号 室内外通用', item_img: '/placeholder/goods-10.svg', price: 30, seller: '周杰', seller_avatar: null, seller_contact: '微信：zhoujie_bike', buyer: '高翔', buyer_avatar: null, buyer_contact: 'QQ：55667788', location: '篮球场', trade_time: '2026-11-17 16:00:00', create_time: '2026-11-16 14:00:00', status: 'pending' },
  // 价格为 0 的免费赠送交易
  { id: 10, item_name: '瑜伽垫 全新未拆封 免费赠送', item_img: '/placeholder/goods-17.svg', price: 0, seller: '吴敏', seller_avatar: null, seller_contact: '微信：wumin_law', buyer: '徐蕾', buyer_avatar: null, buyer_contact: '微信：xulei_chem', location: '法学院门口', trade_time: '2026-11-08 12:20:00', create_time: '2026-11-08 09:00:00', status: 'completed' },
  { id: 11, item_name: '哑铃一对 5kg 包胶防滑', item_img: '/placeholder/goods-12.svg', price: 40, seller: '周杰', seller_avatar: null, seller_contact: '微信：zhoujie_bike', buyer: '赵一鸣', buyer_avatar: null, buyer_contact: 'QQ：88990011', location: '体育馆器材室', trade_time: null, create_time: '2026-11-07 19:30:00', status: 'cancelled' },
  // 超长交易地点
  { id: 12, item_name: '静音电风扇 三档风速 台立两用', item_img: '/placeholder/goods-13.svg', price: 25, seller: '沈梦', seller_avatar: null, seller_contact: '微信：shenmeng', buyer: '林小雨', buyer_avatar: '/placeholder/avatar-1.svg', buyer_contact: '微信：linxiaoyu2026', location: '南区学生公寓 12 号楼 3 单元楼下快递驿站旁边的长椅处（靠近西门）', trade_time: '2026-11-18 18:30:00', create_time: '2026-11-16 15:10:00', status: 'pending' },
  { id: 13, item_name: 'AOC 24 寸 144Hz 电竞显示器', item_img: '/placeholder/goods-14.svg', price: 500, seller: '蒋涛', seller_avatar: null, seller_contact: '手机：13900002222', buyer: '朱鹏', buyer_avatar: '/placeholder/avatar-23.svg', buyer_contact: '微信：zhupeng_cs', location: '信息楼 505', trade_time: '2026-11-06 10:00:00', create_time: '2026-11-05 21:00:00', status: 'completed' },
  { id: 14, item_name: '考研英语真题 2010-2025 全套 有笔记', item_img: '/placeholder/goods-16.svg', price: 10, seller: '马丽', seller_avatar: '/placeholder/avatar-18.svg', seller_contact: '微信：mali_news', buyer: '韩梅梅', buyer_avatar: null, buyer_contact: '微信：hanmeimei', location: '文学院图书室', trade_time: '2026-11-19 09:00:00', create_time: '2026-11-16 16:30:00', status: 'pending' },
  { id: 15, item_name: '二手电动车 雅迪 48V 续航约 40km', item_img: '/placeholder/goods-18.svg', price: 800, seller: '何东', seller_avatar: null, seller_contact: '', buyer: '杨帆', buyer_avatar: null, buyer_contact: '微信：yangfan_phy', location: '南门车棚', trade_time: '2026-11-14 17:45:00', create_time: '2026-11-13 11:00:00', status: 'trading' },
  { id: 16, item_name: '惠普黑白激光打印机 家用小型', item_img: '/placeholder/goods-19.svg', price: 200, seller: '杨帆', seller_avatar: null, seller_contact: '微信：yangfan_phy', buyer: '陈静', buyer_avatar: null, buyer_contact: '手机：13800001111', location: '物理楼 208', trade_time: '2026-11-04 15:00:00', create_time: '2026-11-03 10:00:00', status: 'completed' },
  { id: 17, item_name: '人体工学电竞椅 可躺', item_img: '/placeholder/goods-20.svg', price: 150, seller: '朱鹏', seller_avatar: '/placeholder/avatar-23.svg', seller_contact: '微信：zhupeng_cs', buyer: '何东', buyer_avatar: null, buyer_contact: '', location: '研究生公寓 2 栋', trade_time: null, create_time: '2026-11-02 13:20:00', status: 'cancelled' },
  { id: 18, item_name: '宿舍折叠床上书桌 可调节', item_img: '/placeholder/goods-25.svg', price: 35, seller: '罗颖', seller_avatar: null, seller_contact: '微信：luoying_jp', buyer: '沈梦', buyer_avatar: null, buyer_contact: '微信：shenmeng', location: '西苑 6 号楼', trade_time: '2026-11-20 12:00:00', create_time: '2026-11-16 17:05:00', status: 'trading' },
]

export const imageClasses = [
  { id: 1, name: '校园风景', order: 100 },
  { id: 2, name: '二手物品展示', order: 90 },
  { id: 3, name: '用户头像', order: 80 },
  { id: 4, name: '社团活动', order: 70 },
]

function makeImages(startId, imageClassId, count, prefix, label) {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    image_class_id: imageClassId,
    name: `${label}-${i + 1}.jpg`,
    url: `/placeholder/${prefix}-${i + 1}.svg`,
  }))
}

export const images = [
  // 第一类 12 张，用于测试图片列表分页（每页 10 条）
  ...makeImages(1, 1, 12, 'scenery', '校园风景'),
  ...makeImages(13, 2, 5, 'goods', '二手物品'),
  ...makeImages(18, 3, 3, 'avatar', '用户头像'),
  ...makeImages(21, 4, 2, 'activity', '社团活动'),
]

// 首页顶部统计卡片
export function getStatistics1() {
  return {
    panels: [
      { title: '今日新增物品', unit: '件', unitColor: 'success', value: 128, subTitle: '较昨日', subValue: 12, subUnit: '%' },
      { title: '今日交易订单', unit: '单', unitColor: 'warning', value: 96, subTitle: '较昨日', subValue: 8, subUnit: '%' },
      { title: '待处理举报', unit: '条', unitColor: 'danger', value: 7, subTitle: '较昨日', subValue: 3, subUnit: '条' },
      { title: '校园活跃用户', unit: '人', unitColor: 'info', value: 1024, subTitle: '较昨日', subValue: 64, subUnit: '人' },
    ],
  }
}

// 首页右侧提示卡片
export function getStatistics2() {
  return {
    goods: [
      { value: 32, label: '在售中' },
      { value: 12, label: '已售出' },
      { value: 5, label: '已下架' },
      { value: 9, label: '今日新增' },
    ],
    order: [
      { value: 8, label: '待见面' },
      { value: 6, label: '交易中' },
      { value: 20, label: '已完成' },
      { value: 3, label: '已取消' },
    ],
  }
}

// 首页交易统计柱状图
export function getStatistics3(type = 'week') {
  const wave = (n, base, offset = 0) =>
    Array.from({ length: n }, (_, i) => Math.max(0, Math.round(base + Math.sin((i + offset) * 1.3) * base * 0.5 + (i % 3) * 2)))

  if (type === 'hour') {
    return {
      x: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      y: wave(24, 6),
    }
  }
  if (type === 'month') {
    const now = new Date()
    return {
      x: Array.from({ length: 30 }, (_, i) => {
        const d = new Date(now.getTime() - (29 - i) * 24 * 3600 * 1000)
        return `${d.getMonth() + 1}/${d.getDate()}`
      }),
      y: wave(30, 18, 2),
    }
  }
  // 默认近一周
  return { x: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], y: [12, 18, 9, 24, 30, 42, 35] }
}
