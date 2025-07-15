const burgerInput = document.querySelector(".burger__input");
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');

burgerInput.addEventListener('click', function () {
    if (burgerInput.checked === true)
        document.body.classList.add("overflow-hidden");
    else
        document.body.classList.remove("overflow-hidden");
});

menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        menuItems.forEach(item => {
            if (item.classList.contains('current'))
                item.classList.remove('current');
            if (item.firstChild === event.target) {
                item.classList.add('current');
                if (burgerInput.checked)
                    burgerInput.checked = false;
                if (document.body.classList.contains("overflow-hidden"))
                    document.body.classList.remove("overflow-hidden");
            }
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 575) {
        if (burgerInput.checked === true)
            burgerInput.checked = false;
        if (document.body.classList.contains("overflow-hidden"))
            document.body.classList.remove("overflow-hidden");
    }
});