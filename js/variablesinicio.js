
const inputNombre=document.querySelector(".nombreDeUsuario")
const inputEdad=document.querySelector(".edadDeUsuario")
const inputSubmit=document.querySelector(".botonDeConfirmacion")

const controlSuperior=document.querySelector(".datosPSuperior")
const controlInferior=document.querySelector(".datosPInferior")

const moduloInicio=document.querySelector(`.moduloInicio`)

const saludo=document.querySelector(`.saludo-inicio`)



controlDeusuario()


inputSubmit.addEventListener(`click`,controlInputsInicio)


