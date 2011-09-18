package futuretask;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.Callable;

public class RandomPrimeSearch implements Callable<BigInteger> {

  private static final Random prng = new SecureRandom();
  private int bitSize;
 
  public RandomPrimeSearch(int bitSize) {
    this.bitSize = bitSize;
  }

  public BigInteger call() {
	  
	// Uncomment this out to see how it will wait on task.get() for a long running operation
//	try {
//		java.util.concurrent.TimeUnit.SECONDS.sleep(4);
//	} catch(InterruptedException ignored) {}  
	  
    return BigInteger.probablePrime(bitSize, prng);
  }
}

