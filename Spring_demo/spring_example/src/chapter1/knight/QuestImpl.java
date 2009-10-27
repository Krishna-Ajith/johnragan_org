package chapter1.knight;

public class QuestImpl implements Quest {

	private String questName;

	@Override
	public String embark() {
		return questName;
	}

	public void setQuestName(String questName) {
		this.questName = questName;
	}
}
