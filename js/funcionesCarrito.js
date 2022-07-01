
let llamarCarrito= ()=> {
    debugger
    let llamarCarro= JSON.parse(localStorage.getItem(`carrito`));
    (llamarCarro.length<=0)? agregarAlMain() :
    (llamarCarro.length>0)? mostrarYSumarCarro() :
    agregarAlMain();
}

let agregarAlMain = () => {
    mainCarrito.innerHTML = `
    <h4 class="titulo-carrito">Carrito:</h4>
    <h3>Su carrito se encuentra vacio</h3>
    `;
}

let mostrarYSumarCarro= ()=> {
    mostrarEnCarrito()
    sumarcarrito()
}

let mostrarEnCarrito = () => {
    agarrarModelos=JSON.parse(localStorage.getItem(`carrito`))
    mainCarrito.innerHTML=""
    mainCarrito.innerHTML=`<h4 class="titulo-carrito">Carrito:</h4>`
    preciosEnCarrito=[]
    precioFinal=0
    for(let mostrarModelo of agarrarModelos) {
        let {id,imagen,marca,modelo,precio}= mostrarModelo
       mainCarrito.innerHTML+= `
       <div class="carrito-tabla"> 
            <img class="carrito-imagen" src="${imagen}" alt="autoEnCarrito" title="autoEnCarrito">
            <div class="eliminar-de-carro" id="${id}" title="Eliminar del carrito">X</div>
            <div class="titulo-del-auto">
                <h4>${modelo}</h4>
            </div>
            <div class="modeloYID">
                <div class="marcaAuto">
                    <h4>MARCA=${marca}</h4>
                </div>
                <div class="id-auto-carrito" >
                    <h4>ID=${id}</h4>
                </div>
            </div>
            <div class="precio-total">
                <h4>$${(precio)} </h4>
            </div>
        </div>
     `
        preciosEnCarrito.push(precio)
    }   

}
document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("eliminar-de-carro")){
        let id = parseInt(e.target.id)
        removerDelCarrito(id)
    }
} )

let sumarcarrito=()=> {

for (let i = 0; i < preciosEnCarrito.length; i++) {
    precioFinal += preciosEnCarrito[i];

}
mainCarrito.innerHTML+= `
<div class="precio-total centrar-precio-final">
    <h4>$${(precioFinal)} </h4>
</div>`
} 

function removerDelCarrito (producto) {
    let productoAremover=document.getElementById(producto)
    productoAremover.remove()
    let eliminarProducto=agarrarModelos.findIndex(modelo=> {
        return modelo.id==producto;
    })
    agarrarModelos.splice(eliminarProducto,1)
    localStorage.setItem(`carrito`,JSON.stringify(agarrarModelos))
    llamarCarrito()
}

