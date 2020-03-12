'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"//jkadmin.henanyz.com"'//正式
 //API_URL: '"//jkhealth.henanyz.com"'//问答
  //API_URL: '"https://question.wisdoc.cn"'
  // 生产环境配置的api ，只在生产环境生效 设置为空则默认服务器路径
                  // 不放在服务器下则可以单独写服务器路径，单独解决跨域，  例如 www.baidu.com ，ningx 解决跨域
                  // 不是非要放后台服务器上 后台一个服务器控制多项目可以用这个
 // API_URL: '"www.baidu.com"'         
}
