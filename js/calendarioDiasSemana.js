class CalendarDay {
    constructor(id) {
        // console.log('id: ', id)
        //this.cells = [];
        this.selectedDay = null;
        //this.selectedDatePrevAvaible = null;
        //this.avaibleDays = [moment('2022-03-04'), moment('2022-03-10'), moment('2022-03-18'), moment('2022-03-24')];
        this.currentDay = moment();
        //obtenemos el elemnento contenedor de nuestro calendario por dia 
        this.elCalendarDay = document.getElementById(id);
        this.showTemplate();
        this.elDayName = this.elCalendarDay.querySelector('.day-name');


        //this.elGridBody = this.elCalendar.querySelector('.grid__body');

        //this.showCells();

    }

    showTemplate() {
        this.elCalendarDay.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
        let template = `
        <div class="calendar-day__header calendar-day__header--margin0">
            <button type="button" class="control-day  control--prev-day">&lt;</button>
            <span class="day-name">${this.currentDay.format('dddd DD [de] MMMM')}</span>
            <button type="button" class="control-day  control--next-day">&gt;</button>
        </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendarDay.querySelectorAll('.control-day');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                //obtenemos el elemento donse se ha hecho el click
                let elTarget = e.target;
                let next = false;
                //validamos la clase que diferencia a los controles derecha e izquierda
                if (elTarget.classList.contains('control--next-day')) {
                    next = true;
                }
                this.changeDay(next);
                this.showHoursAvaible()
            })
        });
    }


    showHoursAvaible() {
        this.elDayName.innerHTML = this.currentDay.format('dddd DD [de] MMMM');
        // console.log('elDayName : ', this.elDayName);
        // console.log('calendario por dia');
    }
    changeDay(next = true) {
        if (next) {
            this.currentDay.add(1, 'day');
        } else {
            this.currentDay.subtract(1, 'day');
        }
    }

    getElement() {
        return this.elCalendarDay;
    }

    value() {
        return this.selectedDay;
    }
}