package hashmap;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import junit.framework.TestCase;

public class UseHashMap extends TestCase {
	Map<String, String> map = new HashMap<String, String>();
	
	public void testFoo() {
		Thread t1 = new UpdateThread(map);
		Thread t2 = new UpdateThread(map);
		Thread t3 = new UpdateThread(map);
		Thread t4 = new UpdateThread(map);
		t1.start();
		t2.start();
		t3.start();
		t4.start();
	}
}
