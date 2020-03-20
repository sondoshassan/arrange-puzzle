'use strict';
// global var
var imageName = ['num1', 'num2', 'num3', 'num4', 'num5', 'num6', 'num7', 'num8', 'num9'];
var EMPTY_CARD = 'empty-card';
var objArr = [];
var mainDiv = document.getElementById('container');
mainDiv.addEventListener('click', whenClick);
shuffle(imageName);

function CardPlay(image) {
  this.image = image;
  this.filePath = `img/${image}.png`;
  this.idCard = image.split('m')[1];
  objArr.push(this);
}

function hello(){
  var userName = prompt('what\'s your name?' );
  var h2 = document.getElementById('hi');
  h2.textContent = `hi ${userName}, arrange this cards by click on the number card`;
}

function render() {
  mainDiv.innerHTML = '';
  for (var i = 0; i < imageName.length; i++) {
    var card = new CardPlay(imageName[i]);
    creatImage(card);
  }
  var empty = new CardPlay(EMPTY_CARD);
  creatImage(empty).setAttribute('id','em');
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function creatImage(card) {
  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', card.filePath);
  imgElement.setAttribute('alt', card.image);
  imgElement.setAttribute('id', card.idCard);
  mainDiv.appendChild(imgElement);
  return imgElement;
}


function whenClick(event) {
  event.preventDefault();
  var action = event.target.id;
  var newElement = document.getElementById(action);
  var cloneElemnt = newElement.cloneNode(true);
  if (newElement.nextSibling && newElement.nextSibling.id === 'em') {
    var emptyElement = newElement.nextSibling;
    var cloneEmpty = emptyElement.cloneNode(true);

    newElement.parentElement.replaceChild(cloneEmpty,newElement);
    emptyElement.parentElement.replaceChild(cloneElemnt, emptyElement);

  }
  else if (newElement.previousSibling && newElement.previousSibling.id === 'em') {
    emptyElement = newElement.previousSibling;
    cloneEmpty = emptyElement.cloneNode(true);

    newElement.parentElement.replaceChild(cloneEmpty, newElement);
    emptyElement.parentElement.replaceChild(cloneElemnt, emptyElement);

  }
  else if (getForNextSibling(newElement) && getForNextSibling(newElement).id === 'em') {
    emptyElement = getForNextSibling(newElement);
    cloneEmpty = emptyElement.cloneNode(true);

    newElement.parentElement.replaceChild(cloneEmpty, newElement);
    emptyElement.parentElement.replaceChild(cloneElemnt, emptyElement);


  }
  else if (getForPreviousSibling(newElement) && getForPreviousSibling(newElement).id === 'em') {
    emptyElement = getForPreviousSibling(newElement);
    cloneEmpty = emptyElement.cloneNode(true);

    newElement.parentElement.replaceChild(cloneEmpty, newElement);
    emptyElement.parentElement.replaceChild(cloneElemnt, emptyElement);

  }
  setTimeout(checkArray, 1000);
}

function checkArray() {
  if (checkIfcorrect()) {
    alert('Congratulations!');
    shuffle(imageName);
    render();
  }
}

function checkIfcorrect(){
  var arrayImage=   document.getElementsByTagName('img');
  for(var i =0 ; i<arrayImage.length-1;i++){
    if(i+1!== Math.floor(arrayImage[i].id) ){
      return false;
    }
  }
  return true;
}

function getForNextSibling(element) {
  for (var i = 0; i < 4; i++) {
    if (!element.nextSibling) {
      return element.nextSibling;
    }
    element = element.nextSibling;
  }
  return element;
}
function getForPreviousSibling(element) {
  for (var i = 0; i < 4; i++) {
    if (!element.previousSibling) {
      return element.nextSibling;
    }
    element = element.previousSibling;
  }
  return element;
}


hello();
render();

