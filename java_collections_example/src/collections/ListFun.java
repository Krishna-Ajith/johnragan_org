package collections;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class ListFun {
	public static void main(String[] args) {
		ListFun listFun = new ListFun();
		listFun.regularArrayList();
	}

	public void regularArrayList() {
		List<String> stringList = getConcreteImpl();
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
		
		System.out.println("This is toString: " + stringList.toString());
		System.out.println("Using an interator to go through the contents.");
		Iterator<String> iterator = stringList.iterator();
		while (iterator.hasNext()) {
			System.out.println(iterator.next());
			// iterator.remove();  // This would also remove, if we wanted to.
		}
		
		System.out.println("size should be 7 : " + stringList.size());
		
		Object[] the_array = stringList.toArray();
		String objectArraySample = (String)the_array[1];
		String[] string_array = new String[1]; 
		string_array = stringList.toArray(string_array);
		String stringArraySample = string_array[1];
		System.out.println("object and string array position 1 should be 'two': " + objectArraySample + ", " + stringArraySample);
		
		List<String> two_to_three = stringList.subList(1, 3);
		System.out.println("sub list should be two long : " + two_to_three.size() + 
				", and first should be 'two' : " + two_to_three.get(0) +
				", and original should still be seven long : " + stringList.size());
		
		stringList.set(0, "1");
		System.out.println("First entry should be '1', not 'one' : " + stringList.get(0));
		
		System.out.println("List element at position 1 should be 'two': " + stringList.get(1));
		System.out.println("List element index for 'two' should be 1: " + stringList.indexOf("two"));
		System.out.println("Last element of List for 'seven' should be 6: " + stringList.lastIndexOf("seven"));
		System.out.println("List contains the string 'three': " + stringList.contains("three"));
		System.out.println("List contains the elements 'three' and 'four': " + stringList.containsAll(subStringList));
		
		stringList.remove(6);
		System.out.println("List no longer contains 'seven' at pos 6: " + !stringList.contains("seven"));
		
		stringList.remove("six");
		System.out.println("List no longer contains 'six': " + !stringList.contains("six"));
		
		stringList.removeAll(subStringList);
		System.out.println("List no longer contains 'three' and 'four': " + !stringList.contains("three") + ", " + !stringList.contains("four"));
		System.out.println(stringList);
		
		List<String>anotherSubList = new ArrayList<String>();
		anotherSubList.add("1");
		anotherSubList.add("five");
		stringList.retainAll(anotherSubList);
		System.out.println("size should be 2 : " + stringList.size() + ", first is '1' : " + stringList.get(0) 
				+ ", last is 'five' : " + stringList.get(1));
		
		System.out.println("List is empty before clearing:  " + stringList.isEmpty());
		stringList.clear();
		System.out.println("List is empty after clearing:  " + stringList.isEmpty());
	}

	private List<String> getConcreteImpl() {
		return new ArrayList<String>();
//		return new LinkedList<String>();
	}
}
