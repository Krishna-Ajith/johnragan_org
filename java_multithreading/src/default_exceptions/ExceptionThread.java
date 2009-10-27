package default_exceptions;

public class ExceptionThread extends Thread {
	public ExceptionThread() {
		setName("Exception Thread Name");
	}
	
	public void run() {
		throw new IllegalArgumentException("just to test");
	}
}
