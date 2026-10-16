import './style.css'
import { buscarContenido } from './api-itunes.js';
import { presentarResultados } from './logica.js';
import { mostrarMensaje, ponerResultados } from './render.js';

const tipoBusqueda = document.querySelector("#tipo-busqueda");
const contenidoBusqueda = document.querySelector("#contenido-busqueda");
const botonBusqueda = document.querySelector("#boton-busqueda");
const resultado = document.querySelector("#resultado");

async function realizarBusqueda() {
  const termino = contenidoBusqueda.value.trim();
  const tipo = tipoBusqueda.value;
  
  //para no buscar si no hay nada
  if(termino === ""){
    mostrarMensaje(resultado, "Busca algo...");
    return;
  }

  mostrarMensaje(resultado, "Buscando...");

  try{
    const datos = await buscarContenido(termino, tipo);
    const items = presentarResultados(datos, tipo);

    if(items.length === 0){
      mostrarMensaje(resultado, `Sin resultados para "${termino}".`)
    }

    ponerResultados(resultado, items);
  }catch(error){
    console.error(error);
    mostrarMensaje(resultado, "Ha habido un error con la consulta.")
  }
}

botonBusqueda.addEventListener("click", realizarBusqueda);

contenidoBusqueda.addEventListener("keydown", (e) =>{
  if(e.key === "Enter"){
    realizarBusqueda();
  }
});