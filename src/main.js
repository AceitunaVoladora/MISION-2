import './style.css'
import { buscarContenido } from './api-itunes';

const tipoBusqueda = document.querySelector("#tipo-busqueda");
const contenidoBusqueda = document.querySelector("#contenido-busqueda");
const botonBusqueda = document.querySelector("#boton-busqueda");
const resultado = document.querySelector("#resultado");

async function realizarBusqueda() {
  const termino = contenidoBusqueda.value.trim();
  const tipo = tipoBusqueda.value;
  
  //para no buscar si no hay nada
  if(termino === ""){
    resultado.textContent = "Busca algo...";
    return;
  }

  resultado.textContent = "Buscando...";

  try{
    const datos = await buscarContenido(termino, tipo);

    console.log(datos);

    resultado.textContent = `Hemos encontrado ${datos.length} resultados`;
  }catch(error){
    console.error(error);
    resultado.textContent = "Ha habido un error con la consulta."
  }
}

botonBusqueda.addEventListener("click", realizarBusqueda);

contenidoBusqueda.addEventListener("keydown", (e) =>{
  if(e.key === "Enter"){
    realizarBusqueda();
  }
});