package org.johnragan.jms.simple.sync;

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
 * 
 * On this side, play with the various acknowledgment models.  Note that
 * when you CLIENT_ACKNOWLEDGE and don't use the acknowledge method (commented out), you
 * can run the client over and over again and it will continue to get
 * the original method.
 */
public class SimpleSyncConsumer {
	
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
			destination = (Destination) jndiContext.lookup("dynamicQueues/SyncQueue");
			//destination = (Destination) jndiContext.lookup("dynamicTopics/SyncTopic");
		} catch (NamingException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		Connection connection = null;
		MessageConsumer consumer = null;
		
		try {
			connection = connectionFactory.createConnection();
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			//Session session = connection.createSession(false, Session.DUPS_OK_ACKNOWLEDGE);
			//Session session = connection.createSession(false, Session.CLIENT_ACKNOWLEDGE);
	        consumer = session.createConsumer(destination);
	        connection.start();
	        
	        while (true) {
                Message m = consumer.receive(1);

                if (m != null) {
                    if (m instanceof TextMessage) {
                        message = (TextMessage) m;
                        System.out.println("Reading message: " +
                            message.getText());
                        //message.acknowledge();
                    } else {
                    	//m.acknowledge();
                        break;
                    }
                }
            }

		} catch (JMSException e) {
			// TODO Auto-generated catch block
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
		SimpleSyncConsumer simpleConsumer = new SimpleSyncConsumer();
		simpleConsumer.consumeMessages();
	}

}
