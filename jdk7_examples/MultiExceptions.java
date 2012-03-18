import java.io.*;

// Closeable interface
// void close() throws IOException

public class MultiExceptions {
	public static void main(String[] args) {
		try{
			BufferedReader br = new BufferedReader(new FileReader("foo.in"));
		} 
		catch (final FileNotFoundException | IOException ex){}
		catch (Exception e3) {}
	}
}