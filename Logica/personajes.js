

const ApiRM = 'https://rickandmortyapi.com/api/character';
let urlPagina = "https://rickandmortyapi.com/api/character";

/*--------------------creacion de tarjetas y grilla---------------------- */
const contenedor = document.querySelector('.container');

const crearTarjeta = () => {  //tarjeta de personajes
 let tarjeta = document.createElement('div');
 let imagenTarjeta = document.createElement('img');
 let cuerpoTarjeta = document.createElement('div');
 let nombrePersonaje = document.createElement('a');
 let spanNombrePersonaje = document.createElement('span');
 //asigno clases
 tarjeta.className = "card col-sm col-md col-lg p-0 m-3";
 tarjeta.style = "width: 18rem;";
 imagenTarjeta.className = "card-img-top character";
 cuerpoTarjeta.className = "card-body personaje";
 nombrePersonaje.className = "personaje__link";
 nombrePersonaje.href = "#";
 spanNombrePersonaje.className = "personaje__nombre";
 //asigno hijos
 tarjeta.append(imagenTarjeta, cuerpoTarjeta);
 cuerpoTarjeta.appendChild(nombrePersonaje);
 nombrePersonaje.appendChild(spanNombrePersonaje);
 return tarjeta
}

const crearFila = () => {
 let fila = document.createElement('div');
 fila.className = "row";
 return fila
}

//creo filas, las recorro y les agrego 5 tarjetas
const recorrerYAgregarTarjetas = () => {
 for (let i = 0; i < 4; i++) {
 let fila = crearFila();
 contenedor.appendChild(fila);
 for (let j = 0; j < 5; j++) {
  let tarjeta = crearTarjeta();
  fila.appendChild(tarjeta);
  }
 }
}
recorrerYAgregarTarjetas();

/*-------------------------tratamiento de Api y datos asociados--------------------------*/
// const botones = document.querySelector('.boton'); creo que esto no sirve
let cantidadDePaginas;

const tarjetas = document.querySelectorAll('.card');
const imagenes = document.querySelectorAll('.character');
const nombres = document.querySelectorAll('.personaje__nombre');
const linkPersonajes = document.querySelectorAll('.personaje__link');
const botonSiguiente = document.querySelector('.btnSiguiente');
const botonAnterior = document.querySelector('.btnAnterior');

//funcion para accder al personaje especifico y toda la info relacionada
const accederPersonajeEspecifico = (url) => {
 fetch(url)
 .then(res => res.json())
  .then(data => {
   for (let i = 0; i < linkPersonajes.length; i++) {
   linkPersonajes[i].addEventListener('click', (e) => {
    let datos = data.results[i];
    console.log(datos);
    localStorage.setItem('personajeEspecifico', JSON.stringify(datos));
    linkPersonajes[i].href = 'personaje-especifico.html';
    window.location(`${linkPersonajes[i].href}`);
    e.preventDefault();
    }); 
   }
  })
}

//se inserta los personajes por primera vez
fetch(ApiRM)
 .then(res => res.json())
 .then(data => {
  for (let i = 0; i < tarjetas.length; i++) {
   imagenes[i].src = data.results[i].image;
   imagenes[i].className = 'img-fluid';
   nombres[i].textContent = data.results[i].name;
  }
  cantidadDePaginas = data.info.pages; //recupero la cant de pags para la paginacion
  localStorage.setItem('nroPagina','1') //inicializo para poder el valor y seguir con la paginacion
})
accederPersonajeEspecifico(ApiRM);

//funcion para insertar imagenes y nombre
const paginacion = async (url) => {
 const resp = await fetch(url);
 const resultado = await resp.json();
 for (let i = 0; i < imagenes.length; i++) {
  if (resultado.results[i]==undefined) {
   imagenes[i].src = '';
   nombres[i].textContent = '';
  }
  else {
   imagenes[i].src = resultado.results[i].image;
   imagenes[i].className = 'img-fluid';
   nombres[i].textContent = resultado.results[i].name;
  }
 }
}

//evento del boton siguiente
let contadorPaginacion = 1;
botonSiguiente.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('nroPagina'))) <= cantidadDePaginas) {
  contadorPaginacion++;
  localStorage.setItem('nroPagina', JSON.stringify(contadorPaginacion));
  let nuevaPagina = `${urlPagina}?page=${contadorPaginacion}`;
  console.log(`contador siguiente: ${contadorPaginacion}`);
  paginacion(nuevaPagina);
  accederPersonajeEspecifico(nuevaPagina);
 }
 else {
  alert('no hay mas paginas siguientes');
 }
})

//evento del boton anterior
botonAnterior.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('nroPagina'))) > 0) {
  let paginaActual = JSON.parse(localStorage.getItem('nroPagina'));
  contadorPaginacion = parseInt(paginaActual);
  contadorPaginacion--;
  localStorage.setItem('nroPagina', JSON.stringify(contadorPaginacion));
  console.log(`contador anterior: ${contadorPaginacion}`);
  let paginaAnterior = `${urlPagina}?page=${contadorPaginacion}`;
  paginacion(paginaAnterior);
  accederPersonajeEspecifico(paginaAnterior);
 }
 else {
  alert('no hay mas paginas anteriores');
 }
})

/*--------------------------busqueda de personaje------------------------------- */

let botonBuscarPersonaje = document.querySelector('.buscador__btn');
botonBuscarPersonaje.href = "#";
let nombrePersonajeParaBuscar = document.querySelector('.buscador__input');
botonBuscarPersonaje.addEventListener('click', () => {
 localStorage.setItem('personajeBuscado', JSON.stringify(nombrePersonajeParaBuscar.value));
 botonBuscarPersonaje.href = "personaje-buscado.html";
 window.location(`${botonBuscarPersonaje.href}`);
})






















//funcion para accder al personaje especifico y toda la info relacionada
// fetch(ApiRM)
//  .then(res => res.json())
//  .then(data => {
//   for (let i = 0; i < linkPersonajes.length; i++) {
//   linkPersonajes[i].addEventListener('click', (e) => {
//    let datos = data.results[i];
//    window.open('./personaje-especifico.html');
//    console.log(datos);
//    localStorage.setItem('personajeEspecifico', JSON.stringify(datos));
//    e.preventDefault();
//   }); 
//  }
// })










// const personajeEspecifico = async (ApiRM) => {
//  const resp = await fetch(ApiRM);
//  const resultado = await resp.json();
//  for (let i = 0; i < linkPersonajes.length; i++) {
//   linkPersonajes[i].addEventListener('click', () => {
//    let datos = resultado.results[i];
//    localStorage.setItem(JSON.stringify(datos))
//   }); 
//  }
// }
// personajeEspecifico();



