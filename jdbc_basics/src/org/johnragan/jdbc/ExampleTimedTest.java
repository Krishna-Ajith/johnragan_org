package org.johnragan.jdbc;

import junit.framework.TestSuite;
import com.clarkware.junitperf.TimedTest;

import junit.framework.Test;

public class ExampleTimedTest {
	public static final long toleranceInMillis = 100;

	public static TestSuite suite() {
		
		long maxElapsedTimeInMillis = 1000 + toleranceInMillis;
		
		JUnit4TestFactory factory = new JUnit4TestFactory(RegularStatementTestCase.class);
		return factory.makeTestSuite();
		
		//return new TimedTest(factory.makeTestSuite(), maxElapsedTimeInMillis);
	}
	
	@org.junit.Test
	public static Test testThis() {
		//Test timedTest = new TimedTest(suite(), 2000);
		return new TimedTest(suite(), 5000);
	}

	public static void main(String args[]) {
		//junit.textui.TestRunner.run(suite());
		//junit.textui.TestRunner.run(new TimedTest(suite(), 20000));
		junit.textui.TestRunner.run(testThis());
	}
}
