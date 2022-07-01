let controlDeusuario = () => {
    debugger
    if ((localStorage.getItem(`nombre`) != null) & (localStorage.getItem(`edad`)!= null)) {
        quitarModalCompleto()
    }
}

let controlInputsInicio = () => {
    debugger
    if (inputNombre.value && inputEdad.value){
    moduloInicio.classList.toggle(`cerrarContenedorModulo`)
    almacenamientoDeInputs()
    quitarModal()
    }
    else if (inputNombre.value || inputEdad.value){
    almacenamientoDeInputs()
   }
   else {
    alert(`completa todos los campos`)
   }}
    

let almacenamientoDeInputs = () => {
    if (inputNombre.value) {
        controlSuperior.innerText=``
        localStorage.setItem(`nombre`,`${inputNombre.value}`)
    }else {
        controlSuperior.innerText=`⚠Completa este campo`
    }
    if (inputEdad.value) {
        controlInferior.innerText=``
        localStorage.setItem(`edad`,`${inputEdad.value}`)
    }else {
        controlInferior.innerText=`⚠Completa este campo`
    }
}

let quitarModalCompleto = () => {
    moduloInicio.style.visibility=`hidden`;
    cuidadoDeMenores()
}
let quitarModal = ()=> {
    moduloInicio.style.visibility=`hidden`;
    cuidadoDeMenores()
}

let cuidadoDeMenores = () => {
    debugger
    let edad = parseInt(localStorage.getItem(`edad`))
    let mayorDeEdad = () => {
        saludo.innerText=`¡HOLA ${localStorage.getItem(`nombre`).toUpperCase()}!, ¿COMO TE ENCUENTRAS HOY?`
    }
    let menorDeEdad = () => {
        saludo.innerText=`¡HOLA ${localStorage.getItem(`nombre`).toUpperCase()}!, ¿COMO TE ENCUENTRAS HOY?. 
        Recuerda tener supervición de tus padres`
    }
     (edad>=18)? mayorDeEdad() : menorDeEdad();
}