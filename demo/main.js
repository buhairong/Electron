const { app, BrowserWindow } = require('electron')

// 创建窗口
function createWindow () {
  console.log('ready')
  // 创建主进程
  const mainWin = new BrowserWindow({
    x: 100, // 窗口 x轴坐标
    y: 100, // 窗口 y轴坐标
    show: false, // true：显示窗体，false: 不显示窗体
    //transparent: true, // 设置窗体透明
    title: '自定义标题', // 设置标题
    icon: 'lg.ico', // 设置应用图标
    frame: true, // 设置false, 只显示窗体内容，不展示默认的标题栏和菜单栏
    autoHideMenuBar: true, // 设置是否隐藏默认菜单栏
    webPreferences: {
      nodeIntegration: true, // 允许浏览器环境使用Node API
      enableRemoteModule: true, // 允许页面使用 remote
    }
  })

  // 在当前窗口中加载指定界面让它显示具体的内容
  mainWin.loadFile('index.html')

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

app.on('window-all-closed', () => {
  console.log('window-all-closed')
  app.quit()
})