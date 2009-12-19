package org.johnragan.jws.basics;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

public class TimeClient {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		//URL url = new URL("http://localhost:9876/jws/basics?wsdl");
		URL url = new URL("http://localhost:8892/ts?wsdl");
		QName qname = new QName("http://basics.jws.johnragan.org/", "TimeServerImplService");
		Service service = Service.create(url, qname);
		TimeServer eif = service.getPort(TimeServer.class);
		System.out.println(eif.getTimeAsString());
		System.out.println(eif.getTimeAsElapsed());
	}
}
