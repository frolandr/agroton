const anchors = document.querySelectorAll('a.menu__link');
const animationTime = 300;
const framesCount = 20;

for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
        e.preventDefault();
        let coordY = document.querySelector(anchors[i].getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
        let scroller = setInterval(function() {
            let scrollBy = coordY / framesCount;
            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                window.scrollBy(0, scrollBy);
            }
            else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
        }, animationTime / framesCount);
    });
};

const anchorsFooter = document.querySelectorAll('.footer__navigation a.footer__link');
const animationTimeFooter = 300;
const framesCountFooter = 20;

for (let i = 0; i < anchorsFooter.length; i++) {
    anchorsFooter[i].addEventListener('click', function(e) {
        e.preventDefault();
        let coordY = document.querySelector(anchorsFooter[i].getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
        let tms = coordY / framesCountFooter + 300;
        scrollToSmoothly(coordY, tms);
    });
};

function scrollToSmoothly(pos, time) {
    let currentPos = window.pageYOffset;
    let start = null;
    if (time == null)
        time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        let progress = currentTime - start;
        if (currentPos < pos)
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        else
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        if (progress < time)
            window.requestAnimationFrame(step);
        else
            window.scrollTo(0, pos);
    });
}