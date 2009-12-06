/*
 * HeaderPanel.java
 *
 * Created on December 6, 2009, 06:30 AM
 */
 
package org.johnragan.wicket;           

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

/** 
 *
 * @author John Ragan
 * @version 
 */

/*
 * It extends
 */
public class HeaderPanel extends Panel {

    /**
     * Construct.
     * @param componentName name of the component
     * @param exampleTitle title of the example
     */

    public HeaderPanel(String componentName, String exampleHeaderText)
    {
        super(componentName);
        // There must be a corresponding span with an id of 'exampleHeader' in HeaderPanel.html
        add(new Label("exampleHeader", exampleHeaderText));
    }

}
