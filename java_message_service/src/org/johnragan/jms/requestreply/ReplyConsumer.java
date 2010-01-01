package org.johnragan.jms.requestreply;

import java.util.Hashtable;
import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/*
 * See Producer for instructions
 */
public class ReplyConsumer {
	
	public final void consumeMessages() {
		TextMessage message = null;

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
		MessageConsumer consumer = null;
		MessageProducer producer = null;
		
		try {
			connection = connectionFactory.createConnection();
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
	        consumer = session.createConsumer(destination);
	        connection.start();
	        
	        TextMessage request = (TextMessage) consumer.receive();

	        producer = session.createProducer(request.getJMSReplyTo());
	        Message response = session.createTextMessage("Consumer " + "processed message: " + request.getText());
	        response.setJMSCorrelationID(request.getJMSMessageID());
	        producer.send(response);
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
		ReplyConsumer replyConsumer = new ReplyConsumer();
		replyConsumer.consumeMessages();
	}

}

