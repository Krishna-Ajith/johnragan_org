package collections;

import java.util.Map;
import java.util.TreeMap;
import java.util.SortedMap;

import junit.framework.TestCase;

public class SortedMapTest extends TestCase {
	private SortedMap<String, String> sortedMap;
	
	public void setUp() throws Exception {
    	super.setUp();
    	sortedMap = new TreeMap<String, String>();
    	
    	sortedMap.put("3", "three");
    	sortedMap.put("1", "one");
		sortedMap.put("2", "two");
		sortedMap.put("5", "five");
		sortedMap.put("4", "four");
    }
	
	public void testHeadMapTailMapSubMap() {	
		Map<String, String> map = sortedMap.headMap("3");
		assertEquals(2, map.size());
		
		map = sortedMap.tailMap("4");
		assertEquals(2, map.size());
		
		map = sortedMap.subMap("2", "4");
		assertEquals(2, map.size());
		
		assertEquals(5, sortedMap.size());
	}
	
	public void testFirstKeyLastKey() {
		assertEquals("1", sortedMap.firstKey());
		assertEquals("5", sortedMap.lastKey());
	}
}
