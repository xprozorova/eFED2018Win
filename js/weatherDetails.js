var slideIndex = 0;

function currentSlide(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("slide");
    var buttons = document.getElementsByClassName("panel");
    
    if (n > slides.length){
        slideIndex = 1;
    }
    if (n < 1){
        slideIndex=slides.length
    }

    for (i=0; i<slides.length; i++){
        slides[i].style.display="none";
    }
    for (i=0; i<buttons.length; i++){
        buttons[i].className = buttons[i].className.replace("panel-active", "");     
    }
    slides[slideIndex-1].style.display = "block"; 
}

