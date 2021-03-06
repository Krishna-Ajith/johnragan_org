package org.johnragan.jws.tomcat.client;

import org.johnragan.jws.tomcat.client.wsimport.TempConvert;
import org.johnragan.jws.tomcat.client.wsimport.TempConvertImplService;

public class ClientTC {
	public static void main(String args[]) throws Exception {
		TempConvertImplService service = new TempConvertImplService();
		TempConvert port = service.getTempConvertImplPort();
		
		System.out.println("f2c(-40.1) ==> " + port.f2C(-40.1f));
		System.out.println("c2f(-40.1) ==> " + port.c2F(-40.1f));
		System.out.println("f2c(+98.7) ==> " + port.f2C(+98.7f));
	}
}
