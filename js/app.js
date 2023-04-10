const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carritoSave")) || [];



// Traemos nuestros productos del archivo json
const getProduct = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    //recorremos el array de los productos
    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price"> $ ${product.precio}</p>
        `;
    
        shopContent.append(content)
    
        // boton 'comprar'
        let comprar = document.createElement("button")
        comprar.innerText = "comprar";
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
        // metodo para buscar un producto repetido y agregarlo como cantidad 
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
            if (repeat){
                carrito.map((prod)=>{
                    if(prod.id === product.id){
                        prod.cantidad++;
                    }
                })
            }else{
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });

                carritoCounter();
                saveLocal()
            }
        });
    });
};

getProduct();

//localStorage
const saveLocal = () => {
    localStorage.setItem("carritoSave", JSON.stringify(carrito));
};