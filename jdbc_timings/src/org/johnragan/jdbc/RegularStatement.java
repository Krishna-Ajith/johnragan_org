package org.johnragan.jdbc;

import java.sql.*;

public class RegularStatement {
	public static final int COUNT= 10000;
	public static final String MONO_CONNECTION_NAME = "Mickey";
	public static final String POLY_CONNECTION_NAME = "Minnie";
	public static final String LOCAL_URL = "jdbc:mysql://localhost:3306/jdbc_basics?user=root";

	/**
	 * @param args
	 */
	public void repeatSelectWithinSameConnection() {
		setupDriver();
		
		try {
				
			Connection myConnection = getConnection();
			
			for (int i = 0; i < COUNT; ++i) {
				simpleSelectTransaction(myConnection, "SMITH");
			}
			
			myConnection.close();  // This shoud be done in a finally block
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatSelectWithNewConnections() {
		setupDriver();
		
		try {
			
			for (int i = 0; i < COUNT; ++i) {
				Connection myConnection = getConnection();
				simpleSelectTransaction(myConnection, "SMITH");
				myConnection.close();  // This shoud be done in a finally block
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatInsertWithinSameConnection() {
		setupDriver();
		
		try {
				
			Connection myConnection = getConnection();
			
			for (int i = 0; i < COUNT; ++i) {
				this.simpleInsertTransaction(myConnection, MONO_CONNECTION_NAME + i);
			}
			
			myConnection.close();  // This shoud be done in a finally block
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatInsertWithNewConnections() {
		setupDriver();
		
		try {
				
			for (int i = 0; i < COUNT; ++i) {
				Connection myConnection = getConnection();
				this.simpleInsertTransaction(myConnection, POLY_CONNECTION_NAME + i);
				myConnection.close();  // This shoud be done in a finally block
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatSelectUniqueWithinSameConnection() {
		setupDriver();
		
		try {
				
			Connection myConnection = getConnection();
			
			for (int i = 0; i < COUNT; ++i) {
				simpleSelectTransaction(myConnection, MONO_CONNECTION_NAME+i);
			}
			
			myConnection.close();  // This shoud be done in a finally block
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatSelectUniqueWithNewConnections() {
		setupDriver();
		
		try {
			
			for (int i = 0; i < COUNT; ++i) {
				Connection myConnection = getConnection();
				simpleSelectTransaction(myConnection, POLY_CONNECTION_NAME+i);
				myConnection.close();  // This shoud be done in a finally block
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatUpdateUniqueWithinSameConnection() {
		setupDriver();
		
		try {
				
			Connection myConnection = getConnection();
			
			for (int i = 0; i < COUNT; ++i) {
				simpleUpdateTransaction(myConnection, MONO_CONNECTION_NAME+i);
			}
			
			myConnection.close();  // This shoud be done in a finally block
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatUpdateUniqueWithNewConnections() {
		setupDriver();
		
		try {
			
			for (int i = 0; i < COUNT; ++i) {
				Connection myConnection = getConnection();
				simpleUpdateTransaction(myConnection, POLY_CONNECTION_NAME+i);
				myConnection.close();  // This shoud be done in a finally block
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatDeleteUniqueWithinSameConnection() {
		setupDriver();
		
		try {
				
			Connection myConnection = getConnection();
			
			for (int i = 0; i < COUNT; ++i) {
				simpleDeleteTransaction(myConnection, MONO_CONNECTION_NAME+i);
			}
			
			myConnection.close();  // This shoud be done in a finally block
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	/**
	 * @param args
	 */
	public void repeatDeleteUniqueWithNewConnections() {
		setupDriver();
		
		try {
			
			for (int i = 0; i < COUNT; ++i) {
				Connection myConnection = getConnection();
				simpleDeleteTransaction(myConnection, POLY_CONNECTION_NAME+i);
				myConnection.close();  // This shoud be done in a finally block
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}

	private void simpleSelectTransaction(Connection myConnection, String name) throws SQLException {
		// Transactional statements optional
		myConnection.setAutoCommit(false);
		Savepoint svpt1 = myConnection.setSavepoint("SAVEPOINT_1");
		//myConnection.getMetaData().getDatabaseMinorVersion()
		//String databaseVersion = myConnection.getMetaData().getDatabaseProductVersion()  
		//String databaseName = .getDatabaseProductName();
		//System.out.println("database name is " + databaseName);
		
		Statement stmt = myConnection.createStatement();
		String query = "SELECT ENAME, JOB, HIREDATE, SAL, COMM FROM employees where ENAME = '" + name + "';";
		ResultSet results = stmt.executeQuery(query);
		while(results.next())
		{
		String name2 = results.getString("ENAME"); // Get column by name
		String job = results.getString(2); // Got column by number
		System.out.println("name: " + name2 + " and job value: " + job);
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
	}
	
	private void simpleInsertTransaction(Connection myConnection, String newName) throws SQLException {
		// Transactional statements optional
		myConnection.setAutoCommit(false);
		Savepoint svpt1 = myConnection.setSavepoint("SAVEPOINT_1");
		
		Statement stmt2 = myConnection.createStatement();
		String query = "INSERT INTO employees (ENAME, JOB, HIREDATE, SAL, COMM) VALUES('" + newName + "', 'CLERK', '2008-7-04', 800, NULL);";
		int rowCount = stmt2.executeUpdate(query);
		
		myConnection.commit( );
		//myConnection.rollback(svpt1); - goes inside of SqlException
	}
	
	private void simpleUpdateTransaction(Connection myConnection, String newName) throws SQLException {
		// Transactional statements optional
		myConnection.setAutoCommit(false);
		Savepoint svpt1 = myConnection.setSavepoint("SAVEPOINT_1");
		
		Statement stmt2 = myConnection.createStatement();
		String query = "UPDATE employees SET sal=1500 WHERE ENAME='" + newName + "';";
		int rowCount = stmt2.executeUpdate(query);
		
		myConnection.commit( );
		//myConnection.rollback(svpt1); - goes inside of SqlException
	}
	
	private void simpleDeleteTransaction(Connection myConnection, String newName) throws SQLException {
		// Transactional statements optional
		myConnection.setAutoCommit(false);
		Savepoint svpt1 = myConnection.setSavepoint("SAVEPOINT_1");
		
		Statement stmt2 = myConnection.createStatement();
		String query = "DELETE FROM employees WHERE ENAME='" + newName + "';";
		int rowCount = stmt2.executeUpdate(query);
		
		myConnection.commit( );
		//myConnection.rollback(svpt1); - goes inside of SqlException
	}

	private void setupDriver() {
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
	}

	private Connection getConnection() throws SQLException {
		Connection myConnection = DriverManager.getConnection(
		LOCAL_URL);
		return myConnection;
	}
	
	public static void main(String[] args) {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatInsertWithinSameConnection();
	}
}
