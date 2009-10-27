package exceptions;

public class ExceptionThread extends Thread {
	public ExceptionThread() {
		setName("Exception Thread Name");
		setUncaughtExceptionHandler(
			new SimpleThreadExceptionHandler());
	}
	
	public void run() {
		throw new IllegalArgumentException("just to test");
	}
}
