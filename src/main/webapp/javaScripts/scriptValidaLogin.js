//FORMULARIO
const formulario = document.getElementById("formulario");

// Agregar un evento de escucha para cuando se envíe el formulario
formulario.addEventListener("submit", (evento) => {
  // Detener el envío del formulario
  evento.preventDefault();
  // Validar los campos del formulario
  if (validarFormulario()) {
    // Si todos los campos están completos
    formulario.submit();
  }
});


//----------------------------------------------------------------------

// Función para validar los campos del formulario
function validarFormulario() {
  // Obtener los valores de los campos del formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let esValido = true;

  // Validar cada campo
  
  if (email === "") {
    mostrarError("email", "Por favor ingresa tu email");
    esValido = false;
  } else if (!validaremail(email)) {
    mostrarError("email", "Por favor ingresa un email válido");
    esValido = false;
  } else {
    limpiarError("email");
  }

  if (password === "") {
    mostrarError("password", "Por favor ingresa tu contraseña");
    esValido = false;
  } else if (!validarpassword(password)) {
    mostrarError(
      "password",
      "Por favor ingresa una contraseña minima de 8 carateres"
    );
    esValido = false;
  } else {
    limpiarError("password");
  }
  return esValido;
}

//----------------------------------------------------------------------


// Mostrar un mensaje de error
function mostrarError(campo, mensaje) {
  const campoError = document.getElementById(`${campo}-error`);
  campoError.innerText = mensaje;
  campoError.classList.remove("oculto");
  document.getElementById(campo).style.borderColor = "red";
}

// Limpiar el mensaje de error
function limpiarError(campo) {
  const campoError = document.getElementById(`${campo}-error`);
  campoError.innerText = "";
  campoError.classList.add("oculto");
  document.getElementById(campo).style.borderColor = "";
}

//----------------------------------------------------------------------

// Función para validar un email
function validaremail(email) {
  // Definir una expresión regular para un email válido
  const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexemail.test(email);
}

// Función para validar un correo electrónico utilizando una expresión regular
function validarpassword(password) {
  // Definir una expresión regular para contraseña
  const regexepass = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'\d@]{8,}$/;
  return regexepass.test(password);
}
