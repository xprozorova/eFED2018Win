
var slideIndex = 1;

function currentSlide(n){
    showSlides(slideIndex = n);
    document.getElementsByClassName("panel active").style.background = "#ffffff"; 
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
        buttons[i].className = buttons[i].className.replace("active", "");     
    }
    slides[slideIndex-1].style.display = "block";
    buttons[slideIndex-1].className+="active";   
}
