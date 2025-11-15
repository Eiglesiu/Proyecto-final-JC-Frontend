const apiKey = "AIzaSyBQP7UilGnpmvUoApPzbJvyNd9OnXx6tj0";

async function buscarTrailer(titulo) {
  // 1. Primero revisar si ya lo tenemos guardado
  const cacheKey = `trailer_${titulo}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    console.log("Trailer encontrado en caché:", titulo);
    return cached; // Retornamos el videoId guardado
  }

  // 2. Si no está en caché, buscarlo en YouTube
  console.log("Buscando trailer en YouTube:", titulo);
  const query = encodeURIComponent(`${titulo} trailer`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.items?.length > 0) {
      const videoId = data.items[0].id.videoId;
      
      // 3. Guardar en localStorage para la próxima vez
      localStorage.setItem(cacheKey, videoId);
      console.log("Trailer guardado en caché");
      
      return videoId;
    }
    return null;
  } catch (error) {
    console.error("Error buscando trailer:", error);
    return null;
  }
}


export default buscarTrailer;