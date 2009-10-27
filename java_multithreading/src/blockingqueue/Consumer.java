package blockingqueue;

import java.util.concurrent.BlockingQueue;

public class Consumer extends Thread {
	private BlockingQueue<String> queue;
	
	public Consumer(String name, BlockingQueue<String> queue) {
		setName(name);
		this.queue = queue;
	}
	
	public void run() {
		while (true) {
			try {
				process(queue.take());
			} catch (InterruptedException e) {}
		}
	}
	
	private void process(String work) {
		System.out.printf("%s processing object:%n       '%s'%n",
			getName(), work);
	}
}
