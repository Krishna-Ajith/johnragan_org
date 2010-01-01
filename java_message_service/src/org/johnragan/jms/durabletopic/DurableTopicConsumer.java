package org.johnragan.jms.durabletopic;

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
import javax.jms.Topic;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/*
 * See Producer for instructions
 * 
 * On this side, play with the various acknowledgment models.  Note that
 * when you CLIENT_ACKNOWLEDGE and don't use the acknowledge method (commented out), you
 * can run the client over and over again and it will continue to get
 * the original method.
 */
public class DurableTopicConsumer {
	
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
			destination = (Destination) jndiContext.lookup("dynamicTopics/SomeDurableTopic");
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		Connection connection = null;
		MessageConsumer consumer = null;
		Session session = null;
		try {
			connection = connectionFactory.createConnection();
			connection.setClientID("foshizzle");
			session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
	        consumer = session.createDurableSubscriber((Topic)destination, connection.getClientID());
	        connection.start();
	        
	        TextMessage m = (TextMessage) consumer.receive();
	        System.out.println("Reading message: " + m.getText());
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
            if (connection != null) {
                try {
                	if (consumer != null) {
                		consumer.close();
                	}
                	if (session != null) {
                		session.unsubscribe(connection.getClientID());
                	}
                    connection.close();
                } catch (JMSException ignore) {}
            }
        } 
	}

	public static void main(String[] args) {
		DurableTopicConsumer simpleConsumer = new DurableTopicConsumer();
		simpleConsumer.consumeMessages();
	}

}
