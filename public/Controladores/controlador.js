var numAsientos;
var ocupados = [];
var arrayOrigenes;
var arrayDestinos;
var arrayHorarios;
var arrayExtraInfo;
var seleccionados = [];
var numBoleto;
var origen;
var destino;
var hora;
var cantidad;
var fechaViaje;


// para sumar 7 dias a la fecha
Date.prototype.addDays = function() {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + 6);
    return date;
}

// para devolver una fecha en el formato necesario para trabajar
function fechaString(fecha) {
    let dd = String(fecha.getDate()).padStart(2, '0');
    let mm = String(fecha.getMonth() + 1).padStart(2, '0'); 
    let yyyy = fecha.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

var hoy = new Date();


var divInicio = `
    <div style="height: 90%;">
        <h1 style="text-align: center;">Bienvenido a E-transs</h1>
        <br><br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laborum id nostrum illo maxime quisquam amet quia earum ex, ullam eos sint provident, totam ea, accusamus facere! Dolorem nisi sapiente est officia voluptate corporis eius itaque magni assumenda ea, fugiat quia adipisci optio ut perferendis, voluptatem laudantium animi incidunt ipsum?</p>  
    </div>
    <button style="margin-left: 45%;" onclick="inicio(${arrayOrigenes})" type="button" class="btn btn-success">Continuar</button>
`;

// se encarga de llenar el select con los destinos traidos de la base de datos
function selectDestinos(destinos) {
    arrayDestinos = destinos;
    let optDestinos = `<option value="0" >------</option>`;
    for (let i = 0; i < arrayDestinos.length; i++) {
        optDestinos += `<option value="${i+1}" >${arrayDestinos[i].nombre}</option>`
    }
    document.getElementById("destino").innerHTML = optDestinos;
}

// se encarga de llenar el select con los horarios traidos de la base de datos
function selectHorarios(horario) {
    arrayHorarios = horario;
    let optHorarios = `<option value="0" >------</option>`;
    for (let i = 0; i < arrayHorarios.length; i++) {
        optHorarios += `<option value="${i+1}" >${arrayHorarios[i].horaSalida}</option>`
    }
    document.getElementById("hora").innerHTML = optHorarios;
}

// se encarga de llenar el resto de la informacion necesaria del viaje
function selectDisponibles(info) {
    arrayExtraInfo = info;
    numAsientos = arrayExtraInfo[0][0].capacidad;
    let tempDisponible = numAsientos - arrayExtraInfo[1][0].cantidad;
    document.getElementById("duracion").innerHTML = `${arrayHorarios[parseInt(hora.value)-1].duracion} Horas`
    document.getElementById("dispon").innerHTML = `${tempDisponible} Asientos `
    document.getElementById("precio").innerHTML = `Lps. ${arrayHorarios[parseInt(hora.value)-1].precio}.00`
    document.getElementById("cantidad").max = `${tempDisponible}`
}


// agrega al array de ocupados los asientos que se encuentran en la base de datos
function llenarOcupados(arrayOcupados) {
    for (let i = 0; i < arrayOcupados.length; i++) {
        ocupados.push(arrayOcupados[i].numeroasiento)
    }
    boleteria()
}

// Funcion que muestra el formulario de compra de boletos
// lo primero que hace es llenar el select de lugares de origenes
function inicio(origenes) {
    arrayOrigenes = origenes;
    let optOrigenes = `<option value="0" >------</option>`;
    for (let i = 0; i < arrayOrigenes.length; i++) {
        optOrigenes += `<option value="${i+1}" >${arrayOrigenes[i].nombre}</option>`
    }
    let divBoleteria = `<div style="height: 90%;">
    <h1 style="text-align: center;">Elija su Viaje</h1>
    <br>
    <div class="row">
      <label style="margin-top: 10px; text-align: right;" class="col-2">Origen:</label>
      <div style="margin-top: 10px;" class="col-4">
        <select onchange="actualizarDestino()" class = "form-control" id="origen">
            ${optOrigenes}
        </select>
      </div>
      <label style="margin-top: 10px;text-align: right" class="col-2">Destino:</label>
      <div style="margin-top: 10px;" class="col-4">
        <select onchange="actualizarHorario()" class = "form-control" id="destino">
          <option value="0" selected>------</option>
        </select>
      </div>
      <label style="margin-top: 10px;text-align: right" class="col-2">Dia:</label>
      <div style="margin-top: 10px;" class="col-4">
      <input type="date" onchange="actualizarDisponibles()" id="dia" value="${fechaString(hoy)}" min="${fechaString(hoy)}" max="${fechaString(hoy.addDays())}">
      </div>
      <label style="margin-top: 10px;text-align: right" class="col-2">Hora Salida:</label>
      <div style="margin-top: 10px;" class="col-4">
        <select onchange="actualizarDisponibles()" class = "form-control" id="hora">
          <option value="0" selected>------</option>
        </select>
      </div>
      <label style="margin-top: 10px;text-align: right;" class="col-2">Duracion: </label>
      <label id="duracion" style="margin-top: 10px;text-align: left;" class="col-4">------ </label>
      <label style="margin-top: 10px;text-align: right" class="col-2">Disponibles:</label>
      <label id="dispon" style="margin-top: 10px;text-align:left" class="col-4"> -----</label>
      <label style="margin-top: 10px;text-align: right" class="col-2">Precio:</label>
      <label id="precio" style="margin-top: 10px;text-align:left" class="col-4"> ----- </label>
      <label style="margin-top: 10px;text-align: right" class="col-2">Cantidad:</label>
      <div style="margin-top: 10px;" class="col-4">
        <input type="number" onchange="validarBoleteria()" id="cantidad" value="0" min="1" max="30">
      </div>
    </div>   
  </div>
<button style="margin-left: 40%;" onclick="cancelar()" type="button" class="btn btn-secondary">Cancelar</button>
<button style="margin-left: 10px;" onclick="obtenerOcupados()" type="button" class="btn btn-success">Continuar</button>`;

    document.getElementById("inicio").classList.remove("active");
    document.getElementById("inicio").classList.add("opt-success");
    document.getElementById("inicio").disabled = true;
    document.getElementById("boleteria").classList.add("active");
    document.getElementById("boleteria").disabled = false;
    document.getElementById("contenido").innerHTML = divBoleteria;
    document.getElementById("contenido").style = `height: 80vh;`;
}


// funcion que se encarga de validar los campos del formulario
function validarBoleteria() {
    let valido = true;
    origen = document.getElementById("origen");
    destino = document.getElementById("destino");
    hora = document.getElementById("hora");
    cantidad = document.getElementById("cantidad")
    fechaViaje = document.getElementById("dia")
    if (parseInt(cantidad.value) < 1 || parseInt(cantidad.value) > parseInt(cantidad.max)) {
        valido = false;
        cantidad.classList.add("error-form")
    } else {
        cantidad.classList.remove("error-form")
    }
    if (origen.value == "0") {
        valido = false;
        origen.classList.add("error-form")
    } else {
        origen.classList.remove("error-form")
    }
    if (destino.value == "0") {
        valido = false;
        destino.classList.add("error-form")
    } else {
        destino.classList.remove("error-form")
    }
    if (hora.value == "0") {
        valido = false;
        hora.classList.add("error-form")
    } else {
        hora.classList.remove("error-form")
    }
    return valido;
}

// si los campos estan validados correctamente, genera los asientos
function boleteria() {
    if (validarBoleteria()) {
        numBoleto = parseInt(cantidad.value);
        document.getElementById("boleteria").classList.remove("active");
        document.getElementById("boleteria").classList.add("opt-success");
        document.getElementById("boleteria").disabled = true;
        document.getElementById("asientos").classList.add("active");
        document.getElementById("asientos").disabled = false;
        seleccionados = [];
        generarAsientos();
    }
}

// funcion que se encarga de determinar que asientos estan libres u ocupados
// los asientos ocupados son los que previamente se trajeron de la base de datos
function generarAsientos() {
    genAsientos = '';
    let src;
    for (let i = 1; i <= numAsientos; i++) {
        if (ocupados.lastIndexOf(i) == -1) {
            if (seleccionados.lastIndexOf(i) == -1) {
                src = "../Images/libre.png";
            } else {
                src = "../Images/seleccionado.png"
            }
            genAsientos += `<div class="col-2"><img width="50px" id= "img${i}" onclick="cambiarAsiento(${i})" src=${src}></div>`;
        } else {
            genAsientos += `<div class="col-2"><img width="50px" src="../Images/ocupado.png"></div>`;
        }
        if (i % 2 == 0) {
            if (i % 4 == 0) {
                genAsientos += `</div><div class="row">`;
            } else {
                genAsientos += `<div class="col-1"></div>`;
            }
        }
    }
    document.getElementById("contenido").innerHTML = `
    <div">
        <h1 style="text-align: center;">Seleccione su Asiento</h1>
        <h3 style="text-align: center;">Seleccione ${numBoleto} asientos</h3>
        <div class="row">
            <div class="col-6">
                <div class = "bg-bus-tp"></div>
                <div class = "bg-bus-md">
                    <div class="row">
                        ${genAsientos}
                    </div>
                </div>
                <div class = "bg-bus-lw"></div>
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="card col-12" style="width: 18rem;" style="padding:0">
                        <img class="card-img-top" width="50px" src="../Images/instrucciones.jpg" alt="Card image cap">
                    </div>
                </div>

            </div>
            </div>
        </div>
    </div>
    <br>
    <button style="margin-left: 40%;" onclick="cancelar()" type="button" class="btn btn-secondary">Cancelar</button>
    <button style="margin-left: 10px;" onclick="asientos()" type="button" class="btn btn-success">Continuar</button>
`;
    document.getElementById("contenido").style = `height: ${90+12.5*Math.floor(numAsientos/4)}vh;`;
}


// funcion que cambia de asiento libre a seleccionado y viceversa
// adenas de guardar la posicion y cantidad de seleccionados que lleva al momento
function cambiarAsiento(indice) {
    let asiento = document.getElementById(`img${indice}`);
    if (asiento.getAttribute("src") == "../Images/libre.png") {
        if (numBoleto > 0) {
            asiento.src = "../Images/seleccionado.png";
            numBoleto -= 1;
            seleccionados.push(indice);
        }
    } else {
        asiento.src = "../Images/libre.png";
        numBoleto += 1;
        seleccionados.splice(seleccionados.lastIndexOf(indice), 1);
    }
}

// Muestra un resumen de los datos del viaje antes de finalizar la compra
function asientos() {
    if (numBoleto == 0) {
        document.getElementById("asientos").classList.remove("active");
        document.getElementById("asientos").classList.add("opt-success");
        document.getElementById("asientos").disabled = true;
        document.getElementById("confirmacion").classList.add("active");
        document.getElementById("confirmacion").disabled = false;
        document.getElementById("contenido").innerHTML = `
        <div style=" height: 60vh;">
            <h1 style="text-align: center ">Confirmacion y Pago</h1>  
                <div class="ml-5">
                <table class="table table-borderless" style="color:white">
                 <tbody>
                <tr>
                <td> <Label>Origen:          ${arrayOrigenes[parseInt(origen.value)-1].nombre}</Label></td>
                <td> <Label>Destino:         ${arrayDestinos[parseInt(destino.value)-1].nombre}</Label></td>
                </tr>
                <tr>
                <td><Label>Fecha de Compra: ${fechaString(hoy)}</Label></td>
                <td> <Label>Fecha de Viaje:  ${fechaViaje.value}</Label></td>
                </tr>
                <tr>
                <td> <Label>Hora Salida:     ${arrayHorarios[parseInt(hora.value)-1].horaSalida}</Label></td>
                <td> <Label>Precio Boleto:   ${arrayHorarios[parseInt(hora.value)-1].precio}</Label></td>
                </tr>
                <tr>
                <td> <Label>Cantidad:        ${cantidad.value}</Label></td>
                <td>  <Label>Asientos seleccionados: ${seleccionados}</Label></td>
            </tr>
                <tr>
                <td colspan="2"> <Label>Total a Pagar:   ${arrayHorarios[parseInt(hora.value)-1].precio*seleccionados.length}</Label></td>
            
                </tr>
            </tbody>
            </table>           
                
            </div>
        </div>
        <button style="margin-left: 40%;" onclick="cancelar()" type="button" class="btn btn-secondary">Cancelar</button>
        <button style="margin-left: 10px;" onclick="guardar()" type="button" class="btn btn-success">Continuar</button>
        `;
        document.getElementById("contenido").style = "height: 100vh;";
    }
}
