package org.johnragan.jws.soap.server.handler;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;

import javax.xml.namespace.QName;
import javax.xml.soap.Node;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConstants;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPFault;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPMessage;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;
import javax.xml.ws.soap.SOAPFaultException;

public class UUIDValidator implements SOAPHandler<SOAPMessageContext> {
	private static final int UUIDvariant = 2; // layout
	private static final int UUIDversion = 4; // version

	@Override
	public Set<QName> getHeaders() {
		return null;
	}

	@Override
	public void close(MessageContext context) {}

	@Override
	public boolean handleFault(SOAPMessageContext context) {
		return true;
	}

	@Override
	public boolean handleMessage(SOAPMessageContext ctx) {
		Boolean response_p = (Boolean) ctx.get(MessageContext.MESSAGE_OUTBOUND_PROPERTY);
		if (!response_p) {
			try {
				SOAPMessage msg = ctx.getMessage();
				SOAPEnvelope env = msg.getSOAPPart().getEnvelope();
				SOAPHeader hdr = env.getHeader();
				
				// Uncomment this to mimic failing on testing the UUID header.
				//generateSOAPFault(msg, "TESTING 123");
				
				if (hdr == null) {
					generateSOAPFault(msg, "No Message header.");
				}
				
				Iterator it = hdr.extractHeaderElements(SOAPConstants.URI_SOAP_ACTOR_NEXT);
				if (it == null || !it.hasNext()) {
					generateSOAPFault(msg, "No header block for next actor.");
				}
				Node next = (Node) it.next();
				String value = (next == null) ? null : next.getValue();
				if (value == null) {
					generateSOAPFault(msg, "No UUID in header block.");
				}
				
				UUID uuid = UUID.fromString(value.trim());
				if (uuid.variant() != UUIDvariant ||
					uuid.version() != UUIDversion) {
						generateSOAPFault(msg, "Bad UUID variant or version.");
				}
			}
			catch(SOAPException e) { System.err.println(e); }
		}
		return true;
	}
	
	private void generateSOAPFault(SOAPMessage msg, String reason) {
		try {
			SOAPBody body = msg.getSOAPPart().getEnvelope().getBody();
			SOAPFault fault = body.addFault();
			fault.setFaultString(reason);
			throw new SOAPFaultException(fault);
		} catch (SOAPException e) { }
	}
}
