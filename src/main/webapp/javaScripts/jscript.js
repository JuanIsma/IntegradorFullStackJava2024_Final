//======================================================= INICIO =====================================================================================

const key = "192e0b9821564f26f52949758ea3c473";
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGI2ZmZhZTNlMTUxYjc1ZDQ2NDQxN2M1YTJhZGJmNCIsInN1YiI6IjY2MjQzZmYxN2E5N2FiMDE3ZDhjYzgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5X3tBw3DNv7kd1Y92t2gSVejwDZorJAxxeMj9sYXR64';
const baseUrlImagen = 'https://image.tmdb.org/t/p/w500'; // URL base para las imágenes
let pagina = 1;

 
// *** Función para truncar el texto a un máximo de caracteres ***
function mostrarTextoHasta(texto, maxCaracteres) {
  if (texto.length <= maxCaracteres) {
    return texto;
  }
  return texto.substring(0, maxCaracteres) + "...";
}


//======================================== PELICULAS MAS VALORADAS ============================================================================

// *** Función para cargar películas populares con paginación ***
const cargarPeliculasPopulares = async () => {
  try {
      const respuesta = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=es-MX&page=${pagina}`
      );

      if (respuesta.status === 200) {
          const datos = await respuesta.json();
          let peliculas = "";

          datos.results.forEach((pelicula) => {
              let fechaLanzamiento = new Date(pelicula.release_date);
              let añoLanzamiento = fechaLanzamiento.getFullYear();
              const overviewTruncado = mostrarTextoHasta(pelicula.overview, 115);

              peliculas += `
             
                  <div class="pelicula grid-item ">           
                       <h4 class="titulo2">${añoLanzamiento}</h4><br>
                       <a href="./pages/detalle.html?id=${pelicula.id}"  >
                       <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt=${pelicula.title}   ></a>
                        <h3 class="tituloPelicula titulo">${pelicula.title}</h3>
                      <h3 class="tituloResumen titulo">${overviewTruncado}</h3>  
                       
                  </div>
              `;
          });
               //Dibuja los datos en el html
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


// *** Inicializa cargando las películas ***
cargarPeliculasPopulares();




// Función para cargar la página siguiente de películas populares
const paginaSiguiente = () => {
  pagina++;
  cargarPeliculasPopulares();
};

// Función para cargar la página anterior de películas populares
const paginaAnterior = () => {
  if (pagina > 1) {
      pagina--;
      cargarPeliculasPopulares();
  }
};

// Asignar los event listeners a los botones de siguiente y anterior
document.getElementById('botonSiguiente').addEventListener('click', paginaSiguiente);
document.getElementById('botonAnterior').addEventListener('click', paginaAnterior);


//=============================================================================================================================================









//================================================ BUSCAR PELICULA =============================================================================

 
document.getElementById('buscadorPeliculas').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    const consulta = document.getElementById('input-busqueda').value;
    const resultados = document.getElementById('resultados');
    const peliculasOnline = document.getElementById('peliculasonline');
    const textPelicula = document.getElementById('textPelicula');
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');

    if (consulta && consulta.trim() !== "") {
        cargarPeliculasAPI(consulta);
        resultados.style.display = 'block'; // Mostrar los resultados
        peliculasOnline.classList.add('oculto');
        textPelicula.classList.add('oculto');
        botonAnterior.classList.add('oculto');
        botonSiguiente.classList.add('oculto');
    } else {
        // Ocultar el contenedor de resultados si no se ingresa ninguna consulta
        resultados.style.display = 'none';
        // Mostrar el contenedor de películas populares si no se ingresa ninguna consulta
        peliculasOnline.classList.remove('oculto');
        textPelicula.classList.remove('oculto');
        botonAnterior.classList.remove('oculto');
        botonSiguiente.classList.remove('oculto');
    }
});


// *** Función para cargar películas desde la API con una consulta específica ***
const cargarPeliculasAPI = async (consulta) => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(consulta)}&include_adult=false&language=es-MX&page=1&api_key=${key}`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            mostrarResultados(datos);
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



// *** Función para mostrar los resultados de la búsqueda ***
function mostrarResultados(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpia los resultados anteriores

    if (data.results && data.results.length > 0) {
        data.results.forEach(pelicula => {
            const peliculaDiv = document.createElement('div');
            peliculaDiv.classList.add('pelicula');
            peliculaDiv.id = 'peliBuscada'; // Agrega el ID  
           
            const imagenSrc = pelicula.poster_path ? `${baseUrlImagen}${pelicula.poster_path}` : 'https://via.placeholder.com/100';
            const imagen = `<img src="${imagenSrc}" alt="${pelicula.title}" class="movie-poster">`;
            peliculaDiv.innerHTML = `
            <div class="movie-container">
            
               <article id="margenFotoBuscada">
               <a  href="./pages/detalle.html?id=${pelicula.id}"  >
               ${imagen}</article> </a>
               <aside> 
                 <h2 id="tituloPeliBuscada">${pelicula.title}</h2> 
                 <p id="peliResumen">${pelicula.overview}</p>
                 <p id="fechaLanzamiento"><strong>Fecha de lanzamiento:</strong> ${pelicula.release_date}</p>
                 <p id="puntuacion"><strong>Puntuación:</strong> ${pelicula.vote_average}</p>
                 <button id="botonTrailer" onclick="obtenerTrailer(${pelicula.id})">Ver Tráiler</button>
               </aside>
            </div>
            `;

            resultadosDiv.appendChild(peliculaDiv);
        });
    } else {
        resultadosDiv.innerHTML = '<p>No se encontraron resultados.</p>';
    }




    // *** Agrega un evento que escuche los cambios en el input. ***
    document.getElementById('input-busqueda').addEventListener('input', function(event) {
        const query = event.target.value.trim();
        const resultados = document.getElementById('resultados');
        const peliculasOnline = document.getElementById('peliculasonline');
        const textPelicula = document.getElementById('textPelicula');
        const botonAnterior = document.getElementById('botonAnterior');
        const botonSiguiente = document.getElementById('botonSiguiente');

        if (query === '') {
            // Ocultar el contenedor de resultados
            resultados.style.display = 'none';
            // Mostrar el contenedor de películas populares
            peliculasOnline.classList.remove('oculto');
            textPelicula.classList.remove('oculto');
            botonAnterior.classList.remove('oculto');
            botonSiguiente.classList.remove('oculto');
            // Actualizar la página
            location.reload();
        } else {
            // Mostrar el contenedor de resultados
            resultados.style.display = 'block';
            // Ocultar el contenedor de películas populares
            peliculasOnline.classList.add('oculto');
            textPelicula.classList.add('oculto');
            botonAnterior.classList.add('oculto');
            botonSiguiente.classList.add('oculto');
        }
    });
}


 


// *** Función para obtener y mostrar el tráiler de la película en una ventana modal ***
function obtenerTrailer(movieId) {
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=es-ES`,
    opciones
  )
    .then((response) => response.json())
    .then((data) => {
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        const trailerContainer = document.getElementById("trailer-container");
        trailerContainer.innerHTML = `<iframe width="880" height="495" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        abrirModal();
      } else {
        alert("No se encontró tráiler.");
      }
    })
    .catch((err) => console.error(err));
}




// *** Función para abrir la ventana modal ***
function abrirModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// *** Función para cerrar la ventana modal ***
function cerrarModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.getElementById('trailer-container').innerHTML = '';  // Limpiar el contenido del tráiler
}

// *** Obtener el elemento <span> que cierra la ventana modal ***
const span = document.getElementsByClassName('close')[0];
span.onclick = function() {
    cerrarModal();
}

// *** Cuando el usuario hace clic fuera de la ventana modal, se cierra ***
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        cerrarModal();
    }
};

 
 

     
// *** Subir pagina hacia arriba al dar un evento click ***
document.querySelector('.flechaArriba').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


//=========================================================== FIN ==================================================================================