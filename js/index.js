
var slideIndex = 0;
var slides = document.getElementsByClassName("table-cell-2");
var buttons = document.getElementsByClassName("one-weekday");
function currentSlide(n){
    showSlides(slideIndex=n);
}

function showSlides(){
    if (slideIndex === slides.length){
        slideIndex = 0;
    }
    else if (slideIndex === -1){
        slideIndex=slides.length - 1;
    }

    for (let i=0; i < slides.length; i++) {
        if (slides[i].classList.contains('active1')){
            slides[i].classList.remove('active1');
        }
    }
    for (let j=0; j<buttons.length;j++){
        if(buttons[j].classList.contains('active')){
            buttons[j].classList.remove('active');
        }
    }
    slides[slideIndex].classList.add('active1');
    buttons[slideIndex].classList.add('active');
    
}




document.getElementById("prev").addEventListener('click', function () { showSlides(slideIndex--); });
document.getElementById("next").addEventListener('click', function () { showSlides(slideIndex++); });
//document.getElementById("day-one-weekday").addEventListener('click', function (){showSlides(slideIndex);})



