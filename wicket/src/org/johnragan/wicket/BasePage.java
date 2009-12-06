/*
 * BasePage.java
 *
 * Created on December 6, 2009, 06:30 AM
 */
 
package org.johnragan.wicket;           

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.model.IModel;
import org.apache.wicket.markup.html.resources.StyleSheetReference;

/** 
 *
 * @author John Ragan
 * @version 
 */

public class BasePage extends WebPage {

    /**
     * Constructor
     */
    public BasePage() {
        this(null);
    }
    
    /**
     * Construct.
     * @param model
     */
    public BasePage(IModel<Object> model) {
        super(model);
        add(new HeaderPanel("mainNavigation", "wicket demo application"));
        add(new StyleSheetReference("stylesheet", BasePage.class, "style.css"));
    }
}
