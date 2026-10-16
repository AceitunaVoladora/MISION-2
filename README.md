# MISION-2

## Uso de IA - Claude

prompt:

"si tengo un proyecto de una pagina web en vite con una api de itunes, en que archivo puedo cambiar el tamaño de la portada de un album o una cancion. mis archivos son: main.js, api-itunes.js, logica.js, render.js, index.html y style.css"

Me dio dos resultados, la resolución de la imagen o el tamaño visual. Opte por la solución que aumentaba la resolución, que modificaba el render.js o logica.js, le pase ambos bloques de código:

```javascript
const NORMALIZADOR ={
    cancion: (r) => ({
        id: r.trackId,
        titulo: r.trackName,
        subtitulo: `${r.artistName} - ${r.collectionName ?? "Single"}`,
        imagen: r.artworkUrl100,            
        preview: r.previewUrl,
        duracion: r.trackTimeMillis,
        genero: r.primaryGenreName ?? "Desconocido",
        url: r.trackViewUrl,
    }),
    artista: (r) => ({
        id: r.artistId,
        titulo: r.artistName,
        subtitulo: r.primaryGenreName ?? "Artista",
        imagen: null,
        preview: null,
        duracion: 0,
        genero: null,
        url: r.artistLinkUrl,
    }),
    album: (r) => ({
        id: r.collectionId,
        titulo: r.collectionName,
        subtitulo: `${r.artistName} - ${r.trackCount ?? "?"} canciones`,
        imagen: r.artworkUrl100,
        preview: null,
        duracion: 0,
        genero: r.primaryGenreName ?? "Desconocido",
        url: r.collectionViewUrl,
    }),
};

export function presentarResultados(resultados, tipo){
    const normalizar = NORMALIZADOR[tipo];

    //prompt?
    //despues de map se cambian los nombres a los que hay en NORMALIZADOR ej: trackId -> id
    //filter quita los resultados que no nos interesan pq faltan datos (en mi caso el id y el titulo/nombre)
    return resultados.map(normalizar).filter((item) => item.id && item.titulo);
}
```

```javascript
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
```

Concluyó que para hacerlo habría que modificar "logica.js", pero repetía código así que inquirí por si había una forma mejor y elegí la que me pareció más optima:

"cancion: (r) => ({
    // ...
    imagen: r.artworkUrl100?.replace("100x100", "600x600"),
    // ...
}),
album: (r) => ({
    // ...
    imagen: r.artworkUrl100?.replace("100x100", "600x600"),
    // ...
}),

pero aqui repites codigo, no hay forma de hacerlo para todos por igual?"

Finalmente, me dio este trozo de código que fue el que decidí implementar:

```javascript
.map((item) => ({
    ...item,
    imagen: item.imagen?.replace("100x100", `${TAMANO_PORTADA}x${TAMANO_PORTADA}`) ?? null,
}))
```

## AUTOPSIA

decision de no usar attribute 

normalizadores en lugar de usar ifs o switch