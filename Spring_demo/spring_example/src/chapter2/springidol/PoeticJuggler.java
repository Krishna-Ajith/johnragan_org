package chapter2.springidol;

public class PoeticJuggler extends Juggler {
	private Poem poem;
	
	public PoeticJuggler(Poem poem) {
		this.poem = poem;
	}
	
	public PoeticJuggler(int beanbags, Poem poem) {
		super(beanbags);
		this.poem = poem;
	}
	
	public void perform() {
		super.perform();
		System.out.println("WHILE RECITING...");
		poem.recite();
	}
}