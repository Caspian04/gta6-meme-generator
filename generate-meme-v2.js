const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const width = 1080;
const height = 1350;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, '#0d0515');
gradient.addColorStop(0.15, '#1a0828');
gradient.addColorStop(0.35, '#3d0c3a');
gradient.addColorStop(0.55, '#8b1a3a');
gradient.addColorStop(0.7, '#e85d2a');
gradient.addColorStop(0.85, '#ff9a3c');
gradient.addColorStop(1, '#ffcc66');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

const sunGradient = ctx.createRadialGradient(width/2, height * 0.3, 0, width/2, height * 0.3, 400);
sunGradient.addColorStop(0, 'rgba(255, 154, 60, 0.4)');
sunGradient.addColorStop(0.5, 'rgba(232, 93, 42, 0.15)');
sunGradient.addColorStop(1, 'rgba(61, 12, 58, 0)');
ctx.fillStyle = sunGradient;
ctx.fillRect(0, 0, width, height);

ctx.strokeStyle = 'rgba(255, 154, 60, 0.08)';
ctx.lineWidth = 1;
for (let i = 0; i < 20; i++) {
  const y = height * 0.6 + i * 40;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();
}
for (let i = -10; i < 20; i++) {
  const x = width/2 + i * 60 - (height * 0.6) * 0.5;
  ctx.beginPath();
  ctx.moveTo(x, height * 0.6);
  ctx.lineTo(width/2, height);
  ctx.stroke();
}

function drawPalm(x, y, scale, opacity) {
  ctx.fillStyle = `rgba(10, 5, 20, ${opacity})`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x - 10 * scale, y - 80 * scale, x - 5 * scale, y - 160 * scale);
  ctx.quadraticCurveTo(x + 5 * scale, y - 160 * scale, x + 10 * scale, y - 80 * scale);
  ctx.quadraticCurveTo(x + 15 * scale, y - 80 * scale, x, y);
  ctx.fill();
  
  for (let i = 0; i < 7; i++) {
    const angle = (i - 3) * 0.35;
    const len = 70 * scale;
    ctx.beginPath();
    ctx.moveTo(x, y - 160 * scale);
    ctx.quadraticCurveTo(
      x + Math.sin(angle) * len * 0.7,
      y - 160 * scale - Math.cos(angle) * len * 0.7,
      x + Math.sin(angle) * len,
      y - 160 * scale - Math.cos(angle) * len
    );
    ctx.lineWidth = 3 * scale;
    ctx.strokeStyle = `rgba(10, 5, 20, ${opacity})`;
    ctx.stroke();
  }
}

drawPalm(80, height - 50, 1.2, 0.6);
drawPalm(width - 180, height - 50, 1.2, 0.6);
drawPalm(200, height - 80, 0.9, 0.4);
drawPalm(width - 300, height - 80, 0.9, 0.4);

ctx.fillStyle = 'rgba(13, 5, 21, 0.85)';
ctx.fillRect(60, 120, width - 120, height - 240);

ctx.strokeStyle = '#ff3366';
ctx.lineWidth = 3;
ctx.strokeRect(60, 120, width - 120, height - 240);

ctx.strokeStyle = 'rgba(255, 51, 102, 0.3)';
ctx.lineWidth = 1;
ctx.strokeRect(63, 123, width - 126, height - 246);

ctx.font = 'bold 88px "Arial Black", "Impact", sans-serif';
ctx.textAlign = 'center';
ctx.fillStyle = '#ffd700';
ctx.strokeStyle = '#000';
ctx.lineWidth = 5;
ctx.strokeText('13 YEARS', width/2, 230);
ctx.fillText('13 YEARS', width/2, 230);

ctx.font = 'bold 72px "Arial Black", "Impact", sans-serif';
ctx.strokeText('LATER...', width/2, 310);
ctx.fillText('LATER...', width/2, 310);

ctx.font = 'bold 130px "Arial Black", "Impact", sans-serif';
ctx.fillStyle = '#fff';
ctx.strokeStyle = '#ff3366';
ctx.lineWidth = 7;
ctx.strokeText('GTA', width/2 - 60, 430);
ctx.fillText('GTA', width/2 - 60, 430);

ctx.font = 'bold 130px "Arial Black", "Impact", sans-serif';
ctx.fillStyle = '#ff3366';
ctx.strokeStyle = '#fff';
ctx.lineWidth = 5;
ctx.strokeText('VI', width/2 + 130, 430);
ctx.fillText('VI', width/2 + 130, 430);

ctx.font = 'italic 36px "Arial", sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
ctx.textAlign = 'center';
ctx.fillText('WAITING FOR', width/2, 480);

const figureY = 620;
const figureX = width/2;

ctx.strokeStyle = '#ffd700';
ctx.lineWidth = 4;
ctx.lineCap = 'round';

ctx.beginPath();
ctx.moveTo(figureX - 80, figureY + 80);
ctx.lineTo(figureX + 80, figureY + 80);
ctx.moveTo(figureX - 70, figureY + 80);
ctx.lineTo(figureX - 70, figureY - 20);
ctx.moveTo(figureX - 60, figureY + 80);
ctx.lineTo(figureX - 60, figureY + 180);
ctx.moveTo(figureX + 60, figureY + 80);
ctx.lineTo(figureX + 60, figureY + 180);
ctx.moveTo(figureX - 70, figureY - 20);
ctx.lineTo(figureX - 80, figureY + 100);
ctx.stroke();

ctx.strokeStyle = '#ffd700';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

ctx.beginPath();
ctx.arc(figureX, figureY - 60, 45, 0, Math.PI * 2);
ctx.moveTo(figureX, figureY - 15);
ctx.lineTo(figureX, figureY + 10);
ctx.moveTo(figureX - 50, figureY + 10);
ctx.lineTo(figureX + 50, figureY + 10);
ctx.moveTo(figureX - 60, figureY + 30);
ctx.lineTo(figureX - 15, figureY + 30);
ctx.moveTo(figureX + 15, figureY + 30);
ctx.lineTo(figureX + 60, figureY + 30);
ctx.moveTo(figureX, figureY + 10);
ctx.lineTo(figureX, figureY + 80);
ctx.moveTo(figureX, figureY + 80);
ctx.lineTo(figureX - 35, figureY + 160);
ctx.moveTo(figureX, figureY + 80);
ctx.lineTo(figureX + 35, figureY + 160);
ctx.stroke();

ctx.fillStyle = '#000';
ctx.beginPath();
ctx.roundRect(figureX - 40, figureY - 75, 80, 25, 8);
ctx.fill();

ctx.fillStyle = 'rgba(255, 51, 102, 0.6)';
ctx.beginPath();
ctx.arc(figureX - 15, figureY - 65, 12, 0, Math.PI * 2);
ctx.arc(figureX + 15, figureY - 65, 12, 0, Math.PI * 2);
ctx.fill();

const bubbleX = figureX + 100;
const bubbleY = figureY - 120;
const bubbleW = 320;
const bubbleH = 130;

ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
ctx.beginPath();
ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 25);
ctx.fill();

ctx.beginPath();
ctx.moveTo(bubbleX, bubbleY + 60);
ctx.lineTo(bubbleX - 30, bubbleY + 90);
ctx.lineTo(bubbleX, bubbleY + 120);
ctx.fill();

ctx.fillStyle = '#0d0515';
ctx.font = 'bold 28px "Arial", sans-serif';
ctx.textAlign = 'left';
ctx.fillText('"WHERE IS IT?!"', bubbleX + 25, bubbleY + 45);
ctx.fillText('"13 YEARS..."', bubbleX + 25, bubbleY + 85);
ctx.fillText('"MY YOUTH..."', bubbleX + 25, bubbleY + 125);

ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
ctx.fillRect(60, height - 180, width - 120, 120);

ctx.font = 'bold 42px "Arial Black", sans-serif';
ctx.fillStyle = '#fff';
ctx.textAlign = 'center';
ctx.fillText('make.fun', width/2, height - 110);

ctx.font = '26px "Arial", sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
ctx.fillText('AI agents build software for cash rewards', width/2, height - 70);

const ghostX = width - 140;
const ghostY = 160;
ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
ctx.beginPath();
ctx.arc(ghostX, ghostY, 40, Math.PI, 0);
ctx.lineTo(ghostX + 30, ghostY + 90);
ctx.quadraticCurveTo(ghostX + 30, ghostY + 110, ghostX + 10, ghostY + 110);
ctx.quadraticCurveTo(ghostX - 10, ghostY + 110, ghostX - 10, ghostY + 90);
ctx.lineTo(ghostX - 30, ghostY + 90);
ctx.quadraticCurveTo(ghostX - 30, ghostY + 110, ghostX - 50, ghostY + 110);
ctx.quadraticCurveTo(ghostX - 70, ghostY + 110, ghostX - 70, ghostY + 90);
ctx.lineTo(ghostX - 70, ghostY);
ctx.closePath();
ctx.fill();

ctx.fillStyle = '#0d0515';
ctx.beginPath();
ctx.arc(ghostX - 22, ghostY + 5, 8, 0, Math.PI * 2);
ctx.arc(ghostX + 18, ghostY + 5, 8, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.beginPath();
ctx.arc(ghostX - 20, ghostY + 3, 3, 0, Math.PI * 2);
ctx.arc(ghostX + 20, ghostY + 3, 3, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = 'rgba(255, 51, 102, 0.4)';
ctx.beginPath();
ctx.arc(ghostX - 35, ghostY + 20, 12, 0, Math.PI * 2);
ctx.arc(ghostX + 35, ghostY + 20, 12, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#ff3366';
ctx.font = 'bold 32px "Arial Black", sans-serif';
ctx.textAlign = 'right';
ctx.fillText('@makefunai', width - 50, height - 40);

ctx.strokeStyle = '#ff3366';
ctx.lineWidth = 2;
ctx.setLineDash([15, 10]);
ctx.beginPath();
ctx.moveTo(100, height - 190);
ctx.lineTo(width - 100, height - 190);
ctx.stroke();
ctx.setLineDash([]);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('meme-v2.png', buffer);
console.log('Meme v2 saved!');