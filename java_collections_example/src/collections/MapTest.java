package collections;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.Map.Entry;

import junit.framework.TestCase;

public class MapTest extends TestCase {
	private Map<String, String> map; 
	public void setUp() throws Exception {
    	super.setUp();
    	map = new HashMap<String, String>();
//    	map = new TreeMap<String, String>();
//    	map = new LinkedHashMap<String, String>();
    }
	
	public void test_put_keys_values_containsKey_containsValue_get_remove_size_putAll_entrySet() {
		map.put("oneKey", "oneValue");
		map.put("twoKey", "twoValue");
		map.put("threeKey", "threeValue");
		Set<String> keys = map.keySet();
		assertTrue(keys.contains("oneKey"));
		assertTrue(keys.contains("twoKey"));
		assertTrue(keys.contains("threeKey"));
		assertFalse(keys.contains("fourKey"));
		
		Collection<String> values = map.values();
		assertTrue(values.contains("oneValue"));
		assertTrue(values.contains("twoValue"));
		assertTrue(values.contains("threeValue"));
		assertFalse(values.contains("fourValue"));
		
		assertTrue(map.containsKey("oneKey"));
		assertFalse(map.containsKey("fourKey"));
		
		assertTrue(map.containsValue("oneValue"));
		assertFalse(map.containsValue("fourValue"));
		
		assertEquals("oneValue", map.get("oneKey"));
		assertEquals("twoValue", map.get("twoKey"));
		assertEquals("threeValue", map.get("threeKey"));
		assertEquals(null, map.get("fourKey"));
		
		map.remove("oneKey");
		map.remove("twoKey");
		assertEquals(1, map.size());
		Map<String, String> subMap = new HashMap<String, String>();
		subMap.put("oneKey", "oneValue");
		subMap.put("twoKey", "twoValue");
		map.putAll(subMap);
		assertEquals(3, map.size());
		
		Set<Entry<String, String>> entrySets = map.entrySet();
		assertEquals(3, entrySets.size());
		
	}
}
