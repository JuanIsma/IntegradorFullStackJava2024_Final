
package servlet;
 

import dao.UsuarioDAO;
import com.google.protobuf.TextFormat.ParseException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;
import modelo.Usuario;

@WebServlet("/RegistrarUsuarioServlet")
    //Se utiliza para asegurar la consistencia
    //en la serialización de la clase cuando se gestiona el estado de un servlet en un entorno distribuido.
    //private static final long serialVersionUID = 1L;
    
//    HttpServletRequest request:
//    Es un objeto que encapsula toda la información de la solicitud HTTP enviada por el cliente.
//    
//    HttpServletResponse response:
//    Es un objeto que permite al servlet construir y enviar la respuesta HTTP al cliente.
    
//    Estos objetos son pasados automáticamente por el contenedor de servlets
//    a los métodos doGet(), doPost() cuando se realiza una solicitud al servlet.
public class RegistrarUsuarioServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String fechaNacimientoStr = request.getParameter("fechaNacimiento");
        String pais = request.getParameter("pais");
        Date fechaNacimiento = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // Formato esperado de entrada
            java.util.Date parsedDate = sdf.parse(fechaNacimientoStr);
            fechaNacimiento = new Date(parsedDate.getTime());
        } catch (java.text.ParseException ex) {
            Logger.getLogger(RegistrarUsuarioServlet.class.getName()).log(Level.SEVERE, null, ex);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Fecha de nacimiento inválida");
            return;
        }
 
        
        UsuarioDAO usuarioDAO = new UsuarioDAO();
     
                                // response.sendRedirect("success.html");   // Redireccionar o mostrar mensaje de éxito
       
         /*Si la inserción es exitosa, muestra el mensaje de éxito.
         Si ocurre una excepción, captura la excepción y muestra un mensaje de error en el navegador.*/
         try {
              Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setEmail(email);
        usuario.setPassword(password);
        //convierte una cadena de texto a un objeto Date
        //proviene del paquete java.sql
        usuario.setFechaNacimiento(fechaNacimiento);
        usuario.setPais(pais);
        usuarioDAO.insertarUsuario(usuario);
             
             
             
            response.setContentType("text/html");
            response.getWriter().println("<html><head><style>");
            response.getWriter().println("body { font-family: Arial, sans-serif;  background:-webkit-linear-gradient(top, black,  #7e0e29, black);  }");
            response.getWriter().println("h1 { color: green; }");
            response.getWriter().println("p { color: #333; }");
            response.getWriter().println("div.container { margin: 50px auto; width: 60%; padding: 20px;  background-color: #fff;  border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }");
            response.getWriter().println("</style>");
            response.getWriter().println("<meta http-equiv='refresh' content='3;url=index.html'>");
            response.getWriter().println("</head><body>");
            response.getWriter().println("<div class='container'>");
            response.getWriter().println("<h1>Registro exitoso</h1>");
            response.getWriter().println("<p>El usuario ha sido registrado exitosamente.</p>");
            response.getWriter().println("</div>");
            response.getWriter().println("</body></html>");
            
        } catch (RuntimeException e) {
            Logger.getLogger(RegistrarUsuarioServlet.class.getName()).log(Level.SEVERE, null, e);
            response.setContentType("text/html");
            response.getWriter().println("<html><head><style>");
            response.getWriter().println("body { font-family: Arial, sans-serif; background-color: #f0f0f0; }");
            response.getWriter().println("h1 { color: red; }");
            response.getWriter().println("p { color: #333; }");
            response.getWriter().println("div.container { margin: 50px auto; width: 60%; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }");
            response.getWriter().println("</style>");
            response.getWriter().println("<meta http-equiv='refresh' content='3;url=error.html'>");
            response.getWriter().println("</head><body>");
            response.getWriter().println("<div class='container'>");
            response.getWriter().println("<h1>Error al registrar</h1>");
            response.getWriter().println("<p>Hubo un error al intentar registrar el usuario. Por favor, intenta nuevamente.</p>");
            response.getWriter().println("</div>");
            response.getWriter().println("</body></html>");
        }
   
        
    }
}
