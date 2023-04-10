const pintarCarrito = () => {

    // creamos un modal para ver el contenido del carrito
    modalContainer.innerHTML= "";
    modalContainer.style.display ="flex"
    // header del modal
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito</h2>
    `;
    modalContainer.append(modalHeader)

    const modalButton = document.createElement("h3");
    modalButton.innerText = "✖";
    modalButton.className = "modal-header-button";

    modalHeader.append(modalButton);

    // evento para que se cierre el modal
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    //contenido del modal 
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio}</p>
            <span class="restar"> ➖ </span>
            <p>cantidad:${product.cantidad}</p>
            <span class="sumar"> ➕ </span>
            <p>Total: ${product.cantidad * product.precio}</p>

            <span class="delete-product" >❌</span>
        `;
        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if(product.cantidad !==1){
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });


        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", ()=>{
            eliminarProducto(product.id);
        });

    });


    //footer del modal 
    const total = carrito.reduce((acc, pro) => acc + pro.precio * pro.cantidad,0); 
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: $${total}`
    modalContainer.append(totalBuying);

    // boton pagar para finalizar compra
     const pagar = document.createElement("span")
     pagar.className="pagar-total"
     pagar.innerHTML= "pagar"
     modalContainer.append(pagar)

     pagar.addEventListener("click", ()=>{

        if (carrito.length !== 0){
            Swal.fire({
                title: 'Compra realizada con exito',
                text: 'hasta la proxima!',
                icon: 'success',
                position: 'center',
            })
        }else{
            Swal.fire({
                title: 'Primero agrege productos al carrito',
                icon: 'error',
                position: 'center',
                timer: 2000 
            })
        }

        carrito.length = 0
        carritoCounter();
        saveLocal();
        pintarCarrito();
     })
    
};


verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id)

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};


const carritoCounter = () =>{
    cantidadCarrito.style.display ="block"
    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength",JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();

