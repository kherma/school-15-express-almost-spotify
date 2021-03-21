const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 100);
  const particlesLength = Math.floor(window.innerWidth / 12);
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(17, 17, 17);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    particle.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.size = 10;
    this.move = createVector(random(-1, 1), random(-1, 1));
  }

  update() {
    this.edges();
    this.position.add(this.move);
  }

  draw() {
    noStroke();
    fill("rgba(255, 255, 255, 0.5)");
    circle(this.position.x, this.position.y, this.size);
  }

  edges() {
    if (this.position.x < 0 || this.position.x > width) {
      this.move.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.move.y *= -1;
    }
  }

  checkParticles(particles) {
    particles.forEach((particle) => {
      const distance = dist(
        this.position.x,
        this.position.y,
        particle.position.x,
        particle.position.y
      );

      if (distance < 120) {
        stroke("rgba(255,255,255,0.1)");
        line(
          this.position.x,
          this.position.y,
          particle.position.x,
          particle.position.y
        );
      }
    });
  }
}
