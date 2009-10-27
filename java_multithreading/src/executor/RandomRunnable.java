package executor;

import java.util.Random;
import java.util.concurrent.TimeUnit;

public class RandomRunnable implements Runnable {

	public RandomRunnable() {}
	
	private String name = "";
	public RandomRunnable(String name) {
		this.name = name;
	}
	@Override
	public void run() {
		try {
			Random random = new Random();
			int seconds = random.nextInt(5) + 1;
			TimeUnit.SECONDS.sleep(seconds);
		} catch(InterruptedException ignored) {}
		System.out.println(name + " Did some work");
	}

}
