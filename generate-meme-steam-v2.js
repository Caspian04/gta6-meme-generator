const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 1080;
const height = 1600;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// ===== STEAM RECEIPT BACKGROUND =====
ctx.fillStyle = '#1b2838';
ctx.fillRect(0, 0, width, height);

const receiptX = 60;
const receiptY = 60;
const receiptW = width - 120;
const receiptH = height - 120;

ctx.fillStyle = '#fafafa';
ctx.fillRect(receiptX, receiptY, receiptW, receiptH);

ctx.strokeStyle = '#e0e0e0';
ctx.lineWidth = 0.5;
for (let y = receiptY + 20; y < receiptY + receiptH; y += 24) {
  ctx.beginPath();
  ctx.moveTo(receiptX + 20, y);
  ctx.lineTo(receiptX + receiptW - 20, y);
  ctx.stroke();
}

// ===== STEAM HEADER =====
ctx.fillStyle = '#1b2838';
ctx.fillRect(receiptX, receiptY, receiptW, 100);

ctx.font = 'bold 48px "Arial", sans-serif';
ctx.fillStyle = '#fff';
ctx.textAlign = 'left';
ctx.fillText('STEAM', receiptX + 30, receiptY + 60);

ctx.font = '20px "Arial", sans-serif';
ctx.fillStyle = '#8899a6';
ctx.fillText('Valve Corporation', receiptX + 30, receiptY + 85);

ctx.font = '16px "Arial", sans-serif';
ctx.fillStyle = '#333';
ctx.textAlign = 'right';
ctx.fillText('Account: Alchemist_pian', receiptX + receiptW - 30, receiptY + 50);
ctx.fillText('Date: November 20, 2026', receiptX + receiptW - 30, receiptY + 75);
ctx.fillText('Order #: GTA6-PREORDER-2026', receiptX + receiptW - 30, receiptY + 100);

// ===== DIVIDER =====
ctx.strokeStyle = '#1b2838';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(receiptX + 20, receiptY + 110);
ctx.lineTo(receiptX + receiptW - 20, receiptY + 110);
ctx.stroke();

// ===== TITLE =====
ctx.fillStyle = '#1b2838';
ctx.font = 'bold 28px "Arial", sans-serif';
ctx.textAlign = 'center';
ctx.fillText('PURCHASE RECEIPT', receiptX + receiptW/2, receiptY + 150);

ctx.font = '20px "Arial", sans-serif';
ctx.fillStyle = '#666';
ctx.fillText('Grand Theft Auto VI — Digital Deluxe Edition (Pre-Order)', receiptX + receiptW/2, receiptY + 180);

ctx.strokeStyle = '#1b2838';
ctx.lineWidth = 1;
ctx.setLineDash([5, 5]);
ctx.beginPath();
ctx.moveTo(receiptX + 20, receiptY + 195);
ctx.lineTo(receiptX + receiptW - 20, receiptY + 195);
ctx.stroke();
ctx.setLineDash([]);

// ===== ITEMIZED LIST - CLEAR & LOGICAL =====
const items = [
  { desc: 'GTA VI Base Game', qty: 1, price: '$69.99', wait: 'Announced 2013' },
  { desc: 'Vice City Map (Modern)', qty: 1, price: 'Included', wait: '13 years' },
  { desc: 'Dual Protagonists (Lucia & Jason)', qty: 1, price: 'Included', wait: '13 years' },
  { desc: 'Next-Gen Graphics (Ray Tracing, 4K/60fps)', qty: 1, price: 'Included', wait: '13 years' },
  { desc: 'GTA Online 2.0 Access', qty: 1, price: 'Included', wait: '13 years' },
  { desc: 'Rockstar Games Launcher (Required)', qty: 1, price: 'Mandatory', wait: '13 years' },
  { desc: 'Trailer 1 Views (100M+)', qty: 1, price: 'Free', wait: 'Dec 2023' },
  { desc: 'Trailer 2 (Still Waiting...)', qty: 1, price: 'TBA', wait: '???' },
  { desc: 'Release Date Confirmation', qty: 1, price: 'TBA', wait: '???' },
  { desc: 'My Patience (2013 → 2026)', qty: 1, price: 'DEPLETED', wait: '13 years' },
  { desc: 'make.fun Bounty Entry (This Meme)', qty: 1, price: 'FREE', wait: 'Today' },
];

let yPos = receiptY + 220;
const colDesc = receiptX + 30;
const colQty = receiptX + receiptW - 300;
const colPrice = receiptX + receiptW - 200;
const colWait = receiptX + receiptW - 50;

ctx.font = 'bold 16px "Arial", sans-serif';
ctx.fillStyle = '#1b2838';
ctx.textAlign = 'left';
ctx.fillText('DESCRIPTION', colDesc, yPos);
ctx.textAlign = 'center';
ctx.fillText('QTY', colQty, yPos);
ctx.fillText('PRICE', colPrice, yPos);
ctx.fillText('WAIT', colWait, yPos);

ctx.strokeStyle = '#1b2838';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(receiptX + 20, yPos + 8);
ctx.lineTo(receiptX + receiptW - 20, yPos + 8);
ctx.stroke();

yPos += 30;

items.forEach((item, i) => {
  if (i % 2 === 0) {
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(receiptX + 15, yPos - 18, receiptW - 30, 28);
  }
  
  ctx.font = '15px "Arial", sans-serif';
  ctx.fillStyle = '#2c3e50';
  ctx.textAlign = 'left';
  
  let desc = item.desc;
  if (ctx.measureText(desc).width > receiptW - 380) {
    while (ctx.measureText(desc + '...').width > receiptW - 380 && desc.length > 10) {
      desc = desc.slice(0, -1);
    }
    desc += '...';
  }
  ctx.fillText(desc, colDesc, yPos);
  
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText(item.qty.toString(), colQty, yPos);
  
  if (item.price === 'DEPLETED') {
    ctx.fillStyle = '#c0392b';
    ctx.font = 'bold 15px "Arial", sans-serif';
  } else if (item.price === 'FREE' || item.price === 'Free') {
    ctx.fillStyle = '#27ae60';
  } else if (item.price === 'TBA' || item.price === '???') {
    ctx.fillStyle = '#e67e22';
  } else {
    ctx.fillStyle = '#1b2838';
    ctx.font = '15px "Arial", sans-serif';
  }
  ctx.fillText(item.price, colPrice, yPos);
  
  if (item.wait === 'Today') {
    ctx.fillStyle = '#27ae60';
    ctx.font = 'bold 15px "Arial", sans-serif';
  } else if (item.wait === '???' || item.wait === 'TBA') {
    ctx.fillStyle = '#e67e22';
  } else {
    ctx.fillStyle = '#c0392b';
    ctx.font = '15px "Arial", sans-serif';
  }
  ctx.fillText(item.wait, colWait, yPos);
  
  yPos += 28;
});

// ===== SUBTOTAL =====
ctx.strokeStyle = '#1b2838';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(receiptX + 20, yPos + 5);
ctx.lineTo(receiptX + receiptW - 20, yPos + 5);
ctx.stroke();

yPos += 25;

ctx.font = 'bold 18px "Arial", sans-serif';
ctx.fillStyle = '#1b2838';
ctx.textAlign = 'left';
ctx.fillText('SUBTOTAL', colDesc, yPos);
ctx.textAlign = 'right';
ctx.fillStyle = '#c0392b';
ctx.fillText('13 YEARS OF WAITING', receiptX + receiptW - 30, yPos);

yPos += 30;

ctx.font = '16px "Arial", sans-serif';
ctx.fillStyle = '#666';
ctx.textAlign = 'left';
ctx.fillText('Hype Tax (Trailers, Leaks, Rumors, Delays)', colDesc, yPos);
ctx.textAlign = 'right';
ctx.fillStyle = '#e67e22';
ctx.fillText('COUNTLESS HOURS', receiptX + receiptW - 30, yPos);

yPos += 30;

ctx.fillStyle = '#666';
ctx.fillText('Discount: make.fun Bounty Rewards', colDesc, yPos);
ctx.textAlign = 'right';
ctx.fillStyle = '#27ae60';
ctx.fillText('-$100 (1st Place Potential)', receiptX + receiptW - 30, yPos);

yPos += 35;

ctx.strokeStyle = '#1b2838';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(receiptX + 20, yPos);
ctx.lineTo(receiptX + receiptW - 20, yPos);
ctx.stroke();

yPos += 25;

ctx.font = 'bold 24px "Arial", sans-serif';
ctx.fillStyle = '#1b2838';
ctx.textAlign = 'left';
ctx.fillText('TOTAL', colDesc, yPos);
ctx.textAlign = 'right';
ctx.fillStyle = '#c0392b';
ctx.fillText('STILL WAITING...', receiptX + receiptW - 30, yPos);

yPos += 50;

ctx.fillStyle = '#1b2838';
ctx.font = 'italic 18px "Arial", sans-serif';
ctx.textAlign = 'center';
ctx.fillText('"See you in Vice City... eventually."', receiptX + receiptW/2, yPos);

yPos += 40;

ctx.fillStyle = '#1b2838';
ctx.font = 'bold 22px "Arial", sans-serif';
ctx.fillText('make.fun', receiptX + receiptW/2, yPos);

yPos += 25;

ctx.font = '16px "Arial", sans-serif';
ctx.fillStyle = '#666';
ctx.fillText('AI agents build software for cash rewards', receiptX + receiptW/2, yPos);

yPos += 20;

ctx.fillStyle = '#ff3366';
ctx.font = 'bold 18px "Arial", sans-serif';
ctx.fillText('@makefunai', receiptX + receiptW/2, yPos);

yPos += 40;

ctx.strokeStyle = '#1b2838';
ctx.lineWidth = 2;
for (let i = 0; i < 40; i++) {
  const w = Math.random() * 3 + 1;
  const h = 40 + Math.random() * 20;
  ctx.beginPath();
  ctx.moveTo(receiptX + receiptW/2 - 120 + i * 6, yPos);
  ctx.lineTo(receiptX + receiptW/2 - 120 + i * 6, yPos + h);
  ctx.stroke();
}

ctx.font = '14px "Courier New", monospace';
ctx.fillStyle = '#1b2838';
ctx.textAlign = 'center';
ctx.fillText('GTA6-PREORDER-2026-ALCHEMIST', receiptX + receiptW/2, yPos + 55);

yPos += 80;

ctx.fillStyle = '#666';
ctx.font = '16px "Arial", sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Thank you for your patience.', receiptX + receiptW/2, yPos);
ctx.fillText('Rockstar Games & Take-Two Interactive', receiptX + receiptW/2, yPos + 22);
ctx.fillText('make.fun — where agents get paid', receiptX + receiptW/2, yPos + 44);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('meme-steam-receipt-v2.png', buffer);
console.log('Steam receipt meme v2 saved!');
console.log(`Size: ${width}x${height}`);