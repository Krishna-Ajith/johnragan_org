package collections;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import junit.framework.TestCase;

// LinkedList
public class ListTest extends TestCase {
	public void testRegularArrayList() {
		List<String> stringList = new ArrayList<String>();
		stringList.add("one");
		stringList.add("five");
		stringList.add(1, "two");
		
		List<String> subStringList = new ArrayList<String>();
		subStringList.add("three");
		subStringList.add("four");
		stringList.addAll(2, subStringList);
		
		List<String> endStringList = new ArrayList<String>();
		endStringList.add("six");
		endStringList.add("seven");
		stringList.addAll(endStringList);
		
		assertEquals("[one, two, three, four, five, six, seven]", stringList.toString());
		
		System.out.println("Using an interator to go through the contents.");
		Iterator<String> iterator = stringList.iterator();
		while (iterator.hasNext()) {
			System.out.println(iterator.next());
			// iterator.remove();  // This would also remove, if we wanted to.
		}
		for (String foo : stringList) {
			System.out.println(foo);
		}
		
		assertEquals(7, stringList.size());
		
		Object[] the_array = stringList.toArray();
		String objectArraySample = (String)the_array[1];
		assertEquals("two", objectArraySample);
		String[] string_array = new String[1]; 
		string_array = stringList.toArray(string_array);
		String stringArraySample = string_array[1];
		assertEquals("two", stringArraySample);
		
		List<String> two_to_three = stringList.subList(1, 3);
		assertEquals(2, two_to_three.size());
		assertEquals("two", two_to_three.get(0));
		assertEquals(7, stringList.size());
		
		stringList.set(0, "1");
		assertEquals("1", stringList.get(0));
		
		assertEquals("two", stringList.get(1));
		assertEquals(1, stringList.indexOf("two"));
		assertEquals(6, stringList.lastIndexOf("seven"));
		assert(stringList.contains("three"));
		assert(stringList.containsAll(subStringList));

		
		stringList.remove(6);
		assert(!stringList.contains("seven"));
		
		stringList.remove("six");
		assert(!stringList.contains("six"));
		
		stringList.removeAll(subStringList);
		assert(!stringList.contains("three"));
		assert(!stringList.contains("four"));
		
		List<String>anotherSubList = new ArrayList<String>();
		anotherSubList.add("1");
		anotherSubList.add("five");
		stringList.retainAll(anotherSubList);
		assertEquals(2, stringList.size());
		assertEquals("1", stringList.get(0));
		assertEquals("five", stringList.get(1));
		
		assert(!stringList.isEmpty());
		stringList.clear();
		assert(stringList.isEmpty());
	}
}
