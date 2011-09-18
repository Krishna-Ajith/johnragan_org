package executorservice;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.TimeUnit;

import executor.RandomRunnable;
import junit.framework.TestCase;

public class ExecutorServiceTest extends TestCase {
	public void testExecutorService() {
		ExecutorService executor = Executors.newFixedThreadPool(5);
		
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
			TimeUnit.SECONDS.sleep(1);
		} catch(InterruptedException ignored) {}
		
		// Play with these two by switching between them.
		executor.shutdown();  // It allows you to shutdown, ignoring future tasks that are added but completing the current ones.
//		executor.shutdownNow();  // Ignores newly added tasks, as well as those in queue not yet started.
		
		try {
			executor.execute(new RandomRunnable("r11"));
			executor.execute(new RandomRunnable("r12"));
			executor.execute(new RandomRunnable("r13"));
			executor.execute(new RandomRunnable("r14"));
			executor.execute(new RandomRunnable("r15"));
			executor.execute(new RandomRunnable("r16"));
		} catch(RejectedExecutionException e) {
			System.out.println("Rejected adding new tasks since in process of shutdown");
		}
		
		try {
//			TimeUnit.SECONDS.sleep(11);
			TimeUnit.SECONDS.sleep(27);
		} catch(InterruptedException ignored) {}
	}
}
