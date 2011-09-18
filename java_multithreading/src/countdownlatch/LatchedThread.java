package countdownlatch;

import java.util.concurrent.CountDownLatch;

public class LatchedThread extends Thread {
	private final CountDownLatch startLatch;

	public LatchedThread(CountDownLatch startLatch) {
		this.startLatch = startLatch;
	 }
	 public void run() {
		 try {
			 startLatch.await();
			 System.out.println("Doing some work");
		 } catch (InterruptedException iex) {}
	 }
}
