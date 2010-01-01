package org.johnragan.jms.localtransaction;

import java.util.Hashtable;
import java.util.Properties;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
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
 * 
 * It it worth trying it with queues and running the producer first.
 * 
 * It is also worth, with the queue, running the producer, restarting ActiveMQ,
 * and then running the consumer and seeing the message is still held in the queue.
 * 
 * Also, change the time to live from two minutes to 5 seconds, and then wait
 * longer than that for the consumer to try and retrieve - it cannot.
 * 
 * Change the delivery mode to NON_PERSISTENT, and then restart ActiveMQ between
 * sending and consuming - the message is lost.
 * 
 * Uncomment the code to send messages of varying priority, worse priority first.
 * In ActiveMQ, I noticed that it seems to ignore priority.
 */
public class MultipleMessageProducer {

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
			destination = (Destination) jndiContext.lookup("dynamicQueues/SyncQueue");
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		Connection connection = null;
        MessageProducer producer = null;
        
        try {
			connection = connectionFactory.createConnection();
			Session session = connection.createSession(true, 0);
			producer = session.createProducer(destination);
            
            sendPriorityMessage(producer, session, 1, "This is low priority message message ");
            sendPriorityMessage(producer, session, 5, "This is medium priority message message ");
            sendPriorityMessage(producer, session, 9, "This is high priority message message ");
            producer.send(session.createMessage(), DeliveryMode.NON_PERSISTENT, 3, 60000);
            session.commit();
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
		MultipleMessageProducer simpleProducer = new MultipleMessageProducer();
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
