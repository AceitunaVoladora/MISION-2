const URL_API = "https://itunes.apple.com/search";

const ENTIDADES = {
    camcion: "song",
    artista: "musicArtist",
    album: "album"
}

export async function buscarContenido(termino, tipo){
    const entity = ENTIDADES[tipo];
    if (!entity) throw new Error(`Tipo de búsqueda no válido: ${tipo}`);
    
    const url = new URL(URL_API);

    url.search = new URLSearchParams({
        term: termino,
        media: "music",
        entity,
        limit: "20",
        country: "ES"
    });

    const respuesta = await fetch(url);

    if(!respuesta.ok){
        throw new Error("No se pudo obtener las canciones");
    }

    const datos = await respuesta.json();

    return datos.results;
}