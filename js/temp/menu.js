/*================================== МЕНЮ ===================================*/


/*---------------------------------------------------------------------------*/
// Получаем ссылки
/*---------------------------------------------------------------------------*/
const burgerInput = document.querySelector(".burger__input");                  //input бургер
const menu = document.querySelector('.menu');                                  //меню
const menuItems = document.querySelectorAll('.menu__item');                    //все элементы меню
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
// Клик по кнопке бургера (крестик)
// Если активно бургер меню, то запрещаем прокрутку,
// Если не активно бургер меню, то разрешаем прокрутку
/*---------------------------------------------------------------------------*/
burgerInput.addEventListener('click', function () {                            //вешаем обработчик на INPUT, слушаем click
    if (burgerInput.checked === true)                                          //если INPUT CHECKED, то 
        document.body.classList.add("overflow-hidden");                        //на BODY вешаем класс overflow-hidden
    else                                                                       //иначе
        document.body.classList.remove("overflow-hidden");                     //на BODY удаляем класс overflow-hidden
});
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
// По клику устанавливаем класс current
// При этом с ранее активного пункта меню снимаем класс current
/*---------------------------------------------------------------------------*/
menuItems.forEach(item => {                                                    //перебираем все пункты меню
    item.addEventListener('click', function(event) {                           //вешаем на них обработчики CLICK
        menuItems.forEach(item => {                                            //перебираем список и
            if (item.classList.contains('current'))                            //если это был активный пункт меню, то
                item.classList.remove('current');                              //удаляем класс активного пункта

            if (item.firstChild === event.target) {                            //получаем потомка и если по нему был клик, то
                item.classList.add('current');                                 //устанавливаем ему класс current

                if (burgerInput.checked)                                       //если на INPUT установлен CHECKED, то
                    burgerInput.checked = false;                               //сбрасывыаем его

                if (document.body.classList.contains("overflow-hidden"))       //если на BODY установлен класс overflow-hidden
                    document.body.classList.remove("overflow-hidden");         //удаляем его
            }
        });
    });
});
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
// Если ширина экрана больше 575 пикс, то 
// 1. снимаем с INPUT CHECKED
// 2. убираем с BODY класс overflow-hidden
/*---------------------------------------------------------------------------*/
window.addEventListener('resize', () => {                                      //обработчик изменение размера
    if (window.innerWidth > 575) {
        if (burgerInput.checked === true)                                      //если INPUT CHECKED, то
            burgerInput.checked = false;                                       //сбрасывыаем на input checked

        if (document.body.classList.contains("overflow-hidden"))               //если на BODY установлен класс overflow-hidden, то
            document.body.classList.remove("overflow-hidden");                 //удаляем его
    }
});
/*---------------------------------------------------------------------------*/