import * as PIXI from 'pixi.js'
import Particle from '@/libs/particle'
import Utils from '@/utils'

class Floor extends PIXI.ParticleContainer {
  
  constructor() {
    super()
    this.init()
  }

  init() {
    this.particles = []
    this.createParticles()
    this.y = window.innerHeight + 50
  }

  createParticles() {
    const count = window.innerWidth / 50
    this.speed = 0.05
    for(let i = 0; i < count; i++) {
      const dot = new Particle()
      dot.width = 300
      dot.height = 400
      dot.x = i * 60 - 30
      dot.vy = Utils.range(0, 50)
      this.addChild(dot)
      this.particles.push(dot)
    }
    
    
  }

  update() {
    for(let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i]
      particle.vy += this.speed
      particle.y += 0.5 * Math.sin(particle.vy)
    }
    
  }

}

export default Floor