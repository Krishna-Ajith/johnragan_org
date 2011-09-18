package executor.callable;

import java.math.BigInteger;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import junit.framework.TestCase;

public class ExecutorCallableTest extends TestCase {
	public void testExecutorCallable() {
		ExecutorService executor = Executors.newFixedThreadPool(2);
		
		Future<BigInteger> prime1 = executor.submit(new LongRunningRandomPrimeSearch(512));
		Future<BigInteger> prime2 = executor.submit(new LongRunningRandomPrimeSearch(512));
		Future<BigInteger> prime3 = executor.submit(new LongRunningRandomPrimeSearch(512));
		
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch(InterruptedException ignored) {}  
		
//		prime1.cancel(false);  // cancels a task, but only if not started  SEEMS TO CANCEL EVEN IF STARTED - NOT SURE WHY
		prime2.cancel(true);  // cancels a task, even if started
		prime3.cancel(false); // cancels a task, but only if not started
		
		try {
			TimeUnit.SECONDS.sleep(10);
		} catch(InterruptedException ignored) {}  
		
		try {
			System.out.println(prime1.get());
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch(CancellationException e) {
			System.out.println("This task1 was cancelled.");
		}
		
		try {
			System.out.println(prime2.get());
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch(CancellationException e) {
			System.out.println("This task2 was cancelled.");
		}
		
		try {
			System.out.println(prime3.get());
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch(CancellationException e) {
			System.out.println("This task3 was cancelled.");
		}
		
		assertFalse(prime1.isCancelled());
		assertTrue(prime2.isCancelled());
		assertTrue(prime3.isCancelled());
		
		// Always done, whether cancelled or not.
		assertTrue(prime1.isDone());
		assertTrue(prime2.isDone());
		assertTrue(prime3.isDone());
		
		Future<BigInteger> prime4 = executor.submit(new LongRunningRandomPrimeSearch(512));
		try {
			System.out.println(prime4.get(2, TimeUnit.SECONDS));
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch (TimeoutException e) {
			System.out.println("The request timed out, as expected");
		}
	}
}
