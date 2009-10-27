package futuretask;

import java.math.BigInteger;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

import junit.framework.TestCase;

public class TestFutureTask extends TestCase {
	public void testFutureTask() {
		FutureTask<BigInteger> task = 
			new FutureTask<BigInteger>(new RandomPrimeSearch(512));
		
		new Thread(task).start();
		
		// Simulated doing some work until ready to check task
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch(InterruptedException ignored) {}
		
		BigInteger result = null;
		try {
			result = task.get();  // will wait if not yet calculated
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
		
		System.out.println("result: " + result);
	}
}
