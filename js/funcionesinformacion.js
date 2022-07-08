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
}

mostrarEnInformacion()


const botonVolverAautos = document.querySelector(`.otros-autos`)
botonVolverAautos.addEventListener(`click`,()=> {
    location.href=`../html/autos.html`;
})

const agregarAlCarrito=document.querySelector(`.informacion-añadir-carrito`)

agregarAlCarrito.addEventListener(`click`, ()=> {
    añadirProductoExitoso(`Su ${recuperarModelo.modelo} se ha agregado exitosamente al carrito`.toUpperCase())

    guardarEnCarrito=(JSON.parse(localStorage.getItem(`carrito`))) || [];

    guardarEnCarrito.push(recuperarModelo)
    
    localStorage.setItem(`carrito`,JSON.stringify(guardarEnCarrito))
})

let añadirProductoExitoso= (texto)=> {
    Swal.fire({
        title: 'Exito',
        text: texto,
        imageUrl: `${recuperarModelo.imagen}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}


