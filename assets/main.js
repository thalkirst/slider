'use strict';

import urls from './imagedata.js'

const container = document.querySelector('.slidercontainer');
let slide_index;

// adding all images with captions to DOM //

function addImages() {
    let captions = [];
    let links = [];
    const buttons = document.querySelector('.buttons');
    for (const [key, value] of Object.entries(urls)) {
        captions.push(key);
        links.push(value);
    }
    for (let i = 0; i < links.length; i++) {
        //add images//
        let imagediv = document.createElement('div');
        imagediv.classList.add('showSlide', 'fade');
        container.appendChild(imagediv);
        let content = document.createElement('div');
        content.classList.add('content');
        content.textContent = captions[i];
        imagediv.appendChild(content);
        let img = document.createElement('img');
        img.src = links[i];
        imagediv.appendChild(img);
        //add radio buttons for each image//
        let radio_button = document.createElement('span');
        radio_button.classList.add('circle');
        radio_button.id = `${i}`;
        buttons.appendChild(radio_button);
        buttons.addEventListener('click', jumptoSlide);
    }
};

function addElements() {
    slide_index = 1;
    //left arrow//
    let arrowleft = document.createElement('a');
    arrowleft.classList.add('left');
    arrowleft.textContent = '❮';
    container.appendChild(arrowleft);
    arrowleft.addEventListener('click', () => {
        slide_index--;
        displaySlides(slide_index);
    });
    //right arrow//
    let arrowright = document.createElement('a');
    arrowright.classList.add('right');
    arrowright.textContent = '❯';
    container.appendChild(arrowright);
    arrowright.addEventListener('click', () => {
        slide_index++;
        displaySlides(slide_index);
    });
};

function updateCounter() {
    let slides = document.querySelectorAll('.showSlide')
    let counter = document.querySelector('.slidercounter')
    counter.textContent = `${slide_index} / ${slides.length}`;
};

function jumptoSlide(ev) {
    slide_index = ev.target.id;
    slide_index++
    displaySlides(slide_index);
}

function displaySlides(n) {
    let slides = document.querySelectorAll('.showSlide');
    let buttons = document.querySelectorAll('.circle');
    if (n > slides.length) { slide_index = 1 }
    if (n < 1) { slide_index = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        buttons[i].classList.remove('active');
    }
    slides[slide_index - 1].style.display = 'block';
    buttons[slide_index - 1].classList.add('active');
    updateCounter();
}

addImages();
addElements();
displaySlides(slide_index);


