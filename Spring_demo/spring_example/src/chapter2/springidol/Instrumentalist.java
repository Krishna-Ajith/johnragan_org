package chapter2.springidol;

public class Instrumentalist implements Performer {

	public void perform() {
		if (instrument == null) {
			throw new IllegalArgumentException("Can't perform if instrument is null");
		}
		System.out.print("Playing " + song + " : ");
		instrument.play();
	}
	
	private String song;
	public void setSong(String song) {
		this.song = song;
	}
	
	private Instrument instrument;
	public void setInstrument(Instrument instrument) {
		this.instrument = instrument;
	}
	
	// Not needed for Spring - just for an example for comparing with prototype scope in chapter2.prototype
	public Instrument getInstrument() {
		return instrument;
	}
	
	public Instrumentalist() {}

	public Instrumentalist(Instrument instrument) {
		this.instrument = instrument;
	}
	
	public void tuneInstrument() {
		System.out.println("Tuning the instrument");
	}
	
	public void cleanInstrument() {
		System.out.println("Cleaning the instrument");
	}
}
