package chapter2.springidol;

public class Piano implements Instrument {

	@Override
	public void play() {
		System.out.println(song);
	}
	
	// This is added just for testing abstracting common properties in chapter3.parentchild
	private String song = "Plink plink plink!";
	public void setSong(String song) {
		this.song = song;
	}
}
