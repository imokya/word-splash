import * as PIXI from 'pixi.js'
import Char from '@/libs/char.js'
import Floor from '@/libs/floor.js'
import Utils from '@/utils'

let w, h

class App {

  constructor(el) {
    this.el = el
    this.init()
  }

  init() {
    this.initScene()
    this.initFloor()
    this.addChars()
    this.addFilter()
    this.bindEvent()
  }

  bindEvent() {
    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  onResize() {
    w = window.innerWidth
    h = window.innerHeight
    this.app.renderer.resize(w, h)
  }

  initFloor() {
    this.floor = new Floor()
    this.app.stage.addChild(this.floor)
  }

  addChars() {
    this.chars = []
    this.container = new PIXI.Container()
    this.addChar()
    this.app.stage.addChild(this.container)
    this.app.ticker.add(this.update.bind(this))  
  }

  addChar() {
    const charX = Utils.range(0, window.innerWidth - 150)
    const charY = Utils.range(-1000, -200)
    const char = new Char(charX, charY)
    this.container.addChild(char)
    this.chars.push(char)
    setTimeout(this.addChar.bind(this), 800)
  }

  addFilter() {
    const blurFilter = new PIXI.filters.BlurFilter(3)
    const fs = `
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;
      void main(void) {
        vec4 color = texture2D(uSampler, vTextureCoord);
        if(color.a > 0.6) {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      }
    `
    const thresholdFilter = new PIXI.Filter(undefined, fs, {})
    this.app.stage.filters = [blurFilter, thresholdFilter]
    this.app.stage.filterArea = this.app.renderer.screen
  }

  initScene() {
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      backgrondColor: 0xffffff
    })
    this.app.view.style.width = '100%'
    this.app.view.style.height = '100%'
    this.app.view.style.position = 'absolute'
    this.el.appendChild(this.app.view)
  }

  update() {
    this.floor.update()
    for(let i = 0; i < this.chars.length; i++) {
      const char = this.chars[i]
      char.update()
      if(!char.alive) {
        const now = +new Date
        if(now - char.timeLeft > 1000) {
          this.chars.splice(i, 1)
          this.container.removeChild(char)
        }
      }
    }
 
  
  }

}

export default App