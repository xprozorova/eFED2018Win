var slideIndex = 0;
var slides = document.getElementsByClassName("table-cell-2");

function showSlides(n){
    var i;

    if (n > slides.length){
        slideIndex = 1;
    }
    if (n < 1){
        slideIndex=slides.length
    }

    for (let i=0; i < slides.length; i++) {
        if (n === i) {
            slides[i].classList.add('active1');
            break;
        } else {
            slides[i].classList.remove('active1');
        }
    }
    // slides[slideIndex-1].style.display = "block";
}

document.addEventListener('click', () => {
    showSlides(slideIndex++);
});

// document.getElementById("next").addEventListener('click', function () { showSlides(slideIndex+=1); });
// document.getElementById("prev").addEventListener('click', function () { showSlides(slideIndex-=1); });
