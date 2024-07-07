

//================================================= API de Películas más Populares =========================================================================
const key = "192e0b9821564f26f52949758ea3c473";
// Función para truncar el texto a un máximo de caracteres
function mostrarTextoHasta(texto, maxCaracteres) {
    if (texto.length <= maxCaracteres) {
      return texto;
    }
    return texto.substring(0, maxCaracteres) + "...";
  }
  
  //====================================================================
  
  
  let pagina = 1;
  const btnAnterior = document.getElementById("btnAnterior");
  const btnSiguiente = document.getElementById("btnSiguiente");
  
  btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
      pagina += 1;
      cargarPeliculasPopulares();
    }
  });
  
  btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
      pagina -= 1;
      cargarPeliculasPopulares();
    }
  });
  
  
  //==========================================================================================================================
  
  // Cargar películas mas valoradas con paginación
  //  <h4 class="titulo2">${pelicula.overview}</h4>
  const cargarPeliculasPopulares = async () => {
    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=es-MX&page=${pagina}`
      );
  
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        console.log(datos);
        let peliculas = "";
  
        datos.results.forEach((pelicula) => {
          // Convertir la fecha de lanzamiento a un objeto Date
          let fechaLanzamiento = new Date(pelicula.release_date);
  
          // Obtener solo el año
          let añoLanzamiento = fechaLanzamiento.getFullYear();
  
          // Truncar el overview a un máximo de 20 caracteres
          const overviewTruncado = mostrarTextoHasta(pelicula.overview, 115);
          // Agregar el año al HTML , imagen y resumen
          peliculas += `
                      <div  class="pelicula carusel-item"  >
                          <h4 class="titulo2">${añoLanzamiento}</h4><br>
                          <a href="detalle.html?id=${pelicula.id}"  >
                          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt=${pelicula.title}   ></a>
                          <h3 class="tituloPelicula">${pelicula.title}</h3>
                          <h3 class="tituloResumen">${overviewTruncado}</h3>
                      </div>
   
                  `;
        });
  
         //Carga las películas dentro del html
        document.getElementById("peliculasonline").innerHTML = peliculas;
      } else if (respuesta.status === 401) {
        console.log("Pusiste la llave mal");
      } else if (respuesta.status === 404) {
        console.log("La película que buscas no existe");
      } else {
        console.log("Hubo un error y no sabemos qué pasó");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
   
  
  //==========================================================================================================================
   


  // Inicializa cargando las películas populares
  cargarPeliculasPopulares();
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    // Función para desplazar la página hacia arriba
    function desplazarArriba() {
      window.scrollBy(0, -2600); // Ajusta el valor -50 a la cantidad de píxeles que deseas desplazar hacia arriba
    }
  
    // Obtener los botones por su ID
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
  
    // Añadir evento de clic a los botones
    btnAnterior.addEventListener("click", desplazarArriba);
    btnSiguiente.addEventListener("click", desplazarArriba);
  });
  

  // *** Subir pagina hacia arriba al dar un evento click ***
document.querySelector('.flechaArriba').addEventListener('click', function(event) {
  event.preventDefault();
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});