package chapter3.method_injection;

import chapter2.springidol.Performer;

public class Magician implements Performer {

	@Override
	public void perform() {
		System.out.println(magicWords);
		System.out.println("The magic box contains...");
		System.out.println(magicBox.getContents());
	}
	
	private String magicWords;
	public void setMagicWords(String magicWords) {
		this.magicWords = magicWords;
	}
	
	private MagicBox magicBox;
	public void setMagicBox(MagicBox magicBox) {
		this.magicBox = magicBox;
	}

}
