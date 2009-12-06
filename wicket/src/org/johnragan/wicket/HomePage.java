/*
 * HomePage.java
 *
 * Created on November 6, 2009, 10:16 AM
 */
package org.johnragan.wicket;

import java.util.Locale;
import org.apache.wicket.AttributeModifier;
import org.apache.wicket.PageParameters;
import org.apache.wicket.ajax.AjaxEventBehavior;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.AjaxFormComponentUpdatingBehavior;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.IFormSubmittingComponent;
import org.apache.wicket.markup.html.form.RequiredTextField;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.validation.validator.StringValidator;

public class HomePage extends BasePage {

    private String firstName = "";
    private String lastName = "";
    TextField fName;
    TextField lName;
    FeedbackPanel feedbackPanel;

    public HomePage() {

        Form<Form> f = new Form<Form>("f");

        add(f);
        fName = new TextField("fname", new PropertyModel(this, "firstName"));
//        RequiredTextField<String> fName = new RequiredTextField<String>("fname", new PropertyModel(HomePage.this, "firstName"));
//        fName.add(new AttributeModifier("class", true, new Model("bluetext")));
        lName = new TextField("lname", new PropertyModel(this, "lastName"));
//        FeedbackPanel feedbackPanel = new FeedbackPanel("feedback");
        feedbackPanel = new FeedbackPanel("feedback");
        feedbackPanel.setOutputMarkupId(true);
//        fName.add(new AjaxEventBehavior("ondblclick") {
//
//            @Override
//            protected void onEvent(AjaxRequestTarget target) {
//                System.out.println("ondblclick event fired");
//            }
//        });
//        fName.add(new AjaxFormComponentUpdatingBehavior("onblur") {
//
//            @Override
//            protected void onUpdate(AjaxRequestTarget target) {
//                info("Wait.... don't go yet");
//                target.addComponent(feedbackPanel);
//            }
//        });
        fName.add(new AjaxFormComponentUpdatingBehavior("ondblclick") {

            @Override
            protected void onUpdate(AjaxRequestTarget target) {
                System.out.println("ondblclick event fired");
                error("OUCH! That hurt");
                target.addComponent(feedbackPanel);
            }
        });
        fName.setRequired(true);
        fName.add(StringValidator.maximumLength(50));
//        lName.setRequired(true);
//        lName.add(StringValidator.maximumLength(50));
        f.add(fName);
        f.add(lName);
        Button submit = new Button("submitform") {

            @Override
            public void onSubmit() {
                super.onSubmit();
//                System.out.println("inside onSubmit of button");
                PageParameters params = new PageParameters();
                params.add("fname", getFirstName());
                params.add("lname", getLastName());
//                setResponsePage(new SecondPage(getFirstName(), getLastName()));
                setResponsePage(SecondPage.class, params);
            }
        };
//        Button submit = new Button("submitform");
        f.add(submit);
        f.add(feedbackPanel);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
