package futuretask;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

import executor.RandomRunnable;

import junit.framework.TestCase;

public class TestFutureTaskRunnable extends TestCase {
	public void testFutureTask() {
		FutureTask<String> task = 
			new FutureTask<String>(new RandomRunnable(), "Success!");
		
		new Thread(task).start();
		
		// Simulated doing some work until ready to check task
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch(InterruptedException ignored) {}
		
		String result = null;
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
