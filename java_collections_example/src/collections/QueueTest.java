package collections;

import java.util.NoSuchElementException;
import java.util.PriorityQueue;
import java.util.Queue;

import junit.framework.TestCase;

public class QueueTest extends TestCase {
	private Queue<String> queue; 
	public void setUp() throws Exception {
    	super.setUp();
    	queue = new PriorityQueue<String>();
    }
	
	public void testQueueNoException() {
		queue.offer("1");
		queue.offer("2");
		queue.offer("3");
		assertEquals(3, queue.size());
		
		assertTrue(queue.peek() != null);
		assertEquals(queue.poll(), "1");
		
		assertTrue(queue.peek() != null);
		assertEquals(queue.poll(), "2");
		
		assertTrue(queue.peek() != null);
		assertEquals(queue.poll(), "3");
		
		assertEquals(null, queue.peek());
		assertEquals(null, queue.poll());
	}
	
	public void testQueueException() {
		queue.add("1");
		queue.add("2");
		queue.add("3");
		assertEquals(3, queue.size());
		
		assertTrue(queue.element() != null);
		assertEquals(queue.remove(), "1");
		
		assertTrue(queue.element() != null);
		assertEquals(queue.remove(), "2");
		
		assertTrue(queue.element() != null);
		assertEquals(queue.remove(), "3");
		
		try {
			assertEquals(null, queue.element());
			fail("should have thrown an exception");
		} catch(NoSuchElementException e) {}
		
		try {
			assertEquals(null, queue.remove());
			fail("should have thrown an exception");
		} catch(NoSuchElementException e) {}
	}
}