package org.johnragan.jms.multipleconsumers.queue;

import java.util.Hashtable;
import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
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

public class OneQueueManyConsumers {
	Context jndiContext = null;
	ConnectionFactory connectionFactory = null;
	Destination destination = null;
	
	public OneQueueManyConsumers() {
		setup();
	}
	
	public final void produceMessage() {
		Connection localConnection = null;
        MessageProducer producer = null;
        
        localConnection = createConnection();
        try {
			Session session = localConnection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			producer = session.createProducer(destination);
			
			TextMessage message = session.createTextMessage();
			
			message.setText("This is message ");
            System.out.println("Sending message: " + message.getText());
            producer.send(message, DeliveryMode.NON_PERSISTENT, 3, 30000);
		} catch (JMSException e) {
			e.printStackTrace();
		} finally {
            closeConnection(localConnection);
        }
	}

	
	public final MessageConsumer createAndReadyConsumer(Connection connection) {
		MessageConsumer consumer = null;
		try {
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			//Session session = connection.createSession(false, Session.DUPS_OK_ACKNOWLEDGE);
			//Session session = connection.createSession(false, Session.CLIENT_ACKNOWLEDGE);
	        consumer = session.createConsumer(destination);
	        connection.start();   
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return consumer;
	}
	
	
	public static void main(String[] args) {
		OneQueueManyConsumers oneTopicManyConsumers = new OneQueueManyConsumers();
		
		Connection connection1 = oneTopicManyConsumers.createConnection();
		MessageConsumer consumer1 = oneTopicManyConsumers.createAndReadyConsumer(connection1);
		Connection connection2 = oneTopicManyConsumers.createConnection();
		MessageConsumer consumer2 = oneTopicManyConsumers.createAndReadyConsumer(connection2);
		Connection connection3 = oneTopicManyConsumers.createConnection();
		MessageConsumer consumer3 = oneTopicManyConsumers.createAndReadyConsumer(connection3);
		oneTopicManyConsumers.produceMessage();
		
		TextMessage m1;
		TextMessage m2;
		TextMessage m3;
		try {
			m1 = (TextMessage)consumer1.receive(1000);
			m2 = (TextMessage)consumer2.receive(1000);
			m3 = (TextMessage)consumer3.receive(1000);
			if (m1 != null) System.out.println(m1.getText());
			if (m2 != null) System.out.println(m2.getText());
			if (m3 != null) System.out.println(m3.getText());
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			closeConnection(connection1);
			closeConnection(connection2);
			closeConnection(connection3);
		}
	}

	private static void closeConnection(Connection connection1) {
		if (connection1 != null) {
		    try {
		    	connection1.close();
		    } catch (JMSException ignore) {}
		}
	}
	
	private void setup() {
		jndiContext = null;
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
		
		try {
			connectionFactory = (ConnectionFactory) jndiContext.lookup("ConnectionFactory");
			destination = (Destination) jndiContext.lookup("dynamicQueues/ManyConsumers");
			//destination = (Destination) jndiContext.lookup("dynamicTopics/ManyConsumers");
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
	}
	
	private Connection createConnection() {
		try {
			return connectionFactory.createConnection();
		} catch (JMSException e) {
			e.printStackTrace();
		}
		return null;
	}
}
