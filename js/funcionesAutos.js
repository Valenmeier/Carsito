
agregarNuevosModelos = () => {
    const autosNuevos= `../js/nuevosautos.json`
    fetch(autosNuevos)
        .then((respuesta)=> respuesta.json())
        .then((datos)=> {
            for (nuevoAuto of datos) {
                const {imagen:img, id, marca, modelo, informacion, precio, logo, stock,cantidad} =nuevoAuto
                mostrarModelos.push(new modelos(img,modelo,marca,informacion,id,precio,logo,stock,cantidad))
            }
        })
    .catch((error)=>console.log(`ocurrio un error`))
    .finally(()=>{
        eliminarStock()
        mostrarEnDoom()})
}
function mostrarEnDoom () {   
    let productosMuestra=document.querySelector(".productos-autos")
    for (const modelos of mostrarModelos){
        const agregarDiv= document.createElement(`div`)
              agregarDiv.className="carta-autos"
              agregarDiv.innerHTML=
              `<div class="figura-carta">
              <img src="${modelos.imagen}">
           </div>
           <div class="modelo-auto">
               <h4>${modelos.modelo}</h4>
           </div>
           <div class="marca-auto">
               <div class="nombreDeMarca">
                   <h4>Marca: ${modelos.marca}</h4>
               </div>
               <div class="imagenDeMarca">
                   ${modelos.logo}
               </div>
           </div>
           <div class="id-auto">
               <h4>ID=${modelos.id}</h4>
           </div>
           <div class="informacion-auto">
               <p>
               ${modelos.informacion}
               </p>
           </div>
           <div class="precio-auto">
               <h4>PRECIO:$${parseInt(modelos.precio)}</h4>
           </div>`
            agregarDiv.addEventListener(`click`,()=>{
            redireccionDePágina(modelos)
           })
        //    agregarDiv.addEventListener(`click`,()=>{
        //     agregarAlCarrito(modelos)
        //    })
           productosMuestra.append(agregarDiv)
    }
 
 }

const eliminarStock = ()=> {
    let recuperarStock=JSON.parse(localStorage.getItem(`stock`))||false
    let objetos=recuperarStock
    debugger
    if (objetos) {
        for (let objeto of objetos) {
            let identificador=objeto.id
            let objetoAReemplazar=mostrarModelos.findIndex(id=>id.id===identificador)
            let convertirAModelo= (new modelos(objeto.imagen,objeto.modelo,objeto.marca,objeto.informacion,objeto.id,objeto.precio,objeto.logo,objeto.stock))
            mostrarModelos[objetoAReemplazar]=convertirAModelo
        }  
    }
}

const redireccionDePágina= (modelos) => {
    localStorage.setItem(`modelo`,
        JSON.stringify(modelos)
    )
    location.href=`../html/informacion.html`;
}







