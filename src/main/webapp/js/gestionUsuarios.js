document.addEventListener('DOMContentLoaded', cargarUsuarios);


// -- Crear modal -- //
let modificarModal;

document.addEventListener('DOMContentLoaded', function() {
    modificarModal = new bootstrap.Modal(document.getElementById('modificarModal'));
    cargarUsuarios();
});

// ----------------------------------------- //
// -- Cargar usuarios -- //
function cargarUsuarios() {
    fetch('/IntegradorFullStackJava2024/GestionUsuarios')
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No se encontró el recurso solicitado. Verifica la ruta.');
                } else {
                    throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                }
            }
            return response.json();
        })
        .then(usuarios => {
            console.log(usuarios);
            const tbody = document.querySelector('#usuariosTable tbody');
            tbody.innerHTML = '';
            usuarios.forEach(usuario => {
                const fechaFormateada = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
                tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.password}</td>
                        <td>${fechaFormateada}</td>
                        <!-- <td>${usuario.fechaNacimiento}</td> -->
                        <td>${usuario.pais}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="mostrarModificarModal(${usuario.id})">Modificar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching and parsing data', error);
            let errorMessage = 'Hubo un error al cargar los usuarios. Por favor, inténtalo de nuevo más tarde.';
            
            if (error.name === 'TypeError') {
                // Error de red u otros problemas relacionados con el fetch
                errorMessage = 'Hubo un problema de red. Por favor, revisa tu conexión e inténtalo de nuevo.';
            } else if (error.message.includes('No se encontró el recurso solicitado')) {
                // Error específico de recurso no encontrado (404)
                errorMessage = 'No se encontró el recurso solicitado en el servidor. Verifica la ruta.';
            }
            
            alert(errorMessage);
        });
}



// -- Mostrar y modificar el modal -- //

function mostrarModificarModal(id) {
    fetch(`/IntegradorFullStackJava2024/GestionUsuarios?id=${id}`)
        .then(response => response.json())
        .then(usuario => {
            //console.log(usuario)
            document.getElementById('userId').value = usuario.id;
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('apellido').value = usuario.apellido;
            document.getElementById('email').value = usuario.email;
            document.getElementById('password').value = usuario.password;
            document.getElementById('fechaNacimiento').value = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
            //document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;
            document.getElementById('pais').value = usuario.pais;
            modificarModal.show();
        })
        .catch(error => console.error('Error:', error));
}





function guardarModificacion() {
    
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const paisInput = document.getElementById('pais');

    // Validar que todos los campos requeridos estén llenos
    if (!nombreInput.value || !apellidoInput.value || !emailInput.value || !passwordInput.value || !fechaNacimientoInput.value || !paisInput.value) {
        alert('Por favor complete todos los campos.');
        return;
    }
    
    const usuario = {
        id: document.getElementById('userId').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value
    };

    fetch('/IntegradorFullStackJava2024/GestionUsuarios', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
        //método en JavaScript que convierte un objeto JavaScript en una cadena JSON.
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.exito)
        if (data.exito) {
            modificarModal.hide();
            cargarUsuarios();
        } else {
            alert('Error al modificar el usuario');
        }
    })
    .catch(error => console.error('Error:', error));
}




// -----------------------------------------------------
// -- Eliminar usuario -- //

function eliminarUsuario(id) {
    //función que muestra un cuadro de diálogo con un mensaje y botones "Aceptar" y "Cancelar"
    //Devuelve true si el usuario hace clic en "Aceptar" y false si hace clic en "Cancelar".
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        fetch(`/IntegradorFullStackJava2024/GestionUsuarios?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.exito)
                if (data.exito) {
                    cargarUsuarios();
                } else {
                    alert('Error al eliminar el usuario');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}