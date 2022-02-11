const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  // 发送数据给 index.js
  const oBtn = document.getElementById('btn')
  oBtn.addEventListener('click', () => {
    ipcRenderer.send('stm', 'stm')
  })

  // 接收数据
  ipcRenderer.on('its', (e, data) => {
    console.log(data)
  })
})