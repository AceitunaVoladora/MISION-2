export function mostrarMensaje(contenedor, texto, clase = ""){
    contenedor.replaceChildren(); //quita todo lo que habia antes 
    
    const p = document.createElement("p");
    p.textContent = texto;
    p.className = `mensaje ${clase}`.trim();
    contenedor.append(p);
}

export function ponerResultados(contenedor, items){
    contenedor.replaceChildren(...items.map(crearTarjeta)); //... spread, le da a replaceChildren las tarjetas sueltas
}

function crearTarjeta(item){
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    if(item.imagen){
        const img = document.createElement("img");
        img.src = item.imagen;
        img.alt = `Portada de ${item.titulo}`;
        tarjeta.append(img);
    }

    const titulo = document.createElement("h3");
    titulo.textContent = item.titulo;

    const subtitulo = document.createElement("p");
    subtitulo.textContent = item.subtitulo;

    tarjeta.append(titulo, subtitulo);

    if(item.preview){
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = item.preview;
        tarjeta.append(audio);
    }

    return tarjeta;
}