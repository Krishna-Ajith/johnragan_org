/*
 * SimpleWicketSession.java
 *
 * Created on December 6, 2009, 06:30 AM
 * 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.johnragan.wicket;

import org.apache.wicket.Application;
import org.apache.wicket.Request;
import org.apache.wicket.Response;
import org.apache.wicket.Session;

/**
 *
 * @author John Ragan
 */
public class I18nSession extends Session {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5726434529675965841L;

	@SuppressWarnings("deprecation")
	public I18nSession(Application application, Request request) {
        super(application, request);
    }

    public I18nSession(Request request) {
        super(request);
    }

    public I18nSession(Request request, Response response) {
        super(request);
//        setLocale(new Locale("es", "ES"));
        setLocale(request.getLocale());
    }

    @Override
    public void cleanupFeedbackMessages() {
        getFeedbackMessages().clear();
    }
}