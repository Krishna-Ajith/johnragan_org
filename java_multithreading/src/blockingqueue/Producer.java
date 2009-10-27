package blockingqueue;

import java.util.Date;
import java.util.concurrent.BlockingQueue;

public class Producer extends Thread {
	private BlockingQueue<String> queue;
	
	public Producer(BlockingQueue<String> queue) {
		setName("Producer");
		this.queue = queue;
	}
	
	public void run() {
		for (int i = 0; i < 20; ++i) {
			try {
				queue.put(produce());
			} catch (InterruptedException e) {}
		}
	}
	
	private String produce() {
		while (true) {
			double r = Math.random();
			
			// Only goes forward 1/10 of the time
			if ((r*100) < 10) {
				String s = String.format("Inserted at %tc", new Date());
				return s;
			}
		}
	}
}
