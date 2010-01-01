package org.johnragan.jms.simple.async;

import java.util.Hashtable;
import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/*
 * Because we are using topics, you need to run the consumer first and then the
 * producer, since it won't see messages created prior to it starting up.
 * It it worth trying it with queues and running the producer first.
 */
public class SimpleAsyncProducer {

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
			//destination = (Destination) jndiContext.lookup("dynamicQueues/AsyncQueue");
			destination = (Destination) jndiContext.lookup("dynamicTopics/AsyncTopic");
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		Connection connection = null;
        MessageProducer producer = null;
        
        try {
			connection = connectionFactory.createConnection();
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			producer = session.createProducer(destination);
			
			TextMessage message = session.createTextMessage();
			
			message.setText("This is message ");
            System.out.println("Sending message: " + message.getText());
            producer.send(message);
            
            // This program is the same as the Sync one, except the next line is commented out:
            //producer.send(session.createMessage());

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
		SimpleAsyncProducer simpleProducer = new SimpleAsyncProducer();
		simpleProducer.produceMessages();
	}
}
