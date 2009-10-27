package chapter1.knight;

public class Minstrel {
	
	public void singBefore(Knight knight) {
		System.out.println("Fa la la; Sir " + knight.getName() + " is so brave!");
	}
	
	public void singAfter(Knight knight) {
		System.out.println("Tee-hee-hee; Sir " + knight.getName() + " did embark on a quest!");
	}
}
