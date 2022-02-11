const { clipboard, nativeImage } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const aBtn = document.getElementsByTagName('button')
  const aInput = document.getElementsByTagName('input')
  const oBtn = document.getElementById('clipImg')
  let ret = null

  aBtn[0].addEventListener('click', () => {
    // 复制内容到剪切板
    ret = clipboard.writeText(aInput[0].value)
  })

  aBtn[1].addEventListener('click', () => {
    // 粘贴剪切板内的内容
    aInput[1].value = clipboard.readText(ret)
  })

  oBtn.addEventListener('click', () => {
    // 将图片放置于剪切板当中的时候要求图片类型属于 nativeImage 实例
    const oImage = nativeImage.createFromPath('./msg.png')
    clipboard.writeImage(oImage)

    // 将剪切板中的图片做为 DOM 元素显示在界面上
    const oImg = clipboard.readImage()
    const oImgDom = new Image()
    oImgDom.src = oImg.toDataURL()
    document.body.append(oImgDom)
  })
})
