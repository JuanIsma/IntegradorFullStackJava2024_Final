
const key = "192e0b9821564f26f52949758ea3c473";



document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPelicula = urlParams.get('id');

    // Cargar los detalles de la película
    cargarDetallesPelicula(idPelicula);
});


const cargarDetallesPelicula = async (id) => {
    try {
        const respuesta = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=es-MX`
        );

        if (respuesta.status === 200) {
            const pelicula = await respuesta.json();
            mostrarDetallesPelicula(pelicula);
        } else {
            console.log("Hubo un error al cargar los detalles de la película");
        }
    } catch (error) {
        console.log(error);
    }
};



 

const mostrarDetallesPelicula = (pelicula) => {
    const detallePelicula = document.getElementById("detallePelicula");
    // Obtener el nombre del primer género en el array de géneros
    const primerGenero = pelicula.genres[0].name;
    // Construir el HTML con los detalles de la película
    const htmlDetalle = `
 
    <div class="detallepeliculainfo">
 
    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
    <div class="detallepeliculainfo-text">
    <div class="detallepeliculatitulo"><p><strong>Ver Película:</strong> ${pelicula.title}</p></div>
    <div class="reproductor"   id="otro-contenedor">
    <video controls  id="videoPlayer">
    <source src="https://dl.dropboxusercontent.com/scl/fi/pv1s8bgbgmm5tl5wky9ag/Metro-Goldwyn-Mayer-Intro-HD-mp4-on-Vimeo.mp4?rlkey=o6czi30db6vb57szfpeya7dyo&st=v5qw2ga0&dl=0" type="video/mp4">
    Tu navegador no soporta el elemento de video.
    </video>
    </div>
        <p id="info-peli"><strong>Género:</strong> ${primerGenero}</p>
        <p><strong>Duración:</strong> ${pelicula.runtime} minutos</p>
        <p><strong>Fecha de Lanzamiento:</strong> ${pelicula.release_date}</p>
        <p><strong>Sinopsis:</strong> ${pelicula.overview}</p>
        <p><strong>Popularidad:</strong> ${pelicula.popularity}</p>
        <p><strong>Total de Votos:</strong> ${pelicula.vote_count}</p>
  
    </div>
</div>
 
        <!-- Agrega más detalles según tus necesidades -->
    `;
    // Insertar el HTML en el elemento detallePelicula
    detallePelicula.innerHTML = htmlDetalle;
   
};




// Obtener todas las imágenes de películas (por ejemplo, usando un selector de clase)
const imagenesPelicula = document.querySelectorAll('.poster');

// Agregar un evento de clic a cada imagen de película
imagenesPelicula.forEach((imagen) => {
    imagen.addEventListener('click', () => {
        // Obtener el ID de la película del atributo data-id de la imagen
        const idPelicula = imagen.dataset.id;
        // Redireccionar a la página detalle.html con el ID de la película como parámetro en la URL
        window.location.href = `./pages/detalle.html?id=${idPelicula}`;
    });
});



   // *** Subir pagina hacia arriba al dar un evento click ***
document.querySelector('.flechaArriba').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  });