package default_exceptions;

import java.lang.Thread.UncaughtExceptionHandler;

public class SimpleThreadExceptionHandler implements UncaughtExceptionHandler {

	@Override
	public void uncaughtException(Thread t, Throwable e) {
		System.err.printf("%s: %s at line %d of %s%n",
			t.getName(),
			e.toString(),
			e.getStackTrace()[0].getLineNumber(),
			e.getStackTrace()[0].getFileName());
		System.err.println("Now that I have caught the exception generally, I can also specify that additional actions take place");
	}

}
