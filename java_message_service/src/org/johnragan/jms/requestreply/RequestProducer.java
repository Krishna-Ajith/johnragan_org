package org.johnragan.jms.requestreply;

import java.util.Hashtable;
import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TemporaryQueue;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/*
 * You need to run the requester first (in order for the replier to respond).
 */
public class RequestProducer {

	public final void produceMessages() {
		Context jndiContext = null;
		try {
			Hashtable env = new Hashtable();
			env.put(Context.INITIAL_CONTEXT_FACTORY,
			  "org.apache.activemq.jndi.ActiveMQInitialContextFactory");
			env.put(Context.PROVIDER_URL,
			  "tcp://localhost:61616");
			
			Properties props = new Properties();
			props.setProperty(Context.INITIAL_CONTEXT_FACTORY,"org.apache.activemq.jndi.ActiveMQInitialContextFactory");
			props.setProperty(Context.PROVIDER_URL,"tcp://localhost:61616");
			
			jndiContext = new InitialContext(props);
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		ConnectionFactory connectionFactory = null;
		Destination destination = null;
		try {
			connectionFactory = (ConnectionFactory) jndiContext.lookup("ConnectionFactory");
			destination = (Destination) jndiContext.lookup("dynamicQueues/requestQueue");
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		Connection connection = null;
        MessageProducer producer = null;
        MessageConsumer consumer = null;
        try {
			connection = connectionFactory.createConnection();
			connection.start();
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			
			producer = session.createProducer(destination);
			
			TextMessage message = session.createTextMessage();
			message.setText("This is the request");
			TemporaryQueue temporaryQueue = session.createTemporaryQueue();
			MessageConsumer responseConsumer = session.createConsumer(temporaryQueue);
			message.setJMSReplyTo(temporaryQueue);
			message.setJMSCorrelationID("unique_correlation_id_1"); // the correlation id
            System.out.println("Sending request: " + message.getText());
            producer.send(message, DeliveryMode.NON_PERSISTENT, 3, 60000);
                   
	        TextMessage reply = (TextMessage) responseConsumer.receive();
	        System.out.println("Reading reply: " + reply.getText());
		} catch (JMSException e) {
			e.printStackTrace();
		} finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException ignore) {}
            }
        }


	}
	
	public static void main(String[] args) {
		RequestProducer simpleProducer = new RequestProducer();
		simpleProducer.produceMessages();
	}
	
	/*
	 * This is used only when experimenting with sending messages of varying 
	 * priorities
	 */
	private void sendPriorityMessage(MessageProducer producer, Session session,
			int priority, String text)
			throws JMSException {
		TextMessage message = session.createTextMessage();
		message.setText(text);
		System.out.println("Sending message: " + message.getText());
		producer.send(message, DeliveryMode.NON_PERSISTENT, priority, 60000);
	}
}
