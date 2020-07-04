import * as PIXI from 'pixi.js'
import Particle from '@/libs/particle'
import Utils from '@/utils'

const assets = [
  require('@/assets/img/font/1/1.png'),
  require('@/assets/img/font/1/2.png'),
  require('@/assets/img/font/1/3.png'),
  require('@/assets/img/font/1/4.png'),
  require('@/assets/img/font/1/5.png'),
  require('@/assets/img/font/1/6.png'),
  require('@/assets/img/font/1/7.png'),
  require('@/assets/img/font/1/8.png'),
  require('@/assets/img/font/1/9.png'),
  require('@/assets/img/font/1/10.png'),

  require('@/assets/img/font/2/1.png'),
  require('@/assets/img/font/2/2.png'),
  require('@/assets/img/font/2/3.png'),
  require('@/assets/img/font/2/4.png'),
  require('@/assets/img/font/2/5.png'),
  require('@/assets/img/font/2/6.png'),
  require('@/assets/img/font/2/7.png'),
  require('@/assets/img/font/2/8.png'),
  require('@/assets/img/font/2/9.png'),
  require('@/assets/img/font/2/10.png'),

  require('@/assets/img/font/3/1.png'),
  require('@/assets/img/font/3/2.png'),
  require('@/assets/img/font/3/3.png'),
  require('@/assets/img/font/3/4.png'),
  require('@/assets/img/font/3/5.png'),
  require('@/assets/img/font/3/6.png'),
  require('@/assets/img/font/3/7.png'),
  require('@/assets/img/font/3/8.png'),
  require('@/assets/img/font/3/9.png'),
  require('@/assets/img/font/3/10.png'),
]

class Char extends PIXI.ParticleContainer {
  
  constructor(x, y) {
    super()
    this.baseX = x || 0
    this.baseY = y || 0
    this.alive = true
    this.hitCounts = 0
    this.init()
  }

  init() {
    this.particles = []
    this.getImageData()
  }

  update() {
    if(this.particles.length === 0) return
    for(let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i]
      if(particle.hit && this.alive) {
        this.alive = false
        this.timeLeft = +new Date
      }
      particle.update()
    }
    
  }

  destroy() {
    
  }

  createChar() {
    for(let i = 0; i < this.data.length; i+=5) {
      const dot = new Particle()
      dot.x = this.baseX + this.data[i].x * 1.2
      dot.y = this.baseY + this.data[i].y * 1.2
      this.addChild(dot)
      this.particles.push(dot)
    }
  }

  getImageData() {
    const size = 100
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size
    const index = (Math.random() * assets.length) | 0
    const src = assets[index]
    const img = new Image()
    this.data = []
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      const imgData = ctx.getImageData(0, 0, size, size)
      for(let i = 0; i < imgData.data.length; i+=4) {
        const alpha = imgData.data[i+3]
        const index = i / 4
        if(alpha > 0) {
          this.data.push({
            x: index % size,
            y: index / size | 0
          })
        }
      }
      this.createChar()
    }
    img.src = src
  }

}

export default Char