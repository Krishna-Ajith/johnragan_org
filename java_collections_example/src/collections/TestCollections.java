package collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

import junit.framework.TestCase;

public class TestCollections extends TestCase {
	public void testSort() {
		List<String> list = new ArrayList<String>();
		list.add("3");
		list.add("5");
		list.add("1");
		list.add("4");
		list.add("2");
		Collections.sort(list);
		assertEquals("1", list.get(0));
		assertEquals("2", list.get(1));
		assertEquals("3", list.get(2));
		assertEquals("4", list.get(3));
		assertEquals("5", list.get(4));
	}
	
	public void testSortWithComparator() {
		List<String> list = new ArrayList<String>();
		list.add("3");
		list.add("5");
		list.add("1");
		list.add("4");
		list.add("2");
		
		Collections.sort(list, new Comparator<String>() {
		    public int compare(String o1, String o2) {
		        return -(o1.compareTo(o2));  // Reverse the ordering
		    }});
		assertEquals("5", list.get(0));
		assertEquals("4", list.get(1));
		assertEquals("3", list.get(2));
		assertEquals("2", list.get(3));
		assertEquals("1", list.get(4));
	}
	
	public void testBinarySearch() {
		
	}
	
	public void testBinarySearchWithComparator() {
		
	}

	public void testReverse() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");
		
		Collections.reverse(list);
		assertEquals("5", list.get(0));
		assertEquals("4", list.get(1));
		assertEquals("3", list.get(2));
		assertEquals("2", list.get(3));
		assertEquals("1", list.get(4));
		
	}
	
	public void testShuffle() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");
		
		Collections.shuffle(list);
		assertFalse((list.get(0) == "1" && list.get(1) == "2") && list.get(2) == "3" && list.get(3) == "4" && list.get(4) == "5");
	}
	
	public void testSwap() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");
		
		Collections.swap(list, 1, 3);
		assertEquals("1", list.get(0));
		assertEquals("4", list.get(1));
		assertEquals("3", list.get(2));
		assertEquals("2", list.get(3));
		assertEquals("5", list.get(4));
	}
	
	public void testFill() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");
		
		Collections.fill(list, "6");
		assertEquals("6", list.get(0));
		assertEquals("6", list.get(1));
		assertEquals("6", list.get(2));
		assertEquals("6", list.get(3));
		assertEquals("6", list.get(4));
	}
	
	public void testCopy() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		
		List<String> subList = new ArrayList<String>();
		subList.add("4");
		subList.add("5");
		
		Collections.copy(list, subList);
		assertEquals("4", list.get(0));
		assertEquals("5", list.get(1));
		assertEquals("3", list.get(2));
	}
	
	public void testMin() {
		List<String> list = new ArrayList<String>();
		list.add("3");
		list.add("5");
		list.add("1");
		list.add("4");
		list.add("2");
		
		String min = Collections.min(list);
		assertEquals("1", min);
	}
	
	public void testMinWithComparator() {
		List<String> list = new ArrayList<String>();
		list.add("3");
		list.add("5");
		list.add("1");
		list.add("4");
		list.add("2");
		
		String min = Collections.min(list, Collections.reverseOrder());
		assertEquals("5", min);
	}
	
	public void testMax() {
		List<String> list = new ArrayList<String>();
		list.add("3");
		list.add("5");
		list.add("1");
		list.add("4");
		list.add("2");
		
		String max = Collections.max(list);
		assertEquals("5", max);
	}
	
	public void testMaxWithComparator() {
		List<String> list = new ArrayList<String>();
		list.add("3");
		list.add("5");
		list.add("1");
		list.add("4");
		list.add("2");
		
		String max = Collections.max(list, Collections.reverseOrder());
		assertEquals("1", max);
	}
	
	public void testRotate() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");
		
		Collections.rotate(list, 2); // to the right
		assertEquals("4", list.get(0));
		assertEquals("5", list.get(1));
		assertEquals("1", list.get(2));
		assertEquals("2", list.get(3));
		assertEquals("3", list.get(4));
	}
	
	public void testReplaceAll() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("1");
		list.add("2");
		list.add("2");
		list.add("3");
		list.add("3");
		
		boolean b = Collections.replaceAll(list, "2", "two");
		assert(b);
		assertEquals("1", list.get(0));
		assertEquals("1", list.get(1));
		assertEquals("two", list.get(2));
		assertEquals("two", list.get(3));
		assertEquals("3", list.get(4));
		assertEquals("3", list.get(5));
	}
	
	public void testIndexOfSubList() {
	
	}
	
	public void testLastIndexOfSubList() {
		
	}
	
	public void testUnmodifiableCollection() {
		
	}
	
	public void testUnmodifiableSet() {
		
	}
	
	public void testUnmodifiableSortedSet() {
		
	}
	
	public void testUnmodifiableList() {
		
	}
	
	public void testUnmodifiableMap() {
		
	}
	
	public void testUnmodifiableSortedMap() {
		
	}
	
	public void testSynchronizedCollection() {
		
	}
	
	public void testSynchronizedSet() {
		
	}
	
	public void testSynchronizedSortedSet() {
		
	}
	
	public void testSynchronizedList() {
		
	}
	
	public void testSynchronizedMap() {
		
	}
	
	public void testSynchronizedSortedMap() {
		
	}
	
	public void testReverseOrder() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		list.add("4");
		list.add("5");
		
		Collections.sort(list, Collections.reverseOrder());
		assertEquals("5", list.get(0));
		assertEquals("4", list.get(1));
		assertEquals("3", list.get(2));
		assertEquals("2", list.get(3));
		assertEquals("1", list.get(4));
	}
	
	public void testReverseOrderWithComparator() {
		
		
	}
	
	public void testFrequency() {
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("1");
		list.add("2");
		list.add("2");
		list.add("2");
		list.add("3");
		list.add("3");
		
		assertEquals(3, Collections.frequency(list, "2"));
	}
	
	public void testDisjoint() {
		List<String> list1 = new ArrayList<String>();
		list1.add("1");
		list1.add("2");
		list1.add("3");
		
		List<String> list2 = new ArrayList<String>();
		list2.add("4");
		list2.add("5");
		list2.add("6");
		
		List<String> list3 = new ArrayList<String>();
		list3.add("3");
		list3.add("4");
		list3.add("5");
		
		assertTrue(Collections.disjoint(list1, list2));
		assertFalse(Collections.disjoint(list2, list3));
	}
}