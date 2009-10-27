package chapter3.setter_injection;

import chapter2.springidol.Instrument;
import chapter2.springidol.Performer;

public abstract class Instrumentalist3 implements Performer {

	@Override
	public void perform() {
		System.out.println("Playing " + song + " : ");
		getInstrument().play();
	}

	private String song;
	public void setSong(String song) {
		this.song = song;
	}
	
	public abstract Instrument getInstrument();
}
