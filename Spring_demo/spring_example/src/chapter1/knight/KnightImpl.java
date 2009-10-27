package chapter1.knight;

public class KnightImpl implements Knight {

	private Quest quest;
	private String name;

	@Override
	public void embarkOnQuest() {
		System.out.println("embarking on quest " + quest.embark());

	}
	
	public void setQuest(Quest quest) {
		this.quest = quest;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
}
