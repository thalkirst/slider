'use strict';

import urls from './imagedata.js'

const container = document.querySelector('.slidercontainer');
let slide_index;

function addImages() {
    let captions = [];
    let links = [];
    const buttons = document.querySelector('.buttons');
    for (const [key, value] of Object.entries(urls)) {
        captions.push(key);
        links.push(value);
    }
    for (let i = 0; i < links.length; i++) {
        //add images and captions//
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
    const slides = document.querySelectorAll('.showSlide')
    const counter = document.querySelector('.slidercounter')
    counter.textContent = `${slide_index} / ${slides.length}`;
};

function jumptoSlide(ev) {
    slide_index = ev.target.id;
    slide_index++
    displaySlides(slide_index);
}

function displaySlides(n) {
    const slides = document.querySelectorAll('.showSlide');
    const buttons = document.querySelectorAll('.circle');
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

function startSlideShow(delay = 3000, height = 500) {
    const slider = document.querySelector('.slider');
    slider.style.height = `${height}px`;
    displaySlides(slide_index);
    setInterval(() => {
        slide_index++;
        displaySlides(slide_index);
    }, delay);
}

addImages();
addElements();

//parameters: 1. delay between changing the pictures in ms (default=3000) 2. height of the slider in pixel (default:500 px) //
startSlideShow(3000, 500);