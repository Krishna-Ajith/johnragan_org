package org.johnragan.https;

import java.net.URL;
import javax.net.ssl.HttpsURLConnection;
import java.net.MalformedURLException;
import java.security.cert.Certificate;
import java.io.IOException;

class SunClient {
    private static final String url_s = "https://java.sun.com:443";

    // Send a GET request and print the response status code.
    public static void main(String[ ] args) {
	new SunClient().do_it();
    }
    private void do_it() {
	try {
	    URL url = new URL(url_s);
            HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            conn.setDoInput(true);
	    conn.setRequestMethod("GET");
	    conn.connect();
	    dump_features(conn);
	}
	catch(MalformedURLException e) { System.err.println(e); }
	catch(IOException e) { System.err.println(e); }
    }
    private void dump_features(HttpsURLConnection conn) {
	try {
	    print("Status code:  " + conn.getResponseCode());
	    print("Cipher suite: " + conn.getCipherSuite());
	    Certificate[ ] certs = conn.getServerCertificates();
	    for (Certificate cert : certs) {
		print("\tCert. type: " + cert.getType());
		print("\tHash code:  " + cert.hashCode());
		print("\tAlgorithm:  " + cert.getPublicKey().getAlgorithm());
		print("\tFormat:     " + cert.getPublicKey().getFormat());
		print("");
	    }
	    
	}
	catch(Exception e) { System.err.println(e); }
    }

    private void print(String s) {
	System.out.println(s);
    }
}

