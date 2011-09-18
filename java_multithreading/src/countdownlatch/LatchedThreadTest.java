package countdownlatch;

import java.util.concurrent.CountDownLatch;

import junit.framework.TestCase;

public class LatchedThreadTest extends TestCase {
	public void testCountDownLatch() {
		CountDownLatch startLatch = new CountDownLatch(1);
		for (int threadNo = 0; threadNo < 4; threadNo++) {
		  Thread t = new LatchedThread(startLatch);
		  t.start();
		}
		// give the threads chance to start up; we could perform
		// initialisation code here as well.
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		startLatch.countDown();
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
