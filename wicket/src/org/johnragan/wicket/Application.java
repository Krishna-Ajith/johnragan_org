/*
 * Application.java
 *
 * Created on December 6, 2009, 06:30 AM
 */
package org.johnragan.wicket;

import org.apache.wicket.Request;
import org.apache.wicket.Response;
import org.apache.wicket.Session;
import org.apache.wicket.protocol.http.WebApplication;

/** 
 * 
 * Here, we define ourselves as a web application under Wicket.  We declare what
 * to use as the home page of our application, and indicate the class to use
 * for new sessions to play with i18n.
 *
 * @author John Ragan
 * @version 
 */
/**
 * @author John
 *
 */
public class Application extends WebApplication {
    
    @Override
    public Session newSession(Request request, Response response) {
        return new I18nSession(request, response);
    }

    
    public Class<HomePage> getHomePage() {
        return HomePage.class;
    }
}
