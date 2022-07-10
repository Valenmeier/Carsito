const mainInformacion=document.querySelector(`.main-informacion`)

const recuperarModelo= JSON.parse(localStorage.getItem(`modelo`))

const mostrarEnInformacion= () => {  
    mainInformacion.innerHTML=`
    <div class="informacion-img">
        <img src="${recuperarModelo.imagen}" alt="logo" >
        </div>
        <div class="informacion-nombre">
            <h4>${recuperarModelo.modelo}</h4>
        </div>
        <div class="informacion-informacion">
            <h4>INFORMACIÓN ${recuperarModelo.modelo} </h4>
            <p>${recuperarModelo.informacion}</p>
        </div>
        <div class="informacion-marca">
            <h4>MARCA= ${recuperarModelo.marca}</h4>
        </div>
        <div class="informacion-logo">
            ${recuperarModelo.logo}
        </div>
        <div class="informacion-precio">
            <h4>PRECIO= $${recuperarModelo.precio} </h4>
        </div>
        <div class="informacion-stock">
            <h4>CANTIDAD DISPONIBLE= ${recuperarModelo.stock}</h4>
        </div>
        <div class="informacion-añadir-carrito">
            <i class="fa-solid fa-cart-plus"></i>
            <h4>AGREGAR AL <br> CARRITO</h4>
        </div>
        <div class="informacion-comprar">
            <h4>COMPRAR</h4>
        </div>
        <div class="otros-autos">
            <h4>Otros autos</h4>
        </div>`

        if (recuperarModelo.stock > 0) {
          const comprarVehiculo =
            document.querySelector(`.informacion-comprar`);
          comprarVehiculo.addEventListener(`click`, () => {
            Swal.fire({
              title: "Estas seguro?",
              text: `Quieres comprar ${recuperarModelo.modelo} por $${recuperarModelo.precio}`,
              icon: "warning",
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, comprar",
              customClass: {
                confirmButton: "confirmacionDeCompra",
                cancelButton: "cancelacionDeCompra"
              },
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  "Finalizado!",
                  "Disfrute su nuevo " + `${recuperarModelo.modelo}`,
                  "success"
                );
                sacarStock()
                eventoCarrito();

              }
            });
          });
        }else {
            const comprarVehiculo =
            document.querySelector(`.informacion-comprar`);
            comprarVehiculo.addEventListener(`click`, () =>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'NO HAY STOCK DISPONIBLE!',
                  })
            })
        }
        

}

mostrarEnInformacion()



sacarStock = () => {
    let eliminarStock=recuperarModelo.stock-(1||numero)
    recuperarModelo.stock=eliminarStock
    mostrarEnInformacion()
    nuevosStocks=JSON.parse(localStorage.getItem(`stock`))||[]
    nuevosStocks.push(recuperarModelo)
    localStorage.setItem(`stock`,JSON.stringify(nuevosStocks))
    localStorage.setItem(`modelo`,JSON.stringify(recuperarModelo))
}

const botonVolverAautos = document.querySelector(`.otros-autos`)
botonVolverAautos.addEventListener(`click`,()=> {
    location.href=`../html/autos.html`;
})

let evitarRepetir=()=> {
  let guardarEnCarrito=((JSON.parse(localStorage.getItem(`carrito`))) || []);
  let informacion=guardarEnCarrito.length
  if (informacion==0) {
    guardarEnCarrito.push(recuperarModelo)
    localStorage.setItem(`carrito`,JSON.stringify(guardarEnCarrito))
  } else {
  
      for (encontrarIndex of guardarEnCarrito) {
        debugger
        let identificador=parseInt(recuperarModelo.id)
            let datoACambiar=guardarEnCarrito.findIndex((guardarEnCarrito)=>parseInt(guardarEnCarrito.id)===identificador)
            if(datoACambiar!=-1) {
              guardarEnCarrito[datoACambiar]=recuperarModelo
              localStorage.setItem(`carrito`,JSON.stringify(guardarEnCarrito))
            }else {
              guardarEnCarrito.push(recuperarModelo)
              localStorage.setItem(`carrito`,JSON.stringify(guardarEnCarrito))
            }
            
      }
      
  }
  
  
}


eventoCarrito=() => {
  const agregarAlCarrito=document.querySelector(`.informacion-añadir-carrito`)
  agregarAlCarrito.addEventListener(`click`, ()=> {
    if (recuperarModelo.stock>0) {
      
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad',
        input: 'number',
        inputAttributes: {
          min: 1,
          max:`${recuperarModelo.stock}`,
         
        } ,
        inputValidator: (value) => {
          debugger
          if ((parseInt(value)>`${recuperarModelo.stock}`) || (parseInt(value)<=0)) {
            return 'COLOCA UNA CANTIDAD VALIDA'
          }else {
            
            let valorTomado=value
            recuperarModelo.cantidad=parseInt(valorTomado)
            localStorage.setItem(`modelo`,JSON.stringify(recuperarModelo))
            añadirProductoExitoso(`Su ${recuperarModelo.modelo} se ha agregado exitosamente al carrito`.toUpperCase())
            evitarRepetir()
          }
        },
        inputPlaceholder:"Coloca la cantidad a llevar",
        footer: 'Disponibles = ' + `${recuperarModelo.stock}`
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'NO HAY STOCK DISPONIBLE!',
      })
    }
      
  })
  
  let añadirProductoExitoso= (texto)=> {
      Swal.fire({
          title: 'Exito',
          text: texto,
          imageUrl: `${recuperarModelo.imagen}`,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          customClass: {
            popup: 'añadirACARRO',
            title: 'tituloModal',
            confirmButton: 'OkeyBoton',
            confirmButtonColor: `pink`,
            text: 'hola',
            image: 'imagenConfirmarModal',
            htmlContainer: 'editarTExto'
          }
        })
        
  }
}
eventoCarrito()


