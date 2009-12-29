package org.johnragan.jws.amazon;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class AmazonKeys {
	public final static String getAccessKey() {
		return getContentsFromFile("/Users/John/amazon_access.key");
	}
	
	public final static String getSecretKey() {
		return getContentsFromFile("/Users/John/amazon_secret.key");
	}
	
	private final static String getContentsFromFile(String path) {
		File file = new File(path);
		if (file.exists()) {
			return getContents(file).trim();
		}
		else {
			throw new IllegalArgumentException("EASY FIX - You need to define a file to contain your amazon secret key or secret, or just return it.  I did not want to check in my secret keys into GitHub.  See code.");
		}
	}
	
	// TODO - Below is copied - clean up the formatting
	
	private final static String getContents(File aFile) {
	    //...checks on aFile are elided
	    StringBuilder contents = new StringBuilder();
	    
	    try {
	      //use buffering, reading one line at a time
	      //FileReader always assumes default encoding is OK!
	      BufferedReader input =  new BufferedReader(new FileReader(aFile));
	      try {
	        String line = null; //not declared within while loop
	        /*
	        * readLine is a bit quirky :
	        * it returns the content of a line MINUS the newline.
	        * it returns null only for the END of the stream.
	        * it returns an empty String if two newlines appear in a row.
	        */
	        while (( line = input.readLine()) != null){
	          contents.append(line);
	          contents.append(System.getProperty("line.separator"));
	        }
	      }
	      finally {
	        input.close();
	      }
	    }
	    catch (IOException ex){
	      ex.printStackTrace();
	    }
	    
	    return contents.toString();
	}
	
	static public void setContents(File aFile, String aContents)
    throws FileNotFoundException, IOException {
if (aFile == null) {
throw new IllegalArgumentException("File should not be null.");
}
if (!aFile.exists()) {
throw new FileNotFoundException ("File does not exist: " + aFile);
}
if (!aFile.isFile()) {
throw new IllegalArgumentException("Should not be a directory: " + aFile);
}
if (!aFile.canWrite()) {
throw new IllegalArgumentException("File cannot be written: " + aFile);
}

//use buffering
Writer output = new BufferedWriter(new FileWriter(aFile));
try {
//FileWriter always assumes default encoding is OK!
output.write( aContents );
}
finally {
output.close();
}
}

}
