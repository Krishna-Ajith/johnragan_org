package collections;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import junit.framework.TestCase;

// TreeSet, LinkedHashSet
public class SetTest extends TestCase {
	public void setUp() throws Exception {
    	super.setUp();
    }
	
	public void testAddContainsDuplicatesDisallowed() {
		HashSet<String> set = new HashSet<String>();
		
		set.add("one");
		set.add("two");
		set.add("three");
		set.add("two");
		assertEquals(3, set.size());
		assertEquals(true, set.contains("one"));
		assertEquals(true, set.contains("two"));
		assertEquals(true, set.contains("three"));
	}

	public void testAddAllContainsAll() {
		HashSet<String> set = new HashSet<String>();
		
		set.add("one");
		set.add("four");
		
		Set<String> subset = new HashSet<String>();
		subset.add("three");
		subset.add("two");
		
		set.addAll(subset);
		
		assertEquals(4, set.size());
		
		Set<String> subset2 = new HashSet<String>();
		subset2.add("one");
		subset2.add("two");
		subset2.add("three");
		subset2.add("four");
		assertTrue(set.containsAll(subset2));
		subset2.add("five");
		assertFalse(set.containsAll(subset2));
	}
	
	public void testClearIsEmpty() {
		HashSet<String> set = new HashSet<String>();
		
		set.add("one");
		assertFalse(set.isEmpty());
		set.clear();
		assertTrue(set.isEmpty());
	}
	
	public void testIterator() {
		HashSet<String> set = new HashSet<String>();
		
		set.add("one");
		set.add("two");
		Iterator<String> iterator = set.iterator();
		int i = 0;
		while (iterator.hasNext()) {
			i++;
			iterator.next();
		}
		assertEquals(2, i);
	}
	
	public void testRemoveRemoveAll() {
		HashSet<String> set = new HashSet<String>();
		
		set.add("one");
		set.add("two");
		set.add("three");
		set.add("four");
		set.remove("two");
		assertEquals(3, set.size());
		Set<String> subset = new HashSet<String>();
		subset.add("one");
		subset.add("four");
		set.removeAll(subset);
		assertEquals(1, set.size());
	}
	
	public void testRetainAll() {
		HashSet<String> set = new HashSet<String>();
		
		set.add("one");
		set.add("two");
		set.add("three");
		
		Set<String> subset = new HashSet<String>();
		subset.add("one");
		subset.add("three");
		set.retainAll(subset);
		assertEquals(2, set.size());
		assertFalse(set.contains("two"));
	}
}
