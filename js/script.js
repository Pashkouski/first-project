document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tabheader__item'), // пункт меню
        tabsContent = document.querySelectorAll('.tabcontent'), //фото на странице
        tabsParent = document.querySelector('.tabheader__items'); //полное меню

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
        tabs[i].classList.add("tabheader__item_active");
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (item,i) => {
                if(target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });
});