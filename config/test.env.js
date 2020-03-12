'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL: '"/api"'  // 测试环境配置的api ，只在测试环境生效 
})
