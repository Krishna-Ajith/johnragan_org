package exceptions;

public class ThreadTester {
	public static void main(String[] args) {
		Thread t1 = new ExceptionThread();
		t1.start();
	}
}
