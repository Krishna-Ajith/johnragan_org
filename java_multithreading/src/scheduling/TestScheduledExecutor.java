package scheduling;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import junit.framework.TestCase;

public class TestScheduledExecutor extends TestCase {
	public void testScheduler() {
		ScheduledExecutorService scheduler =
			Executors.newSingleThreadScheduledExecutor();
		
		// Runs this first at 1 second, and then every 5 seconds.
		final ScheduledFuture<?> timeHandle =
			scheduler.scheduleAtFixedRate(new TimePrinter(System.out), 1, 5, TimeUnit.SECONDS);
		
		// Without this, the above would execute forever.  However, we are scheduling to run, only four times,
		// this task 19 seconds from now, to grab the scheduled future and cancel it.
		scheduler.schedule(new Runnable() {
			public void run() {
				timeHandle.cancel(false);
			}
		}, 19, TimeUnit.SECONDS);
		
		try {
			TimeUnit.SECONDS.sleep(17);
		} catch(InterruptedException ignored) {}
	}
}
