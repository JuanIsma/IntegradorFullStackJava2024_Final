package dao;
 
 
 
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import conexion.DatabaseConnection;
 
import modelo.Usuario;
/* DAO significa "Data Access Object" (Objeto de Acceso a Datos).
   Es un patrón de diseño utilizado en la programación orientada a objetos 
   para separar la lógica de acceso a datos del resto de la aplicación. 
   Este patrón permite a una aplicación acceder a la base de datos de manera independiente,
   centralizando todas las operaciones de acceso a datos en una clase específica.*/


// Clase para insertar datos
public class UsuarioDAO {
    
    
        private Usuario extraerUsuarioDeResultSet(ResultSet rs) throws Exception {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getInt("id"));
        usuario.setNombre(rs.getString("nombre"));
        usuario.setApellido(rs.getString("apellido"));
        usuario.setEmail(rs.getString("email"));
        usuario.setPassword(rs.getString("password"));
        usuario.setFechaNacimiento(rs.getDate("fechaNacimiento"));
        usuario.setPais(rs.getString("pais"));
        return usuario;
    }
        
        
    
        public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre, apellido, email, password, fechaNacimiento, pais) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellido());
            pstmt.setString(3, usuario.getEmail());
            pstmt.setString(4, usuario.getPassword());
            pstmt.setDate(5, usuario.getFechaNacimiento());
            pstmt.setString(6, usuario.getPais());
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    
    
    
    

    public List<Usuario> obtenerTodos() {
        List<Usuario> usuarios = new ArrayList<>();
        String query = "SELECT * FROM usuarios";
        
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            while (rs.next()) {
                Usuario usuario = extraerUsuarioDeResultSet(rs);
                usuarios.add(usuario);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return usuarios;
    }

    public Usuario obtenerPorId(int id) {
        String query = "SELECT * FROM usuarios WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return extraerUsuarioDeResultSet(rs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean modificar(Usuario usuario) {
        String query = "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, password = ?, fechaNacimiento = ?, pais = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellido());
            pstmt.setString(3, usuario.getEmail());
            pstmt.setString(4, usuario.getPassword());
            pstmt.setDate(5, usuario.getFechaNacimiento());
            pstmt.setString(6, usuario.getPais());
            pstmt.setInt(7, usuario.getId());
            
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean eliminar(int id) {
        String query = "DELETE FROM usuarios WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    
     
}




    
//    public void insertarUsuario(String nombre, String apellido, String email, String password, Date fechaNacimiento, String pais ) {
//        String sql = "INSERT INTO usuarios (nombre, apellido, email, password, fechaNacimiento, pais) VALUES (?, ?, ?, ?, ?, ?)";
//
//        try (Connection conn = DatabaseConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement(sql)) {
//
//            stmt.setString(1, nombre);
//            stmt.setString(2, apellido);
//            stmt.setString(3, email);
//            stmt.setString(4, password);
//            stmt.setDate(5, fechaNacimiento);
//            stmt.setString(6, pais);
// 
//
//                    int filasInsertadas = stmt.executeUpdate();
//        if (filasInsertadas != 1) {
//            throw new RuntimeException("Error al insertar usuario en la base de datos: no se insertó ninguna fila");
//        }
//        } catch (SQLException e) {
//            e.printStackTrace();
//            // Puedes lanzar una excepción personalizada o manejar el error según tus necesidades
//            throw new RuntimeException("Error al insertar usuario en la base de datos");
//        }
//    }