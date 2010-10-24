package org.johnragan.jdbc;

import java.sql.*;

public class RegularStatement {

	/**
	 * @param args
	 */
	public void basicRun() {
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
			for (int i = 0; i < 10000; ++i) {
				
			Connection myConnection = DriverManager.getConnection(
			"jdbc:mysql://localhost:3306/jdbc_basics?user=root");
			
			
			
			// Transactional statements optional
			myConnection.setAutoCommit(false);
			Savepoint svpt1 = myConnection.setSavepoint("SAVEPOINT_1");
			//myConnection.getMetaData().getDatabaseMinorVersion()
			//String databaseVersion = myConnection.getMetaData().getDatabaseProductVersion()  
			//String databaseName = .getDatabaseProductName();
			//System.out.println("database name is " + databaseName);
			
			Statement stmt = myConnection.createStatement();
			ResultSet results = stmt.executeQuery("SELECT ENAME, JOB, HIREDATE, SAL, COMM FROM employees");
			while(results.next())
			{
			String name = results.getString("ENAME"); // Get column by name
			String job = results.getString(2); // Got column by number
			System.out.println("name: " + name + " and job value: " + job);
			}
			results.close( );
			
			//Statement stmt2 = myConnection.createStatement();
			//int rowCount = stmt2.executeUpdate("INSERT INTO sales (name,customer_id,sale_value) VALUES('The Office UK',3,18.34);");
			
			//Statement stmt4 = myConnection.createStatement();
			//int rowCount4 = stmt4.executeUpdate("UPDATE sales SET name='Aladin Updated' WHERE name='Aladin';");
			
			//Statement stmt3 = myConnection.createStatement();
			//int rowCount3 = stmt3.executeUpdate("DELETE FROM sales WHERE customer_id=3;");
			
			myConnection.commit( );
			//myConnection.rollback(svpt1); - goes inside of SqlException
			
			myConnection.close();  // This shoud be done in a finally block
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	public static void main(String[] args) {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.basicRun();
	}
}
