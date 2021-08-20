/* Desafío Clase 6 + Desafío Complementario + 1° Entrega Proyecto Final

// Creo la clase persona
class Persona {
  constructor(nombre, apellido, edad, mail, cel) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.mail = mail;
    this.cel = cel;
    this.presupuestos = [];
  }
}

// Pido los datos personales mediante prompt a la persona
const nombrePersona = prompt("Ingrese su nombre: ");
const apellidoPersona = prompt("Ingrese su apellido: ");
const edadPersona = Number(prompt("Ingrese su edad: "));
const mailPersona = prompt("Ingrese su email: ");
const celPersona = Number(prompt("Ingrese su numero de telefono: "));

// Guardo los datos ingresados por la persona
const personaCreada = new Persona(
  nombrePersona,
  apellidoPersona,
  edadPersona,
  mailPersona,
  celPersona
);

// Doy la bienvenida a la persona mediante un alert
alert("Bienvenid@" + " " + personaCreada.nombre + "!");

// Muestro en consola los datos de la/s personas
console.log(personaCreada);

// Creo la clase presupuesto
class Presupuesto {
  constructor(cantFotos, cantCambios) {
    this.cliente = personaCreada.nombre;
    this.precioFoto = 5;
    this.precioSesion = 2;
    this.cantFotos = Number(cantFotos);
    this.cantSesiones = Number(cantCambios);
  }

  totalBook() {
    return (
      (this.precioFoto * this.cantFotos) + (this.cantSesiones * this.precioSesion)
    );
  }

  toString() {
    return `Tu presupuesto por ${this.cantFotos} fotos y ${this.cantSesiones} sesiones es de $ ${this.totalBook()}.`;
  }
}

// Pido los datos para determinar el presupuesto
let cantFotos = prompt("Ingrese Cantidad de Fotos: ");
let cantSesiones = prompt("Ingrese Cantidad de Sesiones: ");

// Guardo los datos ingresados para el presupuesto
let presupuestoNuevo = new Presupuesto(cantFotos, cantSesiones);
personaCreada.presupuestos.push (presupuestoNuevo);

// Consulto si desea obtener otro presupuesto o salir
let opcion = prompt(
  "Desea obtener otro presupuesto personalizado?\nPresione 1 para continuar o Enter para salir."
);

// Si desea otro presupuesto, vuelvo a pedir los parametros y pusheo un nuevo presupuesto
while (opcion === "1" && personaCreada.presupuestos.length < 4) {
  cantFotos = prompt("Ingrese Cantidad de Fotos: ");
  cantSesiones = prompt("Ingrese Cantidad de Sesiones: ");

  presupuestoNuevo = new Presupuesto (cantFotos, cantSesiones);
  personaCreada.presupuestos.push (presupuestoNuevo);

  opcion = prompt(
    "Desea obtener otro presupuesto personalizado?\nPresione 1 para continuar o Enter para salir."
  );
}

// Muestro a la persona, y por consola, su presupuesto
let mensaje = ("Hola" + " " + personaCreada.nombre);

for (const presupuesto of personaCreada.presupuestos.sort()) {
  mensaje += "\n" + presupuesto.toString ();
}

//alert (mensaje);
console.log(mensaje);

// Desafio Clase 8

let parrafo1 = document.createElement ("p");
parrafo1.textContent = mensaje;

let cajaHtml = document.getElementById ("js");
cajaHtml.appendChild (parrafo1);

cajaHtml.style.backgroundColor = "#FFE268";
cajaHtml.style.textAlign = "center";
*/

// Desafio Clase 9

// Creo la clase persona
class Persona {
  constructor(nombre, mail, consulta) {
    this.nombre = nombre;
    this.mail = mail;
    this.consulta = consulta;
  }
}

// Creo la variable para el boton
let botonFormulario = document.getElementById ("formu");
let personas = [];

// Eventos
function clase9 (e) {

  // Elimino el comportamiento por defecto del submit
  e.preventDefault();

  // Traigo los datos de la persona a traves del form
  let nombre = document.getElementById("nombreApellido").value;
  let mail = document.getElementById("mail").value;
  let consulta = document.getElementById("floatingTextarea").value;

  // Guardo los datos del usuario
  personas.push (new Persona (nombre, mail, consulta));

  // Muestro un cuadro en HTML mediante DOM
  let mensaje = "Hola " + nombre + "," + " gracias por escribirnos, en breve te enviaremos un mail a " + mail + ".";

  let parrafo1 = document.createElement ("p");
  parrafo1.textContent = mensaje;

  let cajaHtml = document.getElementById ("js");
  cajaHtml.appendChild (parrafo1);

  cajaHtml.style.backgroundColor = "#FFE268";
  cajaHtml.style.textAlign = "center";

  console.log(personas);
  localStorage.setItem ("cliente", JSON.stringify(personas));
}

// Creo el evento para el boton
botonFormulario.addEventListener ("submit",clase9);