package org.johnragan.jms.localtransaction;

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
 * Flip back and forth between commit and rollback below.  With commit, you
 * will only get the message that one time.  With rollback, you will continue to
 * get the messages.
 */
public class RollbackConsumer {
	
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
			Session session = connection.createSession(true, 0);
	        consumer = session.createConsumer(destination);
	        connection.start();
	        
	        while (true) {
                Message m = consumer.receive(1);

                if (m != null) {
                    if (m instanceof TextMessage) {
                        message = (TextMessage) m;
                        System.out.println("Reading message: " +
                            message.getText());
                    } else {
                        break;
                    }
                }
            }
	        //session.commit();
	        session.rollback();

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
		RollbackConsumer simpleConsumer = new RollbackConsumer();
		simpleConsumer.consumeMessages();
	}

}
