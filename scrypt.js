const buttons = document.querySelectorAll('.btn');
const enterWindow = document.querySelector('.amount');
const resultWindow = document.querySelector('.result');
const backspace = document.querySelector('.btn__back');
const clear = document.querySelector('.btn__clear');
const result = document.querySelector('.btn__big');

let numbOne = '';
let numbTwo = '';
let sign = '';
let sign2 = '';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operator = ['+', '-', 'x', '/', '%'];

buttons.forEach(btn => btn.addEventListener('click', onClick));
result.addEventListener('click', onResultClick);
backspace.addEventListener('click', backClick);
clear.addEventListener('click', clearAll);

function onClick(e) {
  const key = e.target.textContent;
  if (operator.includes(key) && enterWindow.value == '') {
    return;
  }
  if (numbers.includes(key) && numbOne !== '' && sign !== '') {
    enterWindow.value = enterWindow.value += e.target.textContent;
    numbTwo += e.target.textContent;
    return;
  }
  if (numbers.includes(key) && sign === '' && numbTwo === '') {
    enterWindow.value = enterWindow.value += e.target.textContent;
    numbOne += e.target.textContent;
    return;
  }
  if (
    operator.includes(key) &&
    sign !== '' &&
    numbTwo !== '' &&
    e.target.textContent === '%'
  ) {
    enterWindow.value = enterWindow.value += e.target.textContent;
    sign2 = e.target.textContent;
  }
  if (operator.includes(key) && sign === '' && numbTwo === '') {
    enterWindow.value = enterWindow.value += e.target.textContent;
    sign = e.target.textContent;
  }
}

function backClick() {
  let esc = enterWindow.value;
  enterWindow.value = esc.substring(0, esc.length - 1);
  if (numbTwo !== '') {
    const correct = numbTwo.substring(0, numbTwo.length - 1);
    numbTwo = correct;
  } else {
    const correct = numbOne.substring(0, numbOne.length - 1);
    numbOne = correct;
  }
}

function clearAll() {
  numbOne = '';
  numbTwo = '';
  sign = '';
  enterWindow.value = '';
  resultWindow.value = '';
}

function onResultClick() {
  if (sign2 === '%') {
    let per = (+numbOne * +numbTwo) / 100;
    numbTwo = per;
  }
  if (numbOne !== '' && numbTwo !== '' && sign !== '') {
    switch (sign) {
      case '+':
        resultWindow.value = +(+numbOne + +numbTwo).toFixed(9);
        break;
      case '-':
        resultWindow.value = +(+numbOne - +numbTwo).toFixed(9);
        break;
      case 'x':
        resultWindow.value = +(+numbOne * +numbTwo).toFixed(9);
        break;
      case '/':
        if (numbTwo == '0') {
          enterWindow.value = '';
          return;
        }
        resultWindow.value = +(+numbOne / +numbTwo).toFixed(9);

        break;
    }
    enterWindow.value = resultWindow.value;
    numbOne = enterWindow.value;
    numbTwo = '';
    sign = '';
    sign2 = '';
  }
}
