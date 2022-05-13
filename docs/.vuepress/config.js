/*
 * @Author: Leon
 * @Date: 2021-01-17 13:45:19
 * @version: 0.0.1
 * @Descripttion: 这是注释
 * @LastEditors: Leon
 * @LastEditTime: 2021-01-17 22:30:04
 */
const { sideBar, navs } = require('./config/index.js')
// console.log(getSideBar('webpack'));
module.exports = {
  title: `leon's Note`,
  description: '笔记',
  base: '/note/',
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }]
  ],
  themeConfig: {
    nav: navs,
    sidebar: sideBar,
    lastUpdated: '更新于'
  },
  plugins: ['@vuepress/last-updated'],
  markdown: {
    // 解决markdown资源中文路径
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  }
}