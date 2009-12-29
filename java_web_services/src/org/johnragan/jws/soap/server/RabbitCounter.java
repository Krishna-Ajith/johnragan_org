package org.johnragan.jws.soap.server;

import javax.jws.HandlerChain;
import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

@WebService(targetNamespace = "http://org.johnragan.jws.soap.server")
@SOAPBinding(	style = SOAPBinding.Style.DOCUMENT,
				use = SOAPBinding.Use.LITERAL,
				parameterStyle = SOAPBinding.ParameterStyle.WRAPPED)
@HandlerChain(file="handler-chain-server.xml")
public class RabbitCounter {
	
	@WebMethod
	public int countRabbits(int n) throws FibException {
		if (n < 0) {
			throw new FibException("Negative arguments not allowed:  ", n + " < 0");
		}
		
		// Rather than get fancy, just return 17 to keep simple
		return 17;
	}
}
