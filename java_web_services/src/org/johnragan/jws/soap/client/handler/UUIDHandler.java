package org.johnragan.jws.soap.client.handler;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

import javax.xml.namespace.QName;
import javax.xml.soap.SOAPConstants;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPHeaderElement;
import javax.xml.soap.SOAPMessage;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;

public class UUIDHandler implements SOAPHandler<SOAPMessageContext> {
	public boolean handleMessage(SOAPMessageContext ctx) {
		Boolean request_p = (Boolean) ctx.get(MessageContext.MESSAGE_OUTBOUND_PROPERTY);
		// Is this an outgoing request (client-side?)
		if (request_p) {
			UUID uuid = UUID.randomUUID();
			try {
				SOAPMessage msg = ctx.getMessage();
				SOAPEnvelope env = msg.getSOAPPart().getEnvelope();
				SOAPHeader hdr = env.getHeader();
				if (hdr == null) {
					hdr = env.addHeader();
				}
				
				QName qname = new QName("http://org.johnragan.jws.soap.server", "uuid");
				SOAPHeaderElement helem = hdr.addHeaderElement(qname);
				helem.setActor(SOAPConstants.URI_SOAP_ACTOR_NEXT); // default
				helem.addTextNode(uuid.toString());
				msg.saveChanges();
				msg.writeTo(System.out);
			}
			catch (SOAPException e) { System.err.println(e); }
			catch (IOException e) { System.err.println(e); }
		}
		return true; // continue down the train
	}
	
	public boolean handleFault(SOAPMessageContext ctx) {
		try {
			ctx.getMessage().writeTo(System.out);
		}
		catch (SOAPException e) { System.out.println(e); }
		catch (IOException e) { System.out.println(e); }
		return true;
	}
	
	public Set<QName> getHeaders() {
		return null;
	}
	
	public void close(MessageContext messageContext) {
		
	}
}
