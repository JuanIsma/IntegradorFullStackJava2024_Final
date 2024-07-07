document.addEventListener("DOMContentLoaded", () => {
  const formularioR = document.getElementById("formularioR");

  // Agregar un evento de escucha para cuando se envíe el formulario
  formularioR.addEventListener("submit", (evento) => {
      // Detener el envío del formulario
      evento.preventDefault();
      // Validar los campos del formulario
      if (validarFormularioR()) {
          // Si todos los campos están completos
          formularioR.submit();
      }
  });

  // Función para validar los campos del formulario de registro
  function validarFormularioR() {
      // Obtener los valores de los campos del formulario
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const fechaNacimiento = document.getElementById("fechaNacimiento").value;
      const pais = document.getElementById("pais").value;
      const terminos = document.getElementById("terminos").checked;

      let esValido = true;

      // Validar cada campo
      if (nombre === "") {
          mostrarError("nombre", "Por favor ingresa tu nombre");
          esValido = false;
      } else if (!validarNombreApellido(nombre)) {
          mostrarError("nombre", "El nombre contiene caracteres no permitidos");
          esValido = false;
      } else {
          limpiarError("nombre");
      }

      if (apellido === "") {
          mostrarError("apellido", "Por favor ingresa tu apellido");
          esValido = false;
      } else if (!validarNombreApellido(apellido)) {
          mostrarError("apellido", "El apellido contiene caracteres no permitidos");
          esValido = false;
      } else {
          limpiarError("apellido");
      }

      if (email === "") {
          mostrarError("email", "Por favor ingresa tu email");
          esValido = false;
      } else if (!validarEmail(email)) {
          mostrarError("email", "Por favor ingresa un email válido");
          esValido = false;
      } else {
          limpiarError("email");
      }

      if (password === "") {
          mostrarError("password", "Por favor ingresa tu contraseña");
          esValido = false;
      } else if (!validarPassword(password)) {
          mostrarError("password", "Por favor ingresa una contraseña mínima de 8 caracteres");
          esValido = false;
      } else {
          limpiarError("password");
      }

      if (fechaNacimiento === "") {
          mostrarError("fechaNacimiento", "Por favor ingresa tu fecha de nacimiento");
          esValido = false;
      } else {
          limpiarError("fechaNacimiento");
      }

      if (pais === "") {
          mostrarError("pais", "Por favor selecciona tu país");
          esValido = false;
      } else {
          limpiarError("pais");
      }

      if (!terminos) {
          mostrarError("terminos", "Debes aceptar los términos y condiciones");
          esValido = false;
      } else {
          limpiarError("terminos");
      }

      return esValido;
  }

  // Mostrar un mensaje de error
  function mostrarError(campo, mensaje) {
      const campoError = document.getElementById(`${campo}-error`);
      campoError.innerText = mensaje;
      campoError.classList.remove("oculto");
      campoError.style.display = "block";
      document.getElementById(campo).style.borderColor = "red";
  }

  // Limpiar el mensaje de error
  function limpiarError(campo) {
      const campoError = document.getElementById(`${campo}-error`);
      campoError.innerText = "";
      campoError.classList.add("oculto");
      campoError.style.display = "none";
      document.getElementById(campo).style.borderColor = "";
  }

  // Función para validar un email
  function validarEmail(email) {
      // Definir una expresión regular para un email válido
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regexEmail.test(email);
  }

  // Función para validar una contraseña utilizando una expresión regular
  function validarPassword(password) {
      // Definir una expresión regular para contraseña
      const regexPass = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'\d@]{8,}$/;
      return regexPass.test(password);
  }

  // Función para validar nombre y apellido utilizando una expresión regular
  function validarNombreApellido(valor) {
      // Definir una expresión regular para nombres y apellidos
      const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,}$/;
      return regexNombreApellido.test(valor);
  }
});
