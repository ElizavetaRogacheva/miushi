var next = document.querySelector('.slider__arrow--next');
var prev = document.querySelector('.slider__arrow--prev');



$('.slider__list').slick(
    {   autoplay: true,
        prevArrow: prev,
        nextArrow: next,
        dots: true,
    }  
    
    
);