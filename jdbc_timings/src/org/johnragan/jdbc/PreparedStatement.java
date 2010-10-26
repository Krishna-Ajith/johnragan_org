package org.johnragan.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class PreparedStatement {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IllegalAccessException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		try {
			Connection myConnection = DriverManager.getConnection(
			"jdbc:mysql://localhost:3306/examples?user=root");
			
			java.sql.PreparedStatement stmt = myConnection.prepareStatement("SELECT name, sale_value " +
					" FROM sales WHERE customer_id=?");
			stmt.setInt(1,1);
			ResultSet results = stmt.executeQuery();
			while(results.next())
			{
			String name = results.getString("name"); // Get column by name
			String saleValue = results.getString(2); // Got column by number
			System.out.println("name: " + name + " and sale value: " + saleValue);
			}
			results.close( );
			
			java.sql.PreparedStatement stmt2 = myConnection.prepareStatement("INSERT INTO sales (name,customer_id,sale_value) VALUES(?, ?, ?);");
			stmt2.setString(1, "The Office UK");
			stmt2.setInt(2, 3);
			stmt2.setFloat(3, (float)18.34);
			int rowCount2 = stmt2.executeUpdate();
			
			java.sql.PreparedStatement stmt4 = myConnection.prepareStatement("UPDATE sales SET name='Aladin Updated' WHERE name=?;");
			stmt4.setString(1, "Aladin");
			int rowCount4 = stmt4.executeUpdate();
			
			//java.sql.PreparedStatement stmt3 = myConnection.prepareStatement("DELETE FROM sales WHERE customer_id=?;");
			//stmt3.setInt(1,3);
			//int rowCount3 = stmt3.executeUpdate();
			
			myConnection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}

}

