package hashmap;

import java.util.Collections;
import java.util.Map;
import java.util.Random;
import java.util.TreeSet;

public class UpdateThread extends Thread {
	private Map map;
	public UpdateThread(Map map) {
		this.map = map;
	}
	public void run() {
		Random random = new Random();
		for (int i=1; i <= 100; ++i) {
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