class CalendarDay {
    constructor(id, fecha) {
        this.selectedDay = fecha;
        this.dia = null;
        this.avaibleDays = [moment('2022-03-18'), moment('2022-03-24'), moment('2022-04-05'), moment('2022-04-15'), moment('2022-05-15')];
        this.elCalendarDay = document.getElementById(id);
        this.showTemplate();
        this.elDayName = this.elCalendarDay.querySelector('.day-name');
    }

    showTemplate() {
        this.elCalendarDay.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
        let template = `
        <div class="calendar-day__header calendar-day__header--margin0">
            <button type="button" class="control-day  control--prev-day">&lt;</button>
            <span class="day-name">${this.selectedDay.format('dddd DD [de] MMMM')}</span>
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
            })
        });
    }

    changeDay(next = true) {

        //obtener el indice del arreglo segun la fecha seleccionada
        //let indexArray = this.avaibleDays.findIndex(a => a.date === this.selectedDay.date);
        console.log('this.selectedDay : ', this.selectedDay)
        let indexArray = this.avaibleDays.findIndex(a => a.isSame(this.selectedDay));
        //let indexArray = this.avaibleDays.indexOf(this.selectedDay);
        console.log('indexArray ', indexArray);
        let indexArrayNuevo;
        console.log(next);
        if (next) {
            indexArrayNuevo = indexArray + 1;

        } else {
            indexArrayNuevo = indexArray - 1;
        }
        console.log('indexArrayNuevo: ', indexArrayNuevo);
        let maxIndexArray = (this.avaibleDays.length - 1);
        //para no seguir retrocedeiendo de la fecha actual disponible en el calendario
        //me falta validar que enter a esta condicion solo cuando el indice nuevo
        //se encuentre en el arreglo de dias disponible
        if (indexArrayNuevo >= 0 && indexArrayNuevo <= maxIndexArray) {

            this.elDayName.innerHTML = this.avaibleDays[(indexArrayNuevo)].format('dddd DD [de] MMMM');
            let monthCurrencyArray = parseInt(this.avaibleDays[(indexArrayNuevo)].format('MM').trim());
            console.log(monthCurrencyArray);
            let monthCurrencyCalendar = parseInt(document.getElementById('month-number').value);

            console.log(monthCurrencyCalendar);
            let name_class;
            //pregunto por la diferencias de meses del arrgelo de dias disponibles vs el calendario prindicapl
            if (monthCurrencyArray != monthCurrencyCalendar) {
                console.log('distintos');
                if (monthCurrencyArray > monthCurrencyCalendar) {
                    name_class = '.control--next';
                } else {
                    name_class = '.control--prev';
                }

                let elControl = document.querySelector(name_class);
                elControl.dispatchEvent(new Event('click'));
            }

            //aca mevoy a los dias del mes disponibles y comparo con el del dia del calendario actual selelecionado
            let avaibleDaysCalendar = document.querySelectorAll('.grid__cell--available-day');
            console.log('avaibleDaysCalendar ', avaibleDaysCalendar);
            avaibleDaysCalendar.forEach(elCell => {
                console.log(this.avaibleDays[(indexArrayNuevo)].format('DD').trim());
                console.log(elCell.innerHTML.trim());
                if (parseInt(this.avaibleDays[(indexArrayNuevo)].format('DD').trim()) === parseInt(elCell.innerHTML.trim())) {
                    console.log('elCell :', elCell);
                    //aca disparo el evento click en el dia del calendario
                    elCell.dispatchEvent(new Event('click'));
                }
            });
        }
    }



    generateDays(dayToShow = moment()) {
        if (!moment.isMoment(dayToShow)) {
            return null;
        }


        //Llenar arreglo con dias a mostrar en el mes actual del calendario
        let format = moment().format('YYYY-MM-DD');
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month(),
                isBefore: dateStart.isBefore(format)
            });
            dateStart.add(1, 'days');
        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }

    getElement() {
        return this.elCalendarDay;
    }

    value() {
        return this.dia;
    }
}