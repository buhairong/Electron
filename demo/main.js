const { app, BrowserWindow, globalShortcut } = require('electron')

console.log(process.platform)

// 定义全局变量存放主窗口 id
let mainWinId = null

// 创建窗口
function createWindow () {
  console.log('ready')
  // 创建主进程
  const mainWin = new BrowserWindow({
    title: '自定义菜单',
    show: false, // true：显示窗体，false: 不显示窗体
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true, // 允许浏览器环境使用Node API
      enableRemoteModule: true, // 允许页面使用 remote
    }
  })

  // 在当前窗口中加载指定界面让它显示具体的内容
  mainWin.loadFile('index.html')
  
  mainWinId = mainWin.id

  mainWin.on('ready-to-show', () => {
    mainWin.show() // 在窗体完全加载完成后，显示窗体，避免白页现象
  })

  mainWin.on('close', () => {
    console.log('close')
    //mainWin = null
  })
}

// 当 app 启动之后，执行窗口创建等操作
app.on('ready', createWindow)

// 注册快捷键
app.on('ready', () => {
  const ret = globalShortcut.register('ctrl + q', () => {
    console.log('快捷键注册')
  })

  if (!ret) {
    console.log('注册失败')
  }

  console.log(globalShortcut.isRegistered('ctrl + q'))
  console.log(ret)
})

app.on('will-quit', () => {
  // 取消注册的快捷键
  globalShortcut.unregister('ctrl + q')

  // 取消所有注册的快捷键
  globalShortcut.registerAll()
})

app.on('window-all-closed', () => {
  console.log('window-all-closed')
  app.quit()
})
