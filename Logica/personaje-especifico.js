
let datosPersonajeEspecifico = JSON.parse(localStorage.getItem('personajeEspecifico'));
console.log(datosPersonajeEspecifico)

let imagen = document.querySelector('img');
let nombrePersonaje = document.querySelector('.nombre');
let statusPersonaje = document.querySelector('.status');
let speciesPersonaje = document.querySelector('.species');
let genderPersonaje = document.querySelector('.gender');
let originPersonaje = document.querySelector('.origin');
let locationPersonaje = document.querySelector('.location');

imagen.src = datosPersonajeEspecifico.image;
nombrePersonaje.textContent = `Nombre: ${datosPersonajeEspecifico.name}`;
statusPersonaje.textContent = `Status: ${datosPersonajeEspecifico.status}`;
speciesPersonaje.textContent = `Specie: ${datosPersonajeEspecifico.species}`;
genderPersonaje.textContent = `Genero: ${datosPersonajeEspecifico.gender}`;
originPersonaje.textContent = `${datosPersonajeEspecifico.origin.name}`;
locationPersonaje.textContent = `${datosPersonajeEspecifico.location.name}`;
/*----------------------------------------------------------------------------------------*/

//elementos de la maquetacion para mostrar la lista de episodios
let contenedorLinksEpisodios = document.querySelector('.links-episodios');

const crearLinkEpisodio = () => {
 let link;
 link = document.createElement('a');
 link.className = 'link-episodio mt-1'; //solo para la creacion de las columnas
 return link
}

//tratamiento para mostrar episodios
let columnas = document.querySelectorAll('.col');

let vectorUrlEpisodios = [];
vectorUrlEpisodios = datosPersonajeEspecifico.episode;

//recorro las columnas y dentro, creo las etiquetas <a></a>
for (let i = 0; i < columnas.length; i++) {
 for (let j = 0; j < 20; j++) {
  let link = crearLinkEpisodio();
  columnas[i].appendChild(link);
 }
}
//selecciono las etiquetas <a> (me devolvera un vector)
let etiquetasA = document.querySelectorAll('.link-episodio');

const cargarCapitulosPersonajeEspecifico = async () => {
 for (let i = 0; i < vectorUrlEpisodios.length; i++) {
  const resp = await fetch(vectorUrlEpisodios[i]);
  const resultado = await resp.json();
  etiquetasA[i].textContent = resultado.name;
  etiquetasA[i].href = '#';
  //agrego evento para acceder a episodio
  etiquetasA[i].addEventListener('click', () => {
   localStorage.setItem('episodioEspecifico', JSON.stringify(resultado));
   etiquetasA[i].href = "episodio-especifico.html";
   window.location(`${etiquetasA[i].href}`);
  })
 }
}
cargarCapitulosPersonajeEspecifico()

/*------------- acceder a episodios del personaje especifico ------------*/























/*----------------------------------------------------------- */
//estop hacia lo del metodo de la linea 52 pero tiraba mas errores
// for (let i = 0; i < etiquetasA.length; i++) {
//   fetch(vectorUrlEpisodios[i])
//   .then(res => res.json())
//    .then(data => {
//     etiquetasA[i].textContent = data.name;
//     etiquetasA[i].href = '#';
//   })
// }
/*----------------------------------------------------------- */
















