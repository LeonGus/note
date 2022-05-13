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
const navs = getNav()
const sideBar = getSideBar(navs)
// 自动获取导航栏
 function getNav (path = ph.resolve(process.cwd(), 'docs/pages')) {
    // 只能用绝对路径
    // path = 'D:/PersonalProject/vue_press/docs/pages/' + folder + '/';
    let file_list = fs.readdirSync(path);
    let nav_text = [];
    for (let i = 0; i < file_list.length; i++) {

        nav_text.push(getNavItem(path, file_list[i]))
    }
    return filterUndefined(nav_text);
}
  function getSideBar (nl) {
    // 只能用绝对路径
    const sbInner = {}
    nl.forEach(e => {
        sbInner[decodeURI(e.link)] = [...new Set(getSideBarItem(e, sbInner))]
    })
    return sbInner
  }
  function getSideBarItem(e, sbInner) {
    let file_list = fs.readdirSync(decodeURI(ph.resolve(process.cwd(), 'docs' + e.link)));
    const _temp = ['',]
    if(e.items && e.items.length) {
       const _tempSidebar = getSideBar(e.items)
       for (const key in _tempSidebar) {
        sbInner[key] = _tempSidebar[key]
       }
    }
    for (let i = 0; i < file_list.length; i++) {
        // 可根据需求定制文件名，但是不能有.md后缀
        // file_list[i] = file_list[i].slice(0, -3);
        let _name = file_list[i]
        if(!_name.endsWith('.md') || _name.startsWith('README')) continue
        _name = _name.slice(0, -3)
        _temp.push(encodeURI(_name))
    }
    return _temp
  }

  function getNavItem(absolutePath, dirName) {
    let path = ph.resolve(absolutePath, dirName)
    // 如果不是目录 返回普通导航
    if(!isDir(path)) {
        if(dirName.endsWith('.md')) {
            return undefined
        }
        return{
            //     // 这里也可以根据需求定制，同样不能有后缀
                text: dirName,
                link: handleUrl(path)
                }
    }
    // 如果是目录 返回子目录
    // 判断是否有子目录
    let file_list = fs.readdirSync(path);
    if(file_list.some(e => fs.lstatSync(ph.resolve(path, e)).isDirectory())){
        return {
                    // 这里也可以根据需求定制，同样不能有后缀
                    text: dirName,
                    link: handleUrl(path),
                    items: getNav(path)
                    }
    }
    // 如果没有.md undefined
    if (!file_list.includes('README.md')) return undefined
    // 如果没有子目录 返回普通导航
         return {
                // 这里也可以根据需求定制，同样不能有后缀
                text: dirName,
                link: handleUrl(path)
                }
    

  }
// 判读是否是目录
function isDir(path) {
    return fs.lstatSync(path).isDirectory()
}

// 过滤items中的undefined
function filterUndefined(items) {
    // if(items.items) return items.items.filter(e => e)
    return items.filter(e => {
        if(items.items) return filterUndefined(items.items)
        return e
    })
}

// 处理url
function handleUrl(url) {
    return encodeURI(url.split('docs')[1])+ '/'
}
exports.navs = navs
// 自动获取侧边栏
exports.sideBar = sideBar
