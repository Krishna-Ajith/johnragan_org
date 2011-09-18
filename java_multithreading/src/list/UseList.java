package list;

import java.util.ArrayList;
import java.util.List;

import junit.framework.TestCase;

public class UseList extends TestCase {
	List<String> list = new ArrayList<String>();
	
	public void testFoo() {
		Thread t1 = new UpdateThread(list, "one");
		Thread t2 = new UpdateThread(list, "two");
		Thread t3 = new UpdateThread(list, "three");
		Thread t4 = new UpdateThread(list, "four");
		t1.start();
		t2.start();
		t3.start();
		t4.start();
		
		try {
			Thread.sleep(25000);
		} catch (InterruptedException e) {}
		
		System.out.println(list);
	}
}
