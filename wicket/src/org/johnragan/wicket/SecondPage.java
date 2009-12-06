/*
 * SecondPage.java
 *
 * Created on December 6, 2009, 06:30 AM
 * 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package org.johnragan.wicket;

import org.apache.wicket.PageParameters;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;

/**
 *
 * @author Richard Rowe
 */
public class SecondPage extends BasePage {

    private Label firstNameLabel;
    private Label lastNameLabel;

    public SecondPage() {
        init("", "");
    }

    public SecondPage(PageParameters parameters) {

        String firstName = parameters.getString("firstNameParam");
        String lastName = parameters.getString("lastNameParam");
        init(firstName, lastName);

    }

    public SecondPage(String firstName, String lastName) {
        init(firstName, lastName);
    }

    private void init(String firstName, String lastName) {
        firstNameLabel = new Label("firstName", new Model(firstName));
        lastNameLabel = new Label("lastName", new Model(lastName));
        add(firstNameLabel);
        add(lastNameLabel);
    }
}
