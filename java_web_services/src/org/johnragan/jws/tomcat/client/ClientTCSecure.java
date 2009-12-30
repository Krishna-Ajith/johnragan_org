package org.johnragan.jws.tomcat.client;

import java.util.Map;

import javax.xml.ws.BindingProvider;

import org.johnragan.jws.tomcat.client.wsimport.TempConvert;
import org.johnragan.jws.tomcat.client.wsimport.TempConvertImplService;

public class ClientTCSecure {
	private static final String endpoint = "https://localhost:8443/jws/tc";
	public static void main(String args[]) throws Exception {
		TempConvertImplService service = new TempConvertImplService();
		TempConvert port = service.getTempConvertImplPort();
		
		Map<String, Object> req_ctx = ((BindingProvider) port).getRequestContext();
		req_ctx.put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
		
		BindingProvider prov = (BindingProvider)port;
		prov.getRequestContext().put(BindingProvider.USERNAME_PROPERTY, "fred");
		prov.getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, "rockbed");
		
		System.out.println("f2c(-40.1) ==> " + port.f2C(-40.1f));
		System.out.println("c2f(-40.1) ==> " + port.c2F(-40.1f));
		System.out.println("f2c(+98.7) ==> " + port.f2C(+98.7f));
	}
}
