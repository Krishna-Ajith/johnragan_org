package hashmap;

import java.util.Map;
import java.util.Random;

public class UpdateThread extends Thread {
	private Map<Integer, Integer> map;
	public UpdateThread(Map<Integer, Integer> map) {
		this.map = map;
	}
	public void run() {
		Random random = new Random();
		for (int i=1; i <= 10000; ++i) {
			if (!map.containsKey(i)) {
				try {
					Thread.sleep(random.nextInt(500));
				} catch (InterruptedException e) {}
				if (map.put(i, i) != null) {
					throw new IllegalStateException("was already added");
				}
			}
		}
		System.out.println(map);
	}
}