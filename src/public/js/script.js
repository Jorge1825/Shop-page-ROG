
var problems = new Array;
//variable global 
const valueShop= document.getElementById("compra")
const tableStyle = document.getElementById("tableStyle")
const notify = document.getElementById("notify")
const titleNotify = document.getElementById("titleNotify")
const bodyNotify = document.getElementById("bodyNotify")

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
    cost: 5000000,
    stock:2
},
    {id:2,name: "ROG Strix G15 (2022) G513RM-HQ310W",
    image:"./img/pc2.png",
    c1:"GeForce RTX™ 3060 Laptop GPU",
    c2:"Windows 11 Home",
    c3:"AMD Ryzen™ 7 6800H",
    c4:"15.6 pulgadas, WQHD (2560 x 1440) 16:9, Refresh Rate:165Hz",
    c5:"1TB PCIe® 4.0 NVMe™ M.2 SSD",
    c6:"16GB DDR4 3200MHz",
    cost: 3500000,
    stock:10

},
    {id:3,name: "ROG Strix Scar 17 SE (2022) G733CX-LL019W",
    image:"./img/pc3.png",
    c1:"NVIDIA® GeForce RTX™ 3080 Ti Laptop GPU",
    c2:"Windows 11 Home",
    c3:"AMD Ryzen™ 9 5900HX",
    c4:"17.3 pulgadas, WQHD (2560 x 1440) 16:9, Refresh Rate:240Hz",
    c5:"1TB + 1TB PCIe® 4.0 NVMe™ M.2 Performace SSD (RAID 0)",
    cost: 4500000,
    stock:10
},
{id:4,name: "ROG Flow Z13 (2022) GZ301ZA-PS53",
    image:"./img/pc4.png",
    c1:"Windows 11 Home",
    c2:"12th Gen Intel® Core™ i5-12500H",
    c3:"13.4 inch, FHD+ 16:10 (1920 x 1200, WUXGA), Refresh Rate:120Hz",
    c4:"512GB PCIe® 4.0 NVMe™ M.2 SSD (2230)",
    cost: 4500000,
    stock:10
},
{id:5,name: "ROG Flow Z13 (2022) GZ301ZA-PS53",
    image:"./img/pc5.png",
    c1:"Windows 11 Home",
    c2:"12th Gen Intel® Core™ i5-12500H",
    c3:"13.4 inch, FHD+ 16:10 (1920 x 1200, WUXGA), Refresh Rate:120Hz",
    c4:"512GB PCIe® 4.0 NVMe™ M.2 SSD (2230)",
    cost: 4500000,
    stock:0
},
{id:6,name: "ROG Flow Z13 (2022) GZ301ZA-PS53",
    image:"./img/pc6.png",
    c1:"Windows 11 Home",
    c2:"12th Gen Intel® Core™ i5-12500H",
    c3:"13.4 inch, FHD+ 16:10 (1920 x 1200, WUXGA), Refresh Rate:120Hz",
    c4:"512GB PCIe® 4.0 NVMe™ M.2 SSD (2230)",
    cost: 4500000,
    stock:10
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
    ListComputersBuy[index].stock += 1;
    paintCardPc();
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


    //if the list of products is empty, the table is hidden and a message is displayed
    msg.forEach(e => {
        e.style.display = "none";
    });


    //paint the values of the computers that the user to buy
    table.forEach(tabla => {
    tabla.innerHTML="";
    ListComputersBuy.forEach((pc,index) => {
        tabla.innerHTML += `<tr class="my-3">
        <td id="nombreTabla"><img src="${pc.image}" loading="lazy" alt="pc" class="img-fluid"></td>
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



    //*Mostrar notificacion
    notifyShow("PRODUCTO AGREGADO","¡ Se ha agregado un producto a tu carrito !","light")
        

   //validate if the pc is already in the list
    if(ListComputersBuy.find(pcBuy => pcBuy.id === idPc)){

        //change the quantity of the pc
        ListComputersBuy.map(pcBuy => {
            if(pcBuy.id === idPc){
                if(pcBuy.stock > 0){
                pcBuy.quantity++;
                //change the stock of pc
                pcBuy.stock--;
                if(pcBuy.stock == 0){
                    
                    //show notification
                    //*Mostrar notificacion
                    notifyShow("SIN STOCK","¡ Has alcanzado el limite de equipos disponibles !","dark")


                    //change the button of buy
                    paintCardPc();
                }
                }
            }
        })
 

    }else{
        ListComputersBuy.push(computers[index]);
        //add key quantity in the object
        ListComputersBuy[ListComputersBuy.length-1].quantity = 1; 
        
        //change the stock of pc
        ListComputersBuy[ListComputersBuy.length-1].stock--;

        //change of value the button of the car of shop
        valueShop.setAttribute("data-count",ListComputersBuy.length)

        //hidden the msg "Aún no has agregado nada a tu carrito"
        document.getElementsByClassName("txt-none")[0].style.display = "none";
    
        //show table
        tableStyle.classList.remove("opacity-0")
    
    }




    paintBuy();
     

}



//crear notificacion y ocultarla
function notifyShow(title,body,theme){
    //create notification
    notify.innerHTML += `
    <div class="toast my-2 show serverError" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <img src="/img/logoNotify.png" class="rounded me-2 img-fluid" alt="..." width="30px" height="30px" >
            <strong id="titleNotify" class="me-auto">${title}</strong>
            <small>Ahora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          ${theme == "light" ? `<div id="bodyNotify" class="toast-body text-dark bg-light">` : `<div id="bodyNotify" class="toast-body text-light bg-dark">`}
          ${body}
          </div>
        </div>
    `;
    

    setTimeout(() => {
        //limpiar el primer elemento que se encuentre con la clase show dentro de notify
        notify.removeChild(notify.querySelector(".show"));
    }, 4000);




}





//function for paint the cards of pc in the html
function paintCardPc(){
    let target = document.getElementById("target");
    target.innerHTML = "";
    computers.forEach((pc,index) => {
        target.innerHTML += `
        <div class="animarTarget col-xxl-3 col-xl-4 col-sm-6 my-3">
                            <div class="card h-100 mt-4">
                                <img id="imagePc" loading="lazy" src="${pc.image}" class="placeholder-wave card-img-top" alt="...">
                                <div class="card-body text-center">
                                    <h5 id="namePc" class="card-title">${pc.name}</h5>
              
                                        <!-- Crear una lista de caracteristicas del computador -->
                                        <ul class="card-text overflow-auto text-start mt-4 mb-5" style="height: 15rem;">
                                            ${
                                                Object.keys(pc).map(key => {
                                                    if(key != "id" && key != "name" && key != "image" && key != "cost" && key != "stock"){
                                                        return `<li>${pc[key]}</li>`
                                                    }
                                                }).join("")
                                            }
                                        </ul>

                                        <div class="${pc.stock >0 ? "d-block" : "d-none"}">
                                        <h3 class=" fw-semibold" >${formatCost(pc.cost)}</h3>
                                        <span class="text-danger fw-semibold">Ahorro ${formatCost(pc.cost*0.20)}<span class="ms-2 text-dark"><del>${formatCost(pc.cost+(pc.cost*0.20))}</del></span></span>
                                        <br>
                                        <button id="buyPcBtn" href="#"  class="text-center btn-buy my-2" onclick="buyPc(${pc.id},${index})">COMPRAR</button>
                                        </div>
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

        //clear all localStorage
        localStorage.clear();

        //add the list of computers in the localStorage
        localStorage.setItem("ListComputersBuy",JSON.stringify(ListComputersBuy));
        window.location.href = "pagos.html";
    }
}
    




//Listener event onload of the page

window.onload = function() {

    msgFlash()

    
    //execute the function for change the background of the banner 
    setInterval(cambiarBackground, 
        
        5000);

    //paint the targets of computers 
    paintCardPc();
    
    //paint the options of the list search
    paintSearchList();

    

} 




/* //loader of the page
//quitar el loader cunado la pagina haya cargado al 100%
window.addEventListener("load", function(){
    
    this.document.getElementById("loader").classList.toggle("loader2")
})
 */


/* drag and drop */


const dropArea = document.getElementById("drop-area")
const dragText = document.getElementById('dragText')
const button = document.getElementById('btnUploadImg')
const input = document.getElementById('input-file')
const img = document.getElementById('imgPc')
const msgUpload = document.getElementById('msgUpload')
let fileUrl;
let files;


button.addEventListener('click',(e) =>{
    input.click();
})
img.addEventListener('click',(e) =>{
    input.click();
})


input.addEventListener('change',(e)=>{
    files= input.files
    dropArea.classList.add('active')
    showFiles(files)
    dropArea.classList.remove('active')

})

dropArea.addEventListener('dragover',(e)=>{
    e.preventDefault()
    dropArea.classList.add('active')
    dropArea.classList.remove('uploaded')
    dragText.textContent = 'Suelta para subir la imagen'
})

dropArea.addEventListener('dragleave',(e)=>{
    e.preventDefault()
    dropArea.classList.remove('active')
    dropArea.classList.add('uploaded')
    dragText.textContent = 'Arrastra y suelta la imagen'
})

dropArea.addEventListener('drop',(e)=>{
    e.preventDefault()
    files = e.dataTransfer.files;
    showFiles(files)
    dropArea.classList.remove('active')
 
    dragText.textContent = 'Arrastra y suelta la imagen'
})



document.addEventListener('dragover' ,(e)=>{
    e.preventDefault()
    dropArea.classList.remove('uploaded')
})

document.addEventListener('dragleave',(e)=>{
    e.preventDefault()
    dropArea.classList.remove('uploaded')
})

document.addEventListener('drop',(e)=>{
    e.preventDefault()
    if(fileUrl){
        dropArea.classList.add('uploaded')
    }
    

})



function showFiles(files){
    if(files.length ==1){
        processFile(files[0])
       
    }else{

        fileUrl = undefined
        dropArea.classList.remove('uploaded')
        msgUpload.innerText='No es posible cargar más de una imagen'
    
        setTimeout(() => {
            msgUpload.innerText=""
        }, 3000);

    }
}


function processFile(file){
    const docType = file.type;
    const validExtensions = ['image/jpeg','image/png', 'image/jpg']

    if(validExtensions.includes(docType)){
        //archivo valido
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`

        fileReader.addEventListener('load',e=>{
            fileUrl = fileReader.result
            
            img.innerHTML= '<h5 style="color: green;">Loading...</h5>'
        })

        fileReader.readAsDataURL(file)
        uploadFile(file,id)

    }else{
        fileUrl = undefined
        dropArea.classList.remove('uploaded')
        msgUpload.innerText='Este tipo de archivo no es soportado asegurese que sea .png, .jpg o .jpeg'
    
        setTimeout(() => {
            msgUpload.innerText=""
        }, 3000);
    }

}



async function uploadFile(file,id){
    const formData= new FormData()
    
    formData.append("file", file)

    try {
        const response = await fetch('http://localhost:4000/upload',{
            method: "POST",
            body: formData
        })

        const responseText = await response.text();

        dropArea.classList.add('uploaded')
        console.log(fileUrl)
        img.innerHTML=`<img src="${fileUrl}" width="200px">`
    
    } catch (error) {
        fileUrl = undefined
        dropArea.classList.remove('uploaded')
        img.innerHTML=''
        msgUpload.innerText='No fue posible subir la imagen, intentelo nuevamente'
    
        setTimeout(() => {
            msgUpload.innerText=""
        }, 3000);
    }   
} 


/* Validaciones */


 
//validar que el email cumpla con un @ un dominio y una extension
function validateEmail(value,id){
    const regularEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(value == undefined || value == "" || regularEmail.test(value) == false){
        document.getElementById(`${id}Text`).classList.remove('d-none')
        problems.push('error')

    }else{
        document.getElementById(`${id}Text`).classList.add('d-none')
    }
}


//Validar que los inputs asociados a está funcion no esten vacios
function validateInputsEmpty(value,id){
    if(value == undefined || value == ""){
        document.getElementById(`${id}Text`).classList.remove('d-none')
        problems.push('error')
        return false
    }else{
        document.getElementById(`${id}Text`).classList.add('d-none')
    }

    
}


//validar numeros de telefono 
function validateTel(value,id){
    const regularTel=/^[0-9]$/
    if(value == undefined || value == "" || regularTel.test(value)){
        
        document.getElementById(`${id}Text`).classList.remove('d-none')
        return problems.push('error')
    }else{
        document.getElementById(`${id}Text`).classList.add('d-none')
    }
    
    if(value<0){
        document.getElementById(`${id}`).value = ""
        return problems.push('error')
    }
}


//validar inputs que reciban precios o valores
function validateInputsMoney(value,id,bool=true){
    let newNumber = parseFloat(value.replace(/[^0-9.-]+/g,""))

    if(bool){

        isNaN(newNumber) ? document.getElementById(`${id}`).value = '' : document.getElementById(`${id}`).value = newNumber;

        
    }else{

    if(newNumber == undefined || newNumber == "" || isNaN(newNumber)){
        document.getElementById(`${id}Text`).classList.remove('d-none')
        document.getElementById(`${id}`).value = ''
        problems.push('error')
        

    }else{
        let formatter = new Intl.NumberFormat('en-US',{
            style:'currency',
            currency:'USD'
        })

        document.getElementById(`${id}`).value = formatter.format(newNumber)
    }
}
}


//Funcion para validar el input e la contraseña de la ventana signin
function validatePassSignIn(value,id){
    if(value == undefined || value == "" || value.length < 8){
        document.getElementById(`${id}Text`).classList.remove('d-none')
        problems.push('error')
        return false
    }else{
        document.getElementById(`${id}Text`).classList.add('d-none')
    }
}


//validar que la contraseña cumpla con los criterios de : al menos unaletra mayuscula, una minuscula, un numero, un simbolo y que sea minimo de 8 caracteres de longitud
function validatePasswordSignUp(value,id){

    const regularPass= /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    const pass2 = document.getElementById('password2SignUp')

    if(value == undefined || value == "" || regularPass.test(value) == false){
        document.getElementById(`${id}Text`).classList.remove('d-none')
    }else{
        document.getElementById(`${id}Text`).classList.add('d-none')
    }

    if(pass2.value != "" || pass2.value != undefined){
        comparePassword(pass2.value, pass2.id)
    }
}





//funcion para comparar las contraseñas en el formulario de SignUp
function comparePassword(value,id){
    if(document.getElementById('passwordSignUp').value !== value){
        document.getElementById(`${id}Text`).classList.remove('d-none')
    }else{
        document.getElementById(`${id}Text`).classList.add('d-none')
    }
}




//funcion para validar formulrios y enviarlos en caso de que los campos cumplan con las condiciones esperadas
function submitSign(form="none"){
    let formulario = document.getElementById(form)
    
    window.scrollTo(0,0)
    let inputs = document.querySelectorAll("[onblur]")
    problems =[]
    

    for(let i = 0; i<inputs.length;i++){
        inputs[i].onblur();
    }
    if(problems.length>0){
        return false
    }

    if(formulario !== "none"){
        formulario.noValidate = true
    }

    return true
 

}




//setting the messages for the server
function msgFlash() {
    let serverErrors = document.querySelectorAll(".serverError");
  
    for (let i = 0; i < serverErrors.length; i++) {
      let progressBar = serverErrors[i].querySelector(".progress-bar");
      let duration = 3000 + (i * 1000);
  
      serverErrors[i].classList.add("show");
  
      let interval = setInterval(() => {
        let elapsedTime = Date.now() - startTime; //calcula el tiempo transcurrido
        let remainingTime = duration - elapsedTime; //calcula el tiempo restante
        let percentage = (elapsedTime / duration) * 100;    //calcula el porcentaje de tiempo transcurrido
  
        progressBar.style.width = `${100 - percentage}%`; //actualiza el ancho de la barra de progreso
  
        if (remainingTime <= 0) {
          clearInterval(interval);
          serverErrors[i].classList.remove("show");
        }
      }, 15);
  
      let startTime = Date.now();
    }
  }