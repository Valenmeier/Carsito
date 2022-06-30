let llamarCarrito= ()=> {
    debugger
    if ((JSON.parse(localStorage.getItem(`carrito`)))=="") {
        mainCarrito.innerHTML = `
        <h4 class="titulo-carrito">Carrito:</h4>
        <h3>Su carrito se encuentra vacio</h3>
        `;
    }else if (JSON.parse(localStorage.getItem(`carrito`))){
        mostrarEnCarrito()
        sumarcarrito()
    }else {
        mainCarrito.innerHTML = `
        <h4 class="titulo-carrito">Carrito:</h4>
        <h3>Su carrito se encuentra vacio</h3>
        `;
    }
}
let mostrarEnCarrito = () => {
    agarrarModelos=JSON.parse(localStorage.getItem(`carrito`))
    mainCarrito.innerHTML=""
    mainCarrito.innerHTML=`<h4 class="titulo-carrito">Carrito:</h4>`
    preciosEnCarrito=[]
    precioFinal=0
    for(let mostrarModelo of agarrarModelos) {
        //poner id en tabla para que se elimine todo
       mainCarrito.innerHTML+= `
       <div class="carrito-tabla" id="${mostrarModelo.id}"> 
            <img class="carrito-imagen" src="${mostrarModelo.imagen}" alt="autoEnCarrito" title="autoEnCarrito">
            <div class="eliminar-de-carro" id="eliminar" title="Eliminar del carrito">X</div>
            <div class="titulo-del-auto">
                <h4>${mostrarModelo.modelo}</h4>
            </div>
            <div class="modeloYID">
                <div class="marcaAuto">
                    <h4>MARCA=${mostrarModelo.marca}</h4>
                </div>
                <div class="id-auto-carrito" >
                    <h4>ID= ${mostrarModelo.id}</h4>
                </div>
            </div>
            <div class="precio-total">
                <h4>$${(mostrarModelo.precio)} </h4>
            </div>
        </div>
     `
     debugger
     cruzParaSacar= document.querySelector(`#eliminar`)

     cruzParaSacar.addEventListener(`click`,()=> {
        removerDelCarrito(mostrarModelo.id)
     })
        preciosEnCarrito.push(mostrarModelo.precio)
    }
}

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

