/*
 * @Author: Leon
 * @Date: 2021-01-17 21:41:28
 * @version: 0.0.1
 * @Descripttion: 这是注释
 * @LastEditors: Leon
 * @LastEditTime: 2021-01-22 14:49:13
 */
const ph = require('path')
const fs = require('fs')
// 自动获取导航栏
exports.getNav =  function (folder) {
    // 只能用绝对路径
    // path = 'D:/PersonalProject/vue_press/docs/pages/' + folder + '/';
    let path3 = ph.resolve(__dirname,`../../pages/${folder}/`)
    let file_list = fs.readdirSync(path3);
    let nav_text = [];
    for (let i = 0; i < file_list.length; i++) {
        nav_text.push({
            // 这里也可以根据需求定制，同样不能有后缀
            text: file_list[i].slice(0, -3),
            link: '/pages/' + folder + '/' + file_list[i].slice(0, -3)
            });
    }
    return nav_text;
}

// 自动获取侧边栏
exports.getSideBar =  function (folder) {
    // 只能用绝对路径
    // let path2 = 'D:/PersonalProject/vue_press/docs/pages/' + folder + '/';
    let path2 = ph.resolve(__dirname,`../../${folder}/`)
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
    return _temp
  }