// Creo la clase persona
class Persona {
  constructor(nombre, mail, cel) {
    this.nombre = nombre;
    this.mail = mail;
    this.cel = cel;
  }
}

// Creo la clase Servicio
class Servicio{
  constructor(nombre,precioFoto,precioCambio,indice){
    this.nombre = nombre,
    this.precioFoto = precioFoto,
    this.precioCambio = precioCambio,
    this.indice = indice,
    this.cantFotos = 0,
    this.cantCambios = 0,
    this.total = 0
  }
  cargarServicioStorage(storageName, index, cantFotos, cantCambios){
    let servicios = JSON.parse(sessionStorage.getItem(storageName));
    let servicioSeleccionado = servicios.find(x => x.indice == index);
    this.nombre = servicioSeleccionado.nombre;
    this.precioFoto = servicioSeleccionado.precioFoto;
    this.precioCambio = servicioSeleccionado.precioCambio;
    this.indice = servicioSeleccionado.indice;
    this.cantFotos = cantFotos;
    this.cantCambios = cantCambios;
    this.calcularTotal();
  }
  calcularTotal(){
    this.total = (this.cantCambios * this.precioCambio) + (this.precioFoto * this.cantFotos);
  }
}
// Creo la clase presupuesto
class Presupuesto{
  constructor(persona,servicios){
    this.persona = persona,
    this.servicios = servicios
  }
  cargarDatosStorage(storageName){
    let presupuestoStorage = JSON.parse(sessionStorage.getItem(storageName));
    this.persona = presupuestoStorage.persona;
    this.servicios = presupuestoStorage.servicios;
  }
  calcularPresupuesto(){
    let total = 0;
    for (const servicio of this.servicios) {
      total += servicio.total;
    }
    return total;
  }
}

// Obtengo los servicios desde el archivo JSON y seteo los datos en el DOM y el SessionStorage
function setearServicios(){
  let servicios = [];
  $.getJSON("../data/servicios.json",function(respuesta,estado){
    if(estado == "success"){
      for (const servicio of respuesta.servicios) {
        servicios.push(servicio);
        let option = '<option value="'+servicio.indice+'">'+servicio.nombre+'</option>';
        $('#servicios').append(option);
      }
      sessionStorage.setItem("servicios",JSON.stringify(servicios));
    }
  });
}

// Guardo los datos ingresados de la persona
function guardarPersona(){
  let nombrePersona = $('#nombre').val();
  let mailPersona = $('#mail').val();
  let celPersona = $('#telefono').val();
  let persona = new Persona(nombrePersona,mailPersona,celPersona);
  return persona;
}

// Guardo el servicio y las opciones elegidas en el sessionStorage
function guardarServicio(persona){
  
  let presupuesto = new Presupuesto(persona, []);
  let servicioElegido = new Servicio();
  servicioElegido.cargarServicioStorage('servicios',$("#servicios").val(),Number($('#cantFotos').val()),Number($('#cantCambios').val()));
  
  if (sessionStorage.getItem('presupuestoActual')==null){
    presupuesto.servicios.push(servicioElegido);
    sessionStorage.setItem('presupuestoActual',JSON.stringify(presupuesto));
  }
  else{
    let presupuestoTemp = JSON.parse(sessionStorage.getItem('presupuestoActual'));
    presupuestoTemp.servicios.push(servicioElegido);
    sessionStorage.setItem('presupuestoActual',JSON.stringify(presupuestoTemp));
  }
}

// Agrego servicios relacionados con la persona
$('document').ready(function(){
  sessionStorage.clear();
  setearServicios();
});

// Seteo eventos de los botones
$('#btnAgregar').click(function(e){
  // Cargo datos desde el local storage
  e.preventDefault();
  $('#divPrint').empty();
  $('#divPrint').addClass("divOk");
  let persona = guardarPersona();
  guardarServicio(persona);
  $('#divPrint').append('<p>Presupuesto agregado ✔</p>');
  $('#divPrint').fadeIn(500).delay(1000).fadeOut(500);

});

$('#btnCalcular').click(function(e){
  // Muestro la informacion procesada a traves de DOM consultando al sessionStorage
  e.preventDefault();
  $('#divPrint').empty();
  $('#divPrint').removeClass("divOk");
  let presupuestoActual = new Presupuesto();
  presupuestoActual.cargarDatosStorage('presupuestoActual');

  $('#divPrint').append(`<h2>${presupuestoActual.persona.nombre} tus presupuestos son los siguientes:</h2>`);
  
  // Escribo la lista de servicios
  $('#divPrint').append('<ul>');
  presupuestoActual.servicios.forEach(element => {
    let listaPresupuestos = '<li>';
    listaPresupuestos += element.nombre + " con " + element.cantFotos + " fotos y " + element.cantCambios + " cambios: $ " + element.total;
    listaPresupuestos += '</li>';
    $('#divPrint').append(listaPresupuestos);
  });
  $('#divPrint').append('</ul>');

  let total = presupuestoActual.calcularPresupuesto();
  $('#divPrint').append(`<h3>Total en pesos: $${total}</h3>`);
  // Llamado AJAX para convertir pesos a dolares
  $.get("https://api.exchangerate.host/convert?from=ARS&to=USD&amount=" + total, function(respuesta,estado){
    if (estado == "success"){
      $('#divPrint').append(`<h4>Total en dólares: $${respuesta.result}(*)</h4>`);
      $('#divPrint').append(`<p>*Tomando como valor de referencia $${1 / Number(respuesta.info.rate)} cada dólar.</p>`);
    }
  });
  $('#divPrint').append("<p>Te estaremos enviando un mail a " + presupuestoActual.persona.mail + " con el detalle. Ademas, te llamaremos al " + presupuestoActual.persona.cel + " para coordinar una entrevista.</p>");
  $('#divPrint').addClass("divPrint");
  $('#divPrint').slideDown(500);
});