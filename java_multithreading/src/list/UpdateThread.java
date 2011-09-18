package list;

import java.util.List;
import java.util.Random;

public class UpdateThread extends Thread {
	private List<String> list;
	private String name;
	public UpdateThread(List<String> list, String name) {
		this.list = list;
		this.name = name;
	}
	public void run() {
		System.out.println(name + " is starting.");
		Random random = new Random();
		for (int i=1; i <= 100; ++i) {
			try {
				Thread.sleep(random.nextInt(250));
			} catch (InterruptedException e) {}
			if (!list.contains(Integer.toString(i))) {
				list.add(Integer.toString(i));
				System.out.println(name);
			}
		}
	}
}

