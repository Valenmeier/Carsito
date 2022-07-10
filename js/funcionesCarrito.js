
let llamarCarrito= ()=> {
    let llamarCarro= JSON.parse(localStorage.getItem(`carrito`))|| [];
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
        debugger
        let {id,imagen:img,marca,modelo,precio,cantidad}= mostrarModelo
        let precioTotal=precio*cantidad
       mainCarrito.innerHTML+= `
       <div class="carrito-tabla"> 
            <img class="carrito-imagen" src="${img}" alt="autoEnCarrito" title="autoEnCarrito">
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
            <div class="cantidadYPrecio">
                <div class="marcaAuto">
                    <h4>Cantidad solicitada=${cantidad}</h4>
                </div>
                <div class="id-auto-carrito" >
                    <h4>Precio unitario= $${precio}</h4>
                </div>
            </div>
            <div class="precio-total">
                <h4>$${parseInt(precioTotal)} </h4>
            </div>
        </div>
     `
        preciosEnCarrito.push(parseInt(precioTotal))
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
    <h4>$${(precioFinal)}</h4>
</div>
<div class="comprarYVaciarCarro">
    <div class="botonComprarTodoCarrito">
        <button type="submit" class="finalizarCarrito">Comprar todo</button>
    </div>
    <div class="botonCancelarTodoCarrito">
        <button type="submit" class="vaciarCarrito">Vaciar Carrito</button>
    </div>
</div>`
let vaciarCarrito=document.querySelector(`.vaciarCarrito`)
vaciarCarrito.addEventListener(`click`,()=> {
    let carritoVacio=[]
    localStorage.setItem(`carrito`,JSON.stringify(carritoVacio))
    llamarCarrito()
})
let finalizarCompra=document.querySelector(`.finalizarCarrito`)
finalizarCompra.addEventListener(`click`, ()=> {
    Swal.fire({
        title: 'CONFIRMAR COMPRA',
        text: "Desea pagar $"+ `${precioFinal}` + " para finalizar la compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, adelante!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            debugger
            let historialDeCompra=[]
            for(producto of agarrarModelos) {
                let cantidadAEliminar=(producto.stock)-(producto.cantidad)
                producto.stock=cantidadAEliminar
                historialDeCompra.push(producto)
              }
              let traerStock=JSON.parse(localStorage.getItem(`stock`))
              traerStock=JSON.stringify(historialDeCompra)
              localStorage.setItem(`stock`,traerStock)
              localStorage.setItem(`historialDeCompra`,traerStock)
              let carritoVacio=[]
              localStorage.setItem(`carrito`,JSON.stringify(carritoVacio))
              llamarCarrito()
              
          Swal.fire(
            'Felicidades!',
            'Disfrute su inversión!',
            'success'
          )
          
        }else {
            Swal.fire(
                'Cancelado',
                'Se ha cancelado exitosamente la compra',
                'success'
              )
        }
      })
})
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

