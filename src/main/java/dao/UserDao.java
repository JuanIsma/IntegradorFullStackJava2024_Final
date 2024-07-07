
package dao;

import conexion.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;



 

public class UserDao {

    public boolean validarUsuarioAdmin(String email, String contrasena) {
        boolean validar = false;

        String sql = "SELECT * FROM loginadmin WHERE usuario = ? AND contrasena = ?";

        try {
            //obtenemos la conexion
            Connection conexion = DatabaseConnection.getConnection();
            //preparar la consulta
            PreparedStatement consulta = conexion.prepareStatement(sql);
            //argumentos
            consulta.setString(1, email);
            consulta.setString(2, contrasena);
            //ejecutar la consulta
            ResultSet resultado = consulta.executeQuery();
            
            validar = resultado.next();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return validar;
    }
}
