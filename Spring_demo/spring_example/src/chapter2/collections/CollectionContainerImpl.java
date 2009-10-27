package chapter2.collections;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import chapter2.springidol.Instrument;

public class CollectionContainerImpl implements CollectionContainer {
	private List<String> list;
	private List<String> set;
	private Map<String, Integer> map;
	private Map<String, String> mapStrings;
	private List<Instrument> instrumentSet;
	
	public void showCollections() {
		System.out.println("PRINTING LIST VALUES (NULL IS OKAY)");
		
		for (String item : list) {
			System.out.println(item);
		}
		
		System.out.println("PRINTING SET VALUES");
		
		for (String item : set) {
			System.out.println(item);
		}
		
		System.out.println("PRINTING MAP VALUES");
		
		System.out.println("Keys:");
		for (String item : map.keySet()) {
			System.out.println(item);
		}
		
		System.out.println("Values:");
		for (Integer item : map.values()) {
			System.out.println(item);
		}
		
		System.out.println("PRINTING PROPS VALUES");
		
		System.out.println("Keys:");
		for (String item : mapStrings.keySet()) {
			System.out.println(item);
		}
		
		System.out.println("Values:");
		for (String item : mapStrings.values()) {
			System.out.println(item);
		}
		
		System.out.println("PRINTING INSTRUMENT SET VALUES");
		
		for (Instrument item : instrumentSet) {
			item.play();
		}
	}
	
	public void setList(List<String> list) {
		this.list = list;
	}
	
	public void setSet(List<String> set) {
		this.set = set;
	}
	
	public void setMap(Map<String, Integer> map) {
		this.map = map;
	}
	
	public void setMapStrings(Map<String, String> mapStrings) {
		this.mapStrings = mapStrings;
	}
	
	public void setInstrumentSet(List<Instrument> instrumentSet) {
		this.instrumentSet = instrumentSet;
	}
}