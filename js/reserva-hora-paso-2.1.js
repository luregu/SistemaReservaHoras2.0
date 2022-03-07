let elHoras = document.querySelectorAll('.horario');
elHoras.forEach(elHorario => {
    elHorario.addEventListener('click', e => {
        // obtenemos el boton con el horario seleccionado
        let elTarget = e.target;
        //obtengo el boton que permite continuar 
        let elBotonContinuar = document.getElementById('button-continuar');

        if (elTarget.classList.contains('horario--selected')) {
            elTarget.classList.remove('horario--selected');
            elBotonContinuar.classList.add('button--display');
            return;
        }
        //Deseleccionamos el elemento anterior
        let selectedHorario = document.querySelector('.horario--selected');
        // console.log('selectedHorario: ', selectedHorario);
        if (selectedHorario) {
            selectedHorario.classList.remove('horario--selected');
        }
        //elemento actual le agrega la clase
        elTarget.classList.add('horario--selected');
        elBotonContinuar.classList.remove('button--display');

    });
});


// let elHorarioSelected = document.querySelector('.horario--selected');
// if (elHorarioSelected) {
//     elHorarioSelected.addEventListener('click', e => {
//         let element = document.getElementById('button-continuar');
//         if (element.classList.contains('button--display')) {
//             element.classList.remove('button--display');
//         } else {
//             element.classList.add('button--display');
//         }
//     });
// }