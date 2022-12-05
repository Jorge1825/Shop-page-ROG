
let ListComputersBuy = JSON.parse(localStorage.getItem("ListComputersBuy"))
const pcBuy = document.getElementById("pcBuy")


function changeQuantity(action,index){
    const cuantityPc = document.getElementById("cantidadPc")
    
    if(action === "validar"){
        console.log(cuantityPc.value)
        console.log(ListComputersBuy[index].stock)

        if(((parseInt(ListComputersBuy[index].stock)+parseInt(ListComputersBuy[index].quantity))-parseInt(cuantityPc.value))< 0){
            alert("No hay stock suficiente")
            cuantityPc.value = parseInt(ListComputersBuy[index].quantity) + parseInt(ListComputersBuy[index].stock)
        }else if(cuantityPc.value === "0"){
            deletePc(index);
        }
    }
    else if(action ==="+"){
        if(((parseInt(ListComputersBuy[index].stock)+parseInt(ListComputersBuy[index].quantity))-parseInt(cuantityPc.value))<= 0){
            alert("No hay stock suficiente")
            cuantityPc.value = parseInt(ListComputersBuy[index].quantity) + parseInt(ListComputersBuy[index].stock)
        }else{
            cuantityPc.value ++;
        }
    
    }
    else{
        cuantityPc.value --;
        if(cuantityPc.value === "0"){
            deletePc(index);
        }
            
        

    }

}



//function for delete pc in the list
function deletePc(index){
    ListComputersBuy.splice(index,1)
    paintPc();

}



//function for paint the pc in the html
function paintPc(){
    pcBuy.innerHTML = ""
    ListComputersBuy.forEach((pc,index) => {
        pcBuy.innerHTML += `
        <div class="row mx-0 justify-content-center text-center mb-5">
                <div class="col-md-3 col-12 row-cols-md-5  align-self-center"><img class="img-fluid" src="${pc.image}" alt="teclado" style="height: 8em; width: 12em;"></div>
                <div class="col-md-3 col-12 fs-5 mt-2 mb-4  align-self-center">${pc.name}</div>
                <div class="col-md-3 col-6 y align-self-center">
                    <div class="row  justify-content-center">

                        <div class="col-2 justify-content-center align-items-center d-flex"><button onclick="changeQuantity('-',${index})" class="mas-menos"><i class="fa-solid fa-minus"></i></button></div>
                        <div class="col-md-4 col-4 justify-content-center d-flex">
                            
                            
                            <input onchange="changeQuantity('validar',${index})" id="cantidadPc"  type="number" class="inputCantidad w-100 text-center" value="${pc.quantity}"></div>
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
function formatCost(cost){

    //Insert the value total of cost in the table with the symbol $ and separated by points.
    newCost = parseFloat(cost).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        
    })
    return newCost;

}






window.onload = function() {

    paintPc()


}