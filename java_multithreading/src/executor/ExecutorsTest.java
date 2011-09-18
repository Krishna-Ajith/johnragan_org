package executor;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import junit.framework.TestCase;

public class ExecutorsTest extends TestCase {
	public void testExecutor() {
		Executor executor = getExecutor();
		
		executor.execute(new RandomRunnable("r1"));
		executor.execute(new RandomRunnable("r2"));
		executor.execute(new RandomRunnable("r3"));
		executor.execute(new RandomRunnable("r4"));
		executor.execute(new RandomRunnable("r5"));
		executor.execute(new RandomRunnable("r6"));
		executor.execute(new RandomRunnable("r7"));
		executor.execute(new RandomRunnable("r8"));
		executor.execute(new RandomRunnable("r9"));
		executor.execute(new RandomRunnable("r10"));
		
		try {
			TimeUnit.SECONDS.sleep(12);
			TimeUnit.SECONDS.sleep(32);
		} catch(InterruptedException ignored) {}
	}
	
	private Executor getExecutor() {
		// Note that these take between 1 and 5 seconds.  If you increase the pool to 12, you can
		// get more done (the wait mimics IO behavior).
		return Executors.newFixedThreadPool(5);
		
		// This is a single thread pool executor.  Since on average it take 2.5 seconds, it should 25 seconds.
		// Be sure to increase the testExecutor wait time to 32.
//		return Executors.newSingleThreadExecutor();
	}
}
