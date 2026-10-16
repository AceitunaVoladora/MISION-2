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
    //map((item) => ({ ...item, imagen: item.imagen?.replace("100x100", "300x300") ?? null }))
    return resultados.map(normalizar).filter((item) => item.id && item.titulo);
}