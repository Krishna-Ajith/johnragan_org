package org.johnragan.jdbc;

import org.junit.*;

import static org.junit.Assert.*;

public class RegularStatementTestCase {
	@Test
	public void testRepeatSelectWithinSameConnection() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatSelectWithinSameConnection();
	}
	
	@Test
	public void testRepeatSelectWithNewConnections() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatSelectWithNewConnections();
	}
	
	@Test
	public void testRepeatInsertWithinSameConnection() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatInsertWithinSameConnection();
	}
	
	@Test
	public void testRepeatInsertWithNewConnections() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatInsertWithNewConnections();
	}
	
	@Test
	public void testRepeatSelectUniqueWithinSameConnection() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatSelectUniqueWithinSameConnection();
	}
	
	@Test
	public void testRepeatSelectUniqueWithNewConnections() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatSelectUniqueWithNewConnections();
	}
	
	@Test
	public void testRepeatUpdateUniqueWithinSameConnection() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatUpdateUniqueWithinSameConnection();
	}
	
	@Test
	public void testRepeatUpdateUniqueWithNewConnections() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatUpdateUniqueWithNewConnections();
	}
	
	@Test
	public void testRepeatDeleteUniqueWithinSameConnection() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatDeleteUniqueWithinSameConnection();
	}
	
	@Test
	public void testRepeatDeleteUniqueWithNewConnections() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.repeatDeleteUniqueWithNewConnections();
	}
}
