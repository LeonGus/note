/*
 * @Author: Leon
 * @Date: 2021-01-17 13:45:19
 * @version: 0.0.1
 * @Descripttion: 这是注释
 * @LastEditors: Leon
 * @LastEditTime: 2021-01-17 21:34:25
 */
const ph = require('path')
const fs = require('fs')
// 自动获取侧边栏
/* {
  title: '附录',
  collapsable: false, // 可选的, 默认值是 true,
  children: [
      '/appendix/',
      '/appendix/船公司和船名列表',
      '/appendix/港口列表',
      '/appendix/箱型和包装单位列表',
      '/appendix/国家代码列表',
  ]
} */
function getSideBar(folder) {
  // 只能用绝对路径
  // let path2 = 'D:/PersonalProject/vue_press/docs/pages/' + folder + '/';
  let path2 = ph.resolve(__dirname,`../${folder}/`)
  let file_list = fs.readdirSync(path2);
  const _temp = ['',]
  for (let i = 0; i < file_list.length; i++) {
      // 可根据需求定制文件名，但是不能有.md后缀
      // file_list[i] = file_list[i].slice(0, -3);
      let _name = file_list[i]
      if(!_name.endsWith('.md') || _name.startsWith('README')) continue
      _name = _name.slice(0, -3)
      _temp.push(_name)
  }
  console.log(_temp)
  file_list.unshift('')
  return _temp
}
module.exports = {
  title: `leon's Note`,
  description: '笔记',
  base: '/note/',
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'webpack', link: '/webpack/' },
    ],
    sidebar: {
      '/webpack/': getSideBar('webpack'),
    },
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