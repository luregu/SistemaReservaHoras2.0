class Calendar {
    constructor(id) {

        this.cells = [];
        this.selectedDate = null;
        this.selectedDatePrevAvaible = null;
        this.avaibleDays = [moment('2022-03-04'), moment('2022-03-10'), moment('2022-03-18'), moment('2022-03-24')];
        this.currentMonth = moment();
        //obtenemos el elemnento contenedor de nuestro calendario
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();

    }

    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
        let template = `
        <div class="calendar__header">
            <button type="button" class="control  control--prev">&lt;</button>
            <span class="month-name"></span>
            <button type="button" class="control  control--next">&gt;</button>
        </div>
        <div class="calendar__body">
            <div class="grid">
                <div class="grid__header">
                    <span class="grid__cell grid__cell--gh">L</span>
                    <span class="grid__cell grid__cell--gh">M</span>
                    <span class="grid__cell grid__cell--gh">M</span>
                    <span class="grid__cell grid__cell--gh">J</span>
                    <span class="grid__cell grid__cell--gh">V</span>
                    <span class="grid__cell grid__cell--gh">S</span>
                    <span class="grid__cell grid__cell--gh">D</span>
                </div>
                <div class="grid__body">
                </div>
            </div>
        </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                //obtenemos el elemento donse se ha hecho el click
                let elTarget = e.target;
                let next = false;
                //validamos la clase que diferencia a los controles derecha e izquierda
                if (elTarget.classList.contains('control--next')) {
                    next = true;
                }
                this.changeMonth(next);
                this.showCells();
            })
        });
    }

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'month');
        } else {
            this.currentMonth.subtract(1, 'month');
        }
    }

    showCells() {
        //se llama a metodo que carga el arreglo con las celdas del mes aactual
        this.cells = this.generateDates(this.currentMonth);

        if (this.cells === null) {

            return;
        }
        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        let selectedClass = '';
        let availableDayClass = '';


        //se recorren las celdas para agregar la clase que corresponda
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            availableDayClass = '';
            //si no es el dia del mes en curso se aplica clase que deshabilita la seleccion en el calnedario
            if (!this.cells[i].isInCurrentMonth || this.cells[i].isBefore) {
                disabledClass = 'grid__cell--disabled';
            }
            //Se busca en el arreglo de dias dsiponibles de horas medicas y se aplica clase de dia disponible
            if (this.avaibleDays.find(e => moment(this.cells[i].date).isSame(e))) {
                if (this.cells[i].isInCurrentMonth) {
                    availableDayClass = 'grid__cell--available-day'
                }
            }

            //cuando rescatamos la celda activa o seleccionada debemos agregar un atributo personalizado (data-cell-id)
            templateCells += `
            <span class="grid__cell grid__cell--gd ${disabledClass} ${availableDayClass}" 
            data-cell-id="${i}">
            ${this.cells[i].date.date()}
            </span>
        `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;

        this.addEventListenerToCells();
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }

        // primera fecha que se muestra en el calendario 
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        //arreglo con las fechas que mostraremos en el mes seleccionado
        let cells = [];

        //Encontrar primera fecha correcta del mes a mostrar en el calendario (Aunque sea del mes anterior)
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, 'days');
        }

        //Encontrar ultima fecha del mes a mostrar en el calendario (Aunque sea del mes posterior)
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
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

    addEventListenerToCells() {
        //obtenemos las celdas del calendario
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        //recorremos las celdas y agregamos el evento click en cada celda
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                // obtenemos la celda que ha generado el evento click realizado por el usuario
                let elTarget = e.target;
                //se valida que no sea un elemento desabilitado y ademas que no sea el mismo elementp que ya fue seleccionado
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }

                //Deseleccionamos el elemento anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                //En caso que el dia seleccionado tenga la clase disponible para hora medica la removemos
                //para que pueda quedar solo la clase de seleccion de dia
                //caso contrario volvemos a dejar la clase del dia disponible para hora medica
                if (elTarget.classList.contains('grid__cell--available-day')) {
                    elTarget.classList.remove('grid__cell--available-day');

                    // debo agregar la clase en caso que el anterior haya sido un dia disponible igualmente
                    if (this.selectedDatePrevAvaible !== null) {
                        this.selectedDatePrevAvaible.classList.add('grid__cell--available-day');
                    }

                    //aca guardo la celda actual (elTarget) seleccionada como la previa disponible
                    this.selectedDatePrevAvaible = elTarget;
                    //console.log('if  :', this.selectedDatePrevAvaible);
                } else {
                    //console.log('else :', this.selectedDatePrevAvaible);
                    if (this.selectedDatePrevAvaible !== null) {
                        this.selectedDatePrevAvaible.classList.add('grid__cell--available-day');
                        this.selectedDatePrevAvaible = null;
                    }
                }


                //obtenemos el id de la celda seleccionada y lo cargamos en la propiedad de la clase
                //que luego devolveremos 
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                //Seleccionamos el elemento seleeccionado y le gragamos la clase que corresponde
                elTarget.classList.add('grid__cell--selected');

                //le agregamos el evento disparador change al elemento calendario
                //esto lo hacemos una vez que el dia seleccionado ha cambiado
                this.elCalendar.dispatchEvent(new Event('change'));


                //boton continuar deberia validar que la fecha seleccionada tenga la clase dia disponibel para 
                //hora medica, de lo contrario enviar un alerta
            });
        });
    }

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }
}