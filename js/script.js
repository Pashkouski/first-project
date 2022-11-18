document.addEventListener("DOMContentLoaded", () => {

    //Tabs

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

    // Timer
    const deadline = "2022-12-05";

    function getTineRemaining(endTime) {
        const t = Date.parse(endTime) - new Date(),
              days = Math.floor( t / 1000 / 60 / 60 / 24),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              second = Math.floor((t / 1000) % 60);
        return {
              "total": t,
              "days": days,
              "hours": hours,
              "minutes": minutes,
              "second": second
        };
    }

    function getZerro(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else
            return num;
    }

    function setCloak(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            second = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateCloak, 1000);

        updateCloak();

        function updateCloak() {
            let t = getTineRemaining(endTime);
            days.innerHTML = getZerro(t.days);
            hours.innerHTML = getZerro(t.hours);
            minutes.innerHTML = getZerro(t.minutes);
            second.innerHTML = getZerro(t.second);

            if(t.total <= 0) {
                clearInterval(timeInterval);
             }
        }
    }

    setCloak(".timer", deadline);


    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach( btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
       if(e.target === modal) {
           closeModal();
       }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

});