/*
 * HomePage.java
 *
 * Created on December 6, 2009, 06:30 AM
 */
package org.johnragan.wicket;

import org.apache.wicket.AttributeModifier;
import org.apache.wicket.PageParameters;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.AjaxFormComponentUpdatingBehavior;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.RequiredTextField;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.validation.validator.StringValidator;

/*
 * This java class needs to have a counterpart named HomePage.html
 */
public class HomePage extends BasePage {

	// Initial values for text field
    private String firstName = "Jon";
    private String lastName = "Doe";
    
    // Note that these are Wicket TextField instances
    private TextField<String> firstNameTextField;
    private TextField<String> lastNameTextField;
    
    // This is used similar to a Rails Flash
    private FeedbackPanel flashPanel;

    @SuppressWarnings("serial")
	public HomePage() {
    	// The form needs a corresponding form w/matching id in HomePage.html
        Form<String> form = new Form<String>("theForm");
        add(form);
        
        // The flashPanel needs a corresponding span w/matching id in HomePage.html
        flashPanel = new FeedbackPanel("flash");
        // This is necessary for AJAX updating
        flashPanel.setOutputMarkupId(true);
        // As these exist under the form in HomePage.html, they are added to the 
        //form instead of the page here.
        form.add(flashPanel);
        
        firstNameTextField = new TextField<String>("fname", new PropertyModel<String>(this, "firstName"));
        firstNameTextField.add(new AttributeModifier("class", true, new Model<String>("bluetext")));
        firstNameTextField.setRequired(true);
        firstNameTextField.add(StringValidator.maximumLength(10));
        firstNameTextField.add(new AjaxFormComponentUpdatingBehavior("onblur") {

            @Override
            protected void onUpdate(AjaxRequestTarget target) {
                info("You left the field");
                target.addComponent(flashPanel);
            }
        });
        firstNameTextField.add(new AjaxFormComponentUpdatingBehavior("ondblclick") {

            @Override
            protected void onUpdate(AjaxRequestTarget target) {
                error("You double clicked");
                target.addComponent(flashPanel);
            }
        });
        form.add(firstNameTextField);
        
        lastNameTextField = new RequiredTextField<String>("lname", new PropertyModel<String>(HomePage.this, "lastName"));
        form.add(lastNameTextField);
        
        Button submit = new Button("submitform") {
            @Override
            public void onSubmit() {
                super.onSubmit();
                PageParameters params = new PageParameters();
                params.add("fname", getFirstName());
                params.add("lname", getLastName());
                setResponsePage(SecondPage.class, params);
            }
        };
        form.add(submit);
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
