function autoId () {
    return parseInt(Math.random()*1000)
}
function autoStock () {
    return parseInt(Math.random()*10)
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
               <h4>PRECIO:$${modelos.precio}</h4>
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
const redireccionDePágina= (modelos) => {
    localStorage.setItem(`modelo`,
        JSON.stringify(modelos)
    )
    location.href=`../html/informacion.html`;
}







