//variable global 
const valueShop= document.getElementById("compra")
const tableStyle = document.getElementById("tableStyle")

let computers =[
    {id:1,name: "ROG Zephyrus Duo 16 (2022) GX650RX-LB011X", 
    image:"./img/pc1.png",
    c1:"NVIDIA® GeForce RTX™ 3080 Ti Laptop GPU",
    c2:"Windows 11 Pro",
    c3:"AMD Ryzen™ 9 6900HX",
    c4:"ROG Nebula Display",
    c5:"16 pulgadas, UHD+ 16:10 (3840 x 2400, WQUXGA) / FHD+ 16:10 (1920 x 1200, WUXGA),",
    c6:'Additional Display: 14" 3840 x 1100(4K) IPS-level Panel',
    c7:"2TB + 2TB PCIe® 4.0 NVMe™ M.2 Performance SSD (RAID 0)",
    cost: 5000000
},
    {id:2,name: "ROG Strix G15 (2022) G513RM-HQ310W",
    image:"./img/pc2.png",
    c1:"GeForce RTX™ 3060 Laptop GPU",
    c2:"Windows 11 Home",
    c3:"AMD Ryzen™ 7 6800H",
    c4:"15.6 pulgadas, WQHD (2560 x 1440) 16:9, Refresh Rate:165Hz",
    c5:"1TB PCIe® 4.0 NVMe™ M.2 SSD",
    c6:"16GB DDR4 3200MHz",
    cost: 3500000

},
    {id:3,name: "ROG Strix Scar 17 SE (2022) G733CX-LL019W",
    image:"./img/pc3.png",
    c1:"NVIDIA® GeForce RTX™ 3080 Ti Laptop GPU",
    c2:"Windows 11 Home",
    c3:"AMD Ryzen™ 9 5900HX",
    c4:"17.3 pulgadas, WQHD (2560 x 1440) 16:9, Refresh Rate:240Hz",
    c5:"1TB + 1TB PCIe® 4.0 NVMe™ M.2 Performace SSD (RAID 0)",
    cost: 4500000
},
{id:4,name: "ROG Flow Z13 (2022) GZ301ZA-PS53",
    image:"./img/pc4.png",
    c1:"Windows 11 Home",
    c2:"12th Gen Intel® Core™ i5-12500H",
    c3:"13.4 inch, FHD+ 16:10 (1920 x 1200, WUXGA), Refresh Rate:120Hz",
    c4:"512GB PCIe® 4.0 NVMe™ M.2 SSD (2230)",
    cost: 4500000
},
{id:5,name: "ROG Flow Z13 (2022) GZ301ZA-PS53",
    image:"./img/pc5.png",
    c1:"Windows 11 Home",
    c2:"12th Gen Intel® Core™ i5-12500H",
    c3:"13.4 inch, FHD+ 16:10 (1920 x 1200, WUXGA), Refresh Rate:120Hz",
    c4:"512GB PCIe® 4.0 NVMe™ M.2 SSD (2230)",
    cost: 4500000
},
{id:6,name: "ROG Flow Z13 (2022) GZ301ZA-PS53",
    image:"./img/pc6.png",
    c1:"Windows 11 Home",
    c2:"12th Gen Intel® Core™ i5-12500H",
    c3:"13.4 inch, FHD+ 16:10 (1920 x 1200, WUXGA), Refresh Rate:120Hz",
    c4:"512GB PCIe® 4.0 NVMe™ M.2 SSD (2230)",
    cost: 4500000
}
]

let ListComputersBuy = [];

//variable global for control the number of background of banner animated
let numImage = 0;




//funtion for clear of car of shopping
function clearCar(){
    ListComputersBuy = [];
    paintBuy();
    document.getElementsByClassName("txt-none")[0].style.display = "block";
    valueShop.setAttribute("data-count","0")
    tableStyle.classList.add("opacity-0")
}




//function for delete a product of the list of shopping
function deleteItem(index){
    ListComputersBuy[index].quantity -= 1;
    if(ListComputersBuy[index].quantity == 0){
        ListComputersBuy.splice(index,1);
        valueShop.setAttribute("data-count",ListComputersBuy.length)
    }
    paintBuy();
    if(ListComputersBuy.length == 0){
        clearCar()
    }
}




//function for paint the table of products buy
function paintBuy(){
    let table = document.querySelectorAll("#table");
    let total = document.querySelectorAll("#Total");
    let totalCost = 0;
    let msg = document.querySelectorAll("#msg");


    msg.forEach(e => {
        e.style.display = "none";
    });


    table.forEach(tabla => {
    tabla.innerHTML="";
    ListComputersBuy.forEach((pc,index) => {
        tabla.innerHTML += `<tr class="my-3">
        <td id="nombreTabla"><img src="${pc.image}" alt="pc" class="img-fluid"></td>
        <td id="nombreTabla">${pc.name}</td>
        <td id="nombreTabla">${formatCost(pc.cost)}</td>
        <td id="cantidadTabla">${pc.quantity}</td>
        <td class="btnTable"><div><button class="delete-btn" onclick="deleteItem(${index})"><i class="fa-sharp fa-solid fa-circle-xmark fs-4"></i></button></div></td>
    </tr> `


    


    totalCost += pc.cost * pc.quantity;

    })
    });


    total.forEach(totales => {
        totales.textContent = "";
        totales.textContent = `Total: ${formatCost(totalCost)}`;
    });


}




//funcion para cambiar el background de un elemento haciendo una animacion 
function cambiarBackground(){
    let box = document.getElementById("CambioImagen");
    box.style.opacity = 0;
    box.classList.remove(`img_super${numImage}`);
    if(numImage >3){
        
        numImage = -1;
    }
    box.classList.add(`img_super${numImage+1}`);
    box.style.opacity = 1;
    numImage++;

}



//function for validate the exist of a product in the list of shopping and add the quantity of product
function buyPc(idPc,index){

   //validate if the pc is already in the list
    if(ListComputersBuy.find(pcBuy => pcBuy.id === idPc)){
        //change the quantity of the pc
        ListComputersBuy.map(pcBuy => {
            if(pcBuy.id === idPc){
                pcBuy.quantity++;
            }
        })
 

    }else{
        ListComputersBuy.push(computers[index]);
        //add key quantity in the object
        ListComputersBuy[ListComputersBuy.length-1].quantity = 1;   

        //change of value the button of the car of shop
        valueShop.setAttribute("data-count",ListComputersBuy.length)

        //hidden the msg "Aún no has agregado nada a tu carrito"
        document.getElementsByClassName("txt-none")[0].style.display = "none";
    
        //show table
        tableStyle.classList.remove("opacity-0")
    
    }
    paintBuy();
     
    

}





//function for paint the cards of pc in the html
function paintCardPc(){
    let target = document.getElementById("target");
    target.innerHTML = "";
    computers.forEach((pc,index) => {
        target.innerHTML += `
        <div class="animarTarget col-xxl-3 col-md-4 col-sm-6 my-3">
                            <div class="card h-100 mt-4">
                                <img id="imagePc" src="${pc.image}" class="card-img-top" alt="...">
                                <div class="card-body text-center">
                                    <h5 id="namePc" class="card-title">${pc.name}</h5>
              
                                        <!-- Crear una lista de caracteristicas del computador -->
                                        <ul class="card-text overflow-auto text-start mt-4 mb-5" style="height: 15rem;">
                                            ${
                                                Object.keys(pc).map(key => {
                                                    if(key != "id" && key != "name" && key != "image" && key != "cost"){
                                                        return `<li>${pc[key]}</li>`
                                                    }
                                                }).join("")
                                            }
                                        </ul>


                                        <h3 class=" fw-semibold" >${formatCost(pc.cost)}</h3>
                                        <span class="text-danger fw-semibold">Ahorro ${formatCost(pc.cost*0.20)}<span class="ms-2 text-dark"><del>${formatCost(pc.cost+(pc.cost*0.20))}</del></span></span>
                                        <br>
                                        <button href="#" class="text-center btn-buy my-2" onclick="buyPc(${pc.id},${index})">COMPRAR</button>
                                        
                                </div>
                            </div>
                        </div>
        `
    });
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





//function for paint options of the list search
function paintSearchList(){
    let List = document.getElementById("searchPc");
    computers.forEach((pc) => {
        List.innerHTML += `
        <option value="${pc.name}"></option>
        `
    })
}




//function for change page index.html to pagos.html
function ShopCumputers(){
    if(ListComputersBuy.length >0){
    window.location.href = "pagos.html";
    }
}
    





window.onload = function() {
    
    //execute the function for change the background of the banner 
    setInterval(cambiarBackground, 
        
        5000);
    paintCardPc();   
    paintSearchList();
} 


