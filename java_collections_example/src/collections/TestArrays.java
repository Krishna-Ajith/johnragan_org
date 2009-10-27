package collections;

import java.util.Arrays;
import java.util.List;

import junit.framework.TestCase;

public class TestArrays extends TestCase {
	public void testAsList() {
		String[] items1 = { "a", "b", "c" };
		List<String> list = Arrays.asList(items1);
		assertEquals("a", list.get(0));
		assertEquals("b", list.get(1));
		assertEquals("c", list.get(2));
	}
	
	public void testBinarySearch() {
//		int[] foo = new int[10];
		int[] items = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
		assertEquals(5, Arrays.binarySearch(items, 60));
		assertEquals(-3, Arrays.binarySearch(items, 25)); // Where would inserted, negative, minus 1
	}

	public void testDeepEquals() {
		
	}
	
	public void testDeepToString() {
		
	}
	
	public void testEquals() {
		int[] items1 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
		int[] items2 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
		int[] items3 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110 };
		assertTrue(Arrays.equals(items1, items2));
		assertFalse(Arrays.equals(items1, items3));
	}
	
	public void testFills() {
		String[] items1 = { "a", "b", "c" };
		Arrays.fill(items1, "foo");
		assertEquals("foo", items1[0]);
		assertEquals("foo", items1[1]);
		assertEquals("foo", items1[2]);
	}
	
	public void testSort() {
		int[] items = { 30, 90, 80, 100, 20, 40, 70, 10, 50, 60 };
		Arrays.sort(items);
		assertEquals(10, items[0]);
		assertEquals(20, items[1]);
		assertEquals(30, items[2]);
		assertEquals(40, items[3]);
		assertEquals(50, items[4]);
		assertEquals(60, items[5]);
		assertEquals(70, items[6]);
		assertEquals(80, items[7]);
		assertEquals(90, items[8]);
		assertEquals(100, items[9]);
	}
	
	public void testToString() {
		int[] items = { 30, 90, 80, 100, 20, 40, 70, 10, 50, 60 };
		assertEquals( "[30, 90, 80, 100, 20, 40, 70, 10, 50, 60]", Arrays.toString(items));
	}
}
