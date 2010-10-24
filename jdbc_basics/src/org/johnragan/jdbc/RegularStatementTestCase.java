package org.johnragan.jdbc;

import org.junit.*;

import static org.junit.Assert.*;

public class RegularStatementTestCase {
	@Test
	public void testRegularStatement() {
		RegularStatement regularStatement = new RegularStatement();
		regularStatement.basicRun();
	}
}
