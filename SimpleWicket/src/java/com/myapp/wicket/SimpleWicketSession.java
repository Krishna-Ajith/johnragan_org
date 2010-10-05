/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.myapp.wicket;

import java.util.Locale;
import org.apache.wicket.Application;
import org.apache.wicket.Request;
import org.apache.wicket.Response;
import org.apache.wicket.Session;

/**
 *
 * @author Richard Rowe
 */
public class SimpleWicketSession extends Session {

    public SimpleWicketSession(Application application, Request request) {
        super(application, request);
    }

    public SimpleWicketSession(Request request) {
        super(request);
    }

    public SimpleWicketSession(Request request, Response response) {
        super(request);
        setLocale(new Locale("us", "US"));
//        setLocale(new Locale("es", "ES"));
//        setLocale(request.getLocale());
    }

    @Override
    public void cleanupFeedbackMessages() {
        getFeedbackMessages().clear();
    }
}
