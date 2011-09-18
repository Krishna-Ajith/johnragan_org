package collections;

import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import junit.framework.TestCase;

public class SortedSetTest extends TestCase {
	private SortedSet<String> sortedSet; 
	
	public void setUp() throws Exception {
    	super.setUp();
    	sortedSet = new TreeSet<String>();
    	
    	sortedSet.add("5");
    	sortedSet.add("4");
    	sortedSet.add("2");
    	sortedSet.add("3");
    	sortedSet.add("1");
    }
	
	public void testFirstLast() {
		assertEquals("1", sortedSet.first());
		assertEquals("5", sortedSet.last());
	}
	
	public void testHeadMapTailMapSubMap() {	
		Set<String> set = sortedSet.headSet("3");
		assertEquals(2, set.size());
		
		set = sortedSet.tailSet("4");
		assertEquals(2, set.size());
		
		set = sortedSet.subSet("2", "4");
		assertEquals(2, set.size());
		
		assertEquals(5, sortedSet.size());
	}
}
