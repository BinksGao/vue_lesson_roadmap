let SystemCode = {
  nameError: 100005, // 用户名已存在
  authError: 400001, // 验证码不正确
  passError: 100000, // 密码不正确
  nameErrors: 100006, // 用户名不存在
  systemError: 500, // 服务端错误
  systemSuccess: 200, // 服务端正常
  accountError: 100011 // 账号被封禁
};
let UserType = {
  normal: 0, // 平台游客
  vip: 1, // 付费会员
  foever: 2, // 永久会员
  admin: 3 // 管理员
};
export default { SystemCode, UserType };
