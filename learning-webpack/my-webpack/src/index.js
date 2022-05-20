import './assets/style.css';

const element = document.createElement('div');
element.innerHTML = "Hello webpack";
const body = document.querySelector('body');
const img = document.createElement('img');
img.className = 'qr';
body.appendChild(img);
body.appendChild(element);