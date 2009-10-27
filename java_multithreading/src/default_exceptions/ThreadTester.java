package default_exceptions;

public class ThreadTester {
	public static void main(String[] args) {
		Thread.setDefaultUncaughtExceptionHandler(new SimpleThreadExceptionHandler());
		Thread t1 = new ExceptionThread();
		t1.start();
	}
}
