/*
 * Application.java
 *
 * Created on November 6, 2009, 10:16 AM
 */
package org.johnragan.wicket;

import org.apache.wicket.Request;
import org.apache.wicket.Response;
import org.apache.wicket.Session;
import org.apache.wicket.protocol.http.WebApplication;

/** 
 *
 * @author Richard Rowe
 * @version 
 */
public class Application extends WebApplication {

    public Application() {
    }

    @Override
    public Session newSession(Request request, Response response) {
        return new SimpleWicketSession(request, response);
//        return super.newSession(request, response);
    }

    public Class getHomePage() {
        return HomePage.class;
//        return Child.class;
    }
}
