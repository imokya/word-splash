import * as PIXI from 'pixi.js'
import Utils from '@/utils'

class Particle extends PIXI.Sprite {

  constructor() {
    const tex = PIXI.Texture.from(require('@/assets/img/dot.png'))
    super(tex)
    this.init()
  }

  init() {
    this.vx = 0
    this.vy = 0
    this.gravity = 0.1
    this.bounce = -Utils.range(0.4, 0.1)
    this.vxRange = Utils.range(-2, 2) 
    this.hit = false
    this.bottom = window.innerHeight
    this.anchor.set(0.5)
    this.scale.set(0.15)
  }

  update() {
    this.vy += this.gravity
    
    this.x += this.vx
    this.y += this.vy

    if(this.hit) this.x += this.vxRange
   
    if(this.y > this.bottom - 60) {
      this.bounce *= 0.9
      this.vy *= this.bounce 
      this.y = this.bottom - 60 
      this.hit = true
    } 
   
  }

}

export default Particle