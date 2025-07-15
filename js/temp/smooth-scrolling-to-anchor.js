/*===========================================================================*/
// Плавная прокрутка при клике на пункте (верхнего) меню к якорю             */
/*---------------------------------------------------------------------------*/
// coordY - для координаты ссылки по Y от верха
// getBoundingClientRect().top - возвращает координату по оси Y, то есть верхнюю позицию элемента
// getAttribute('href') - возвращает значение атрибута href у элемента
// window.pageYOffset - количество пикселей, на которые документ прокручен по вертикали
//
// scroller - имя Интервала
// setInterval() - запускаем Interval
// scrollBy - сколько скроллить за 1 такт (координата ссылки по Y от верха деленная на количество кадров)
// window.pageYOffset - количество пикселей, на которые документ прокручен по вертикали
// window.innerHeight - внутренняя высота окна браузера в пикселях
// offsetHeight - внешняя высота элемента с учётом вертикальных полей и границ в пикселях
// scrollBy(0, scrollBy) - скролл пикселей соответствующих 1 такту
// scrollTo(0, coordY) - добирается до нужного эелемента
// clearInterval(scroller) - остонавливаем Interval
/*===========================================================================*/
const anchors = document.querySelectorAll('a.menu__link');                     //получаем все ссылки в меню
const animationTime = 300;                                                     //время анимации
const framesCount = 20;                                                        //количество кадров

for (let i = 0; i < anchors.length; i++) {                                     //создаем цикл для перебора
    anchors[i].addEventListener('click', function(e) {                         //вешаем обработчик события
        e.preventDefault();                                                    //убираем стандартное поведение

        let coordY = document.querySelector(anchors[i].getAttribute('href')).getBoundingClientRect().top + window.pageYOffset; //для каждой ссылки берем соответствующий ему элемент и определяем его координату Y

        let scroller = setInterval(function() {                                //запускаем интервал
            let scrollBy = coordY / framesCount;                               //сколько скроллить за 1 такт
      
            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) { //если к-во пикселей для скролла за 1 такт больше расстояния до элемента и дно страницы не достигнуто
                window.scrollBy(0, scrollBy);                                  //то скроллим на к-во пикселей, которое соответствует одному такту
            }
            else {
                window.scrollTo(0, coordY);                                    //иначе добираемся до элемента
                clearInterval(scroller);                                       //отменяем, выходим из интервала
            }
        }, animationTime / framesCount);                                       // время интервала равняется частному от времени анимации и к-ва кадров
    });
};
/*---------------------------------------------------------------------------*/



/*===========================================================================*/
// Плавная прокрутка при клике на пункте (нижнего) меню к якорю             */
/*===========================================================================*/
const anchorsFooter = document.querySelectorAll('.footer__navigation a.footer__link');//получаем все нужные ссылки в футере
const animationTimeFooter = 300;                                               //время анимации
const framesCountFooter = 20;                                                  //количество кадров

for (let i = 0; i < anchorsFooter.length; i++) {                               //создаем цикл для перебора
    anchorsFooter[i].addEventListener('click', function(e) {                   //вешаем обработчик события
        e.preventDefault();                                                    //убираем стандартное поведение

        let coordY = document.querySelector(anchorsFooter[i].getAttribute('href')).getBoundingClientRect().top + window.pageYOffset; //для каждой ссылки берем соответствующий ему элемент и определяем его координату Y


        //скорость чем дальше, тем быстрее
        //чем меньше, чем медленнее
        // let tms = 100/20; 5 быстрее
        // let tms = 1000/20; 50 тище

        let tms = coordY / framesCountFooter + 300;        //

        scrollToSmoothly(coordY, tms);
    });
};
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
// @param pos: положение по оси y для прокрутки (в пикселях)
// @param time: точное время, которое займет прокрутка (в миллисекундах)
/*---------------------------------------------------------------------------*/
function scrollToSmoothly(pos, time) {
    let currentPos = window.pageYOffset;                                       //количество пикселей, на которое прокручена страница по вертикали, Y координата ссылки
    let start = null;                                                          //обнуляем начальную позицию
    
    if (time == null)                                                          //если вдруг время прокрутки не указано, то
        time = 500;                                                            //устанавливаем время прокрутки в 500 (0.5сек)

    pos = +pos,                                                                //
    time = +time;                                                              //

    window.requestAnimationFrame(function step(currentTime) {                  //функция
        start = !start ? currentTime : start;                                  //
        let progress = currentTime - start;                                    //

        if (currentPos < pos)                                                  //если не достигли цели, которая в переменной pos, то
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos); //прокручиваем до определенных координат X = 0, Y = ((pos - currentPos) * progress / time) + currentPos
        else                                                                   //иначе
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));//

        if (progress < time)                                                   //если меньше, то
            window.requestAnimationFrame(step);                                //снова вызываем функцию step для запуска анимации в браузере
        else                                                                   //иначе
            window.scrollTo(0, pos);                                           //прокручиваем до определенных координат X = 0, Y = pos
    });
}
/*===========================================================================*/