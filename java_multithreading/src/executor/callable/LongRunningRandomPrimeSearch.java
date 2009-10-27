package executor.callable;

import java.math.BigInteger;
import java.util.concurrent.TimeUnit;

import futuretask.RandomPrimeSearch;

public class LongRunningRandomPrimeSearch extends RandomPrimeSearch {
	public LongRunningRandomPrimeSearch(int bitSize) {
	    super(bitSize);
	}
	
	public BigInteger call() {
		BigInteger result = super.call();
		
		try {
			TimeUnit.SECONDS.sleep(5);
		} catch(InterruptedException ignored) {}  
		
		return result;
	}
}
