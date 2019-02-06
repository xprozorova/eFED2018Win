var slideIndex = 0;
var slides = document.getElementsByClassName("days-weather-cell");
var buttons = document.getElementsByClassName("one-weekday");
function currentSlide(currentSlideIndex){
    showSlides(slideIndex=currentSlideIndex);
}

function showSlides(){
    if (slideIndex === slides.length){
        slideIndex = 0;
    }
    else if (slideIndex === -1){
        slideIndex=slides.length - 1;
    }
    for (let i=0; i < slides.length; i++) {
        if (slides[i].classList.contains("days-weather-cell-active")){
            slides[i].classList.remove("days-weather-cell-active");
        }
    }
    for (let j=0; j<buttons.length;j++){
        if(buttons[j].classList.contains("one-weekday-active")){
            buttons[j].classList.remove("one-weekday-active");
        }
    }
    slides[slideIndex].classList.add("days-weather-cell-active");
    buttons[slideIndex].classList.add("one-weekday-active");
}

document.getElementById("prev").addEventListener('click', function () { showSlides(slideIndex--); });
document.getElementById("next").addEventListener('click', function () { showSlides(slideIndex++); });
