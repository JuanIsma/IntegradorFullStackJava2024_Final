package servlet;

 

import dao.UserDao;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/LoginAdminServlet")
public class LoginAdminServlet extends HttpServlet {
    
     
    

//El Servlet de autenticación del Usuario Administrador
    

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener los parámetros del formulario de login
        String user = request.getParameter("email");
        String password = request.getParameter("password");
        

        // Instanciar el DAO para validar las credenciales
        UserDao userDao = new UserDao();
        boolean usuarioValido = userDao.validarUsuarioAdmin(user,password );

        // Redirigir según la validación
        if (usuarioValido) {
            response.sendRedirect("./pages/gestionUsuarios.html");
        } else {
  
       // Redirigir a la página de inicio de sesión con un parámetro de error
        response.sendRedirect("./pages/adminSesion.html?error=true");
        }
    }
}
