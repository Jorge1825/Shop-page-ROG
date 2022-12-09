
let ListComputersBuy = JSON.parse(localStorage.getItem("ListComputersBuy"))
const pcBuy = document.getElementById("pcBuy")

const inputCupon = document.getElementById("inputCupon")

//variables for notification
const notify = document.getElementById("notify")
const titleNotify = document.getElementById("titleNotify")
const bodyNotify = document.getElementById("bodyNotify")



//Array of cupons 
const cupones = [
    {
        name: "GRATIS2022",
        discount: 100,
        dcp: "Cupon de descuento del 100% para compras no superiores a $5.0000.0000,00",
        active: true,
    },
    {
        name: "WILL2022",
        discount: 50,
        dcp: "Cupon de descuento del 50% para compras no superiores a $5.0000.0000,00",
        active: true,
    },
    {
        name: "06/06/2022",
        discount: 50,
        dcp: "Cupon de descuento del 50% para compras no superiores a $5.0000.0000,00",
        active: false,
    }
]





//function for change the quantity of pc in the list
function changeQuantity(action, index) {
    const cuantityPc = document.getElementById("cantidadPc" + index)

    if (action === "validar") {
        console.log(cuantityPc.value)
        console.log(ListComputersBuy[index].stock)

        if (((parseInt(ListComputersBuy[index].stock) + parseInt(ListComputersBuy[index].quantity)) - parseInt(cuantityPc.value)) < 0) {


            //show notification
            //configure values of the notification
            notification("SIN STOCK","¡ Has alcanzado el limite de equipos disponibles !","dark")

            cuantityPc.value = parseInt(ListComputersBuy[index].quantity) + parseInt(ListComputersBuy[index].stock)

        } else if (cuantityPc.value === "0") {
            deletePc(index);
        }
    }
    else if (action === "+") {
        if (((parseInt(ListComputersBuy[index].stock) + parseInt(ListComputersBuy[index].quantity)) - parseInt(cuantityPc.value)) <= 0) {


             //show notification
            //configure values of the notification
            notification("SIN STOCK","¡ Has alcanzado el limite de equipos disponibles !","dark")

            cuantityPc.value = parseInt(ListComputersBuy[index].quantity) + parseInt(ListComputersBuy[index].stock)
        
        
        } else {
            cuantityPc.value++;
        }

    }
    else {
        cuantityPc.value--;
        if (cuantityPc.value === "0") {
            deletePc(index);
        }
    }
}



//function for delete pc in the list
function deletePc(index) {
    ListComputersBuy.splice(index, 1)
    paintPc();

    //show notification
    //configure values of the notification
    notification("PRODUCTO ELIMINADO","¡ Has eliminado el producto correctamente !",null)

}



//function for paint the pc in the html
function paintPc() {
    pcBuy.innerHTML = ""
    ListComputersBuy.forEach((pc, index) => {
        pcBuy.innerHTML += `
        <div class="row mx-0 justify-content-center text-center mb-5">
                <div class="col-md-3 col-12 row-cols-md-5  align-self-center"><img class="img-fluid" loading="lazy" src="${pc.image}" alt="teclado" style="height: 8em; width: 12em;"></div>
                <div class="col-md-3 col-12 fs-5 mt-2 mb-4  align-self-center">${pc.name}</div>
                <div class="col-md-3 col-6 y align-self-center">
                    <div class="row  justify-content-center">

                        <div class="col-2 justify-content-center align-items-center d-flex"><button onclick="changeQuantity('-',${index})" class="mas-menos"><i class="fa-solid fa-minus"></i></button></div>
                        <div class="col-md-4 col-4 justify-content-center d-flex">
                            
                            
                            <input onchange="changeQuantity('validar',${index})" id="cantidadPc${index}"  type="number" class="inputCantidad w-100 text-center" value="${pc.quantity}"></div>
                        <div class="col-2 justify-content-center align-items-center d-flex"><button class="mas-menos" onclick="changeQuantity('+',${index})"><i class="fa-solid fa-plus"></i></button></div>
                
                    </div>
                </div>
                <div class="col-md-3 col-6 text-end text-break align-self-center">
                    <div class="col-12">${formatCost(pc.cost)}</div>
                    <div class="col-12"><button id="deletepC" onclick="deletePc(${index})">Eliminar</button></div>
            </div>

            </div>
            <hr>
        `
    })
}




//function for format cost in values of money colombian
function formatCost(cost) {

    //Insert the value total of cost in the table with the symbol $ and separated by points.
    newCost = parseFloat(cost).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",

    })
    return newCost;
}





//function for validate the cupon input
function applyCupon() {


    //validate if the cupon is active and exist
    if (inputCupon.value === "") {
        //show notification
        //configure values of the notification
        notification("CUPON VACIO","¡ Debes ingresar un cupon !","dark")

    } else {

        let isCupon = false;
        
        cupones.find(cupon => {
            if (cupon.name == inputCupon.value.toUpperCase() && cupon.active === true) {
                isCupon = true;
            } 
        })

        ////show notification
        //configure values of the notification
        isCupon ? notification("CUPON APLICADO","¡ El cupón se ha aplicado correctamente!",null) : notification("CUPON NO VALIDO","¡ El cupón no es valido!","dark");


    }
}




//function for setting the notification 
function notification(title, msg, type) {

    titleNotify.innerText = title;
    bodyNotify.innerText = msg;

    if (type === "dark") {
        notify.classList.add("show", "bg-dark", "text-light");
        setTimeout(() => {
            notify.classList.remove("show", "bg-dark", "text-light")
        }, 4000);


    }else {
        notify.classList.add("show");
        setTimeout(() => {
            notify.classList.remove("show")
        }, 4000);

    }

}





window.onload = function () {

    paintPc()

}