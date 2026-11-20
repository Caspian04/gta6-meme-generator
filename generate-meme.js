const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Create canvas - Instagram/X post size (1080x1080)
const width = 1080;
const height = 1080;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background - dark GTA 6 style gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#0a0a0f');
gradient.addColorStop(0.3, '#1a0d1a');
gradient.addColorStop(0.6, '#2d1020');
gradient.addColorStop(1, '#0f0512');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add subtle noise texture
for (let i = 0; i < 5000; i++) {
  ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.02})`;
  ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
}

// GTA 6 style text - "13 YEARS LATER"
ctx.font = 'bold 96px "Arial Black", sans-serif';
ctx.textAlign = 'center';
ctx.fillStyle = '#ffcc00';
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;
ctx.strokeText('13 YEARS LATER', width/2, 180);
ctx.fillText('13 YEARS LATER', width/2, 180);

// GTA 6 logo style text
ctx.font = 'bold 140px "Arial Black", sans-serif';
ctx.fillStyle = '#fff';
ctx.strokeStyle = '#ff3366';
ctx.lineWidth = 6;
ctx.strokeText('GTA', width/2, 320);
ctx.fillText('GTA', width/2, 320);

ctx.font = 'bold 140px "Arial Black", sans-serif';
ctx.fillStyle = '#ff3366';
ctx.strokeStyle = '#fff';
ctx.lineWidth = 4;
ctx.strokeText('VI', width/2 + 180, 320);
ctx.fillText('VI', width/2 + 180, 320);

// Vice City vibes - palm tree silhouettes
ctx.fillStyle = '#1a0a1a';
for (let x = 50; x < width; x += 200) {
  // Palm trunk
  ctx.fillRect(x + 20, 400, 8, 200);
  // Palm leaves
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i - 2) * 0.4;
    ctx.moveTo(x + 24, 400);
    ctx.quadraticCurveTo(
      x + 24 + Math.sin(angle) * 80,
      350 + Math.cos(angle) * 50,
      x + 24 + Math.sin(angle) * 120,
      380 + Math.cos(angle) * 80
    );
  }
  ctx.fill();
}

// Neon pink accent line
ctx.strokeStyle = '#ff3366';
ctx.lineWidth = 3;
ctx.setLineDash([20, 10]);
ctx.beginPath();
ctx.moveTo(100, 450);
ctx.lineTo(width - 100, 450);
ctx.stroke();
ctx.setLineDash([]);

// Meme content area
ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
ctx.fillRect(80, 480, width - 160, 350);

// Top text - "ME WAITING FOR GTA 6"
ctx.font = 'bold 48px "Arial Black", sans-serif';
ctx.fillStyle = '#fff';
ctx.textAlign = 'center';
ctx.fillText('ME WAITING FOR GTA 6', width/2, 550);

// Draw a simple stick figure "waiting" - sitting on chair
ctx.strokeStyle = '#ffcc00';
ctx.lineWidth = 4;
ctx.lineCap = 'round';

// Chair
ctx.beginPath();
ctx.moveTo(width/2 - 60, 750);
ctx.lineTo(width/2 + 60, 750); // seat
ctx.moveTo(width/2 - 50, 750);
ctx.lineTo(width/2 - 50, 850); // back left
ctx.moveTo(width/2 + 50, 750);
ctx.lineTo(width/2 + 50, 850); // back right
ctx.moveTo(width/2 - 50, 850);
ctx.lineTo(width/2 + 50, 850); // top back
ctx.stroke();

// Stick figure sitting
ctx.beginPath();
// Head
ctx.arc(width/2, 620, 40, 0, Math.PI * 2);
// Body
ctx.moveTo(width/2, 660);
ctx.lineTo(width/2, 750);
// Arms crossed
ctx.moveTo(width/2 - 50, 690);
ctx.lineTo(width/2 - 10, 690);
ctx.moveTo(width/2 + 10, 690);
ctx.lineTo(width/2 + 50, 690);
// Legs
ctx.moveTo(width/2, 750);
ctx.lineTo(width/2 - 30, 830);
ctx.moveTo(width/2, 750);
ctx.lineTo(width/2 + 30, 830);
ctx.stroke();

// Speech bubble
ctx.fillStyle = 'rgba(255, 204, 0, 0.9)';
ctx.beginPath();
ctx.roundRect(width/2 + 80, 550, 280, 100, 20);
ctx.fill();
// Bubble tail
ctx.beginPath();
ctx.moveTo(width/2 + 80, 590);
ctx.lineTo(width/2 + 50, 610);
ctx.lineTo(width/2 + 80, 630);
ctx.fill();

ctx.fillStyle = '#000';
ctx.font = 'bold 24px Arial, sans-serif';
ctx.textAlign = 'left';
ctx.fillText('"Where is it?!"', width/2 + 100, 600);
ctx.fillText('"13 years..."', width/2 + 100, 630);

// Bottom text - make.fun branding
ctx.fillStyle = '#fff';
ctx.font = 'bold 32px Arial, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('make.fun', width/2, 920);

ctx.font = '24px Arial, sans-serif';
ctx.fillStyle = '#aaa';
ctx.fillText('AI agents build software for cash rewards', width/2, 955);

// Ghost mascot - simple white ghost
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.beginPath();
ctx.arc(width - 120, 120, 35, Math.PI, 0);
ctx.lineTo(width - 85, 180);
ctx.quadraticCurveTo(width - 85, 195, width - 100, 195);
ctx.quadraticCurveTo(width - 115, 195, width - 115, 180);
ctx.lineTo(width - 155, 180);
ctx.quadraticCurveTo(width - 155, 195, width - 170, 195);
ctx.quadraticCurveTo(width - 185, 195, width - 185, 180);
ctx.closePath();
ctx.fill();

// Ghost eyes
ctx.fillStyle = '#000';
ctx.beginPath();
ctx.arc(width - 140, 130, 6, 0, Math.PI * 2);
ctx.arc(width - 100, 130, 6, 0, Math.PI * 2);
ctx.fill();

// @makefunai tag
ctx.fillStyle = '#ff3366';
ctx.font = 'bold 28px Arial, sans-serif';
ctx.textAlign = 'right';
ctx.fillText('@makefunai', width - 50, 980);

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('meme.png', buffer);
console.log('Meme saved to meme.png');
