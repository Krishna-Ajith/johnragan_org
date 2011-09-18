package hashmap;

import java.util.HashMap;
import java.util.Map;

import junit.framework.TestCase;

public class UseHashMap extends TestCase {
	Map<Integer, Integer> map = new HashMap<Integer, Integer>();
	
	public void testFoo() {
		Thread t1 = new UpdateThread(map);
		Thread t2 = new UpdateThread(map);
		Thread t3 = new UpdateThread(map);
		Thread t4 = new UpdateThread(map);
		Thread t5 = new UpdateThread(map);
		Thread t6 = new UpdateThread(map);
		Thread t7 = new UpdateThread(map);
		Thread t8 = new UpdateThread(map);
		t1.start();
		t2.start();
		t3.start();
		t4.start();
		t5.start();
		t6.start();
		t7.start();
		t8.start();
	}
}
