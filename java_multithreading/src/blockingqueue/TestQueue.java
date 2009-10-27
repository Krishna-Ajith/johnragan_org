package blockingqueue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import junit.framework.TestCase;

public class TestQueue extends TestCase {
	public void testQueue() {
		BlockingQueue<String> queue = new LinkedBlockingQueue<String>(10);
		Producer p = new Producer(queue);
		Consumer c1 = new Consumer("Consumer 1", queue);
		Consumer c2 = new Consumer("Consumer 2", queue);
		Consumer c3 = new Consumer("Consumer 3", queue);
		Consumer c4 = new Consumer("Consumer 4", queue);
		
		p.start();
		c1.start();
		c2.start();
		c3.start();
		c4.start();
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch(InterruptedException ignored) {}
	}

}
