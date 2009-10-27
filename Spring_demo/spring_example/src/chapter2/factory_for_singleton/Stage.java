package chapter2.factory_for_singleton;

public class Stage {
	private Stage() {}
	
	private static class StageSingletonHolder {
		static Stage instance = new Stage();
	}
	
	public static Stage getInstance() {
		return StageSingletonHolder.instance;
	}
	
	public void pullCurtain() {
		System.out.println("Pull the curtain!");
	}
}
