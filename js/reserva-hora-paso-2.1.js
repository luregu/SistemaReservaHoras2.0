//Manejo de botones para mostrar u ocultar horas medicas
let elVerHoras = document.querySelectorAll('.mostrar-horas');
elVerHoras.forEach(elHora => {
    elHora.addEventListener('click', e => {
        // obtenemos el boton que muestra la hora
        let elTarget = e.target;
        //obtenemos el nodo padre
        let parentNode = elTarget.parentNode;
        //obtengo el contenedor hermano directo... porque dos hermanos 
        //siguientes para conseguri el nodo que necesito??
        //let nextSiblingNode = parentNode.nextSibling.nextSibling;
        //lo anterior funciona sin embargo el que obtiene el nodo preciso es nextElementSibling
        //obtenemos el nodo hermamo siguiente del nodo anterior
        let nextSiblingNode = parentNode.nextElementSibling;

        if (nextSiblingNode.classList.contains('container-horarios')) {
            nextSiblingNode.classList.remove('container-horarios');
        } else {
            nextSiblingNode.classList.add('container-horarios');
        }

    });
});

//Manejo de botones para seleccionar horas medicas  y aparicion del boton Continuar
let elHoras = document.querySelectorAll('.horario');
elHoras.forEach(elHorario => {
    elHorario.addEventListener('click', e => {
        // obtenemos el boton con el horario seleccionado
        let elTarget = e.target;
        console.log(elTarget);
        //obtengo el boton que permite continuar 
        let elBotonContinuar = document.getElementById('button-continuar');

        if (elTarget.classList.contains('horario--selected')) {
            console.log(elTarget.classList.contains('horario--selected'));
            elTarget.classList.remove('horario--selected');
            elBotonContinuar.classList.add('button--display');
            return;
        }
        //Deseleccionamos el elemento anterior
        let selectedHorario = document.querySelector('.horario--selected');

        console.log(selectedHorario);
        if (selectedHorario) {
            selectedHorario.classList.remove('horario--selected');
        }
        //elemento actual le agrega la clase
        elTarget.classList.add('horario--selected');
        elBotonContinuar.classList.remove('button--display');
        console.log('fin');
    });
});