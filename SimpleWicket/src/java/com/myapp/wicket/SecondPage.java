/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.myapp.wicket;

import org.apache.wicket.PageParameters;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;

/**
 *
 * @author Richard Rowe
 */
public class SecondPage extends BasePage {

    private Label fName;
    private Label lName;

    public SecondPage() {
        init("", "");
    }

    public SecondPage(PageParameters parameters) {

        String firstName = parameters.getString("fname");
        String lastName = parameters.getString("lname");
        init(firstName, lastName);

    }

    public SecondPage(String firstName, String lastName) {
        init(firstName, lastName);
    }

    private void init(String firstName, String lastName) {
        fName = new Label("fname", new Model(firstName));
        lName = new Label("lname", new Model(lastName));
        add(fName);
        add(lName);
    }
}
