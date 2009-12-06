/*
 * I18nSession.java
 *
 * Created on December 6, 2009, 06:30 AM
 * 
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

    /*
     * This is altered to use the client locale.  Try configuring your browser
     * to use spanish in Spain or French in France to see the localization
     * take effect.  Validation error messages are automatically switched,
     * and the properties files are set in Spanish and French.
     */
    public I18nSession(Request request, Response response) {
        super(request);
        setLocale(request.getLocale());
    }

    @Override
    public void cleanupFeedbackMessages() {
        getFeedbackMessages().clear();
    }
}