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
        // form instead of the page here.
        form.add(flashPanel);
        
        // This field needs a corresponding input named 'firstNameInput' in HomePage.html.
        // The PropertyModel associates this input field's value with the JavaBean property
        // firstName, which is defined on HomePage via getters and setters.  As firstName is set to
        // "Jon" above, it will grab that and set the default value to "Jon" in the html.
        firstNameTextField = new TextField<String>("firstNameInput", new PropertyModel<String>(this, "firstName"));
        
        // AttributeModifier's modify HTML attributes.  Here we set the corresponding HTML input's
        // class attribute to "bluetext", which renders it as blue via the CSS rule for a class of "bluetext".
        // As you type in the firstName field, you will see blue text.
        firstNameTextField.add(new AttributeModifier("class", true, new Model<String>("bluetext")));
        
        // This is similar to validation in Rails models.  By setting it to true, it will
        // automatically validate for me on submission.  On failing validation, it
        // gets reported on the FeedbackForm "flashPanel".  In addition, the failure message
        // is automatically generated, and automatically "translated" in other Locales.
        firstNameTextField.setRequired(true);
        firstNameTextField.add(StringValidator.maximumLength(10));
        
        // The following two add some DHTML behavior.  info renders in green, while
        // error renders in red on the flash panel.
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
        // As this exists on the form in HomePage.html, it needs to be added here.
        form.add(firstNameTextField);
        
        // Here is a textfield which automatically performs require validation.
        lastNameTextField = new RequiredTextField<String>("lastNameInput", new PropertyModel<String>(HomePage.this, "lastName"));
        form.add(lastNameTextField);
        
        Button submit = new Button("submitform") {
        	// When the submit button is clicked, the following code is invoked.
        	// It gets the parameters returned from the form, decides which
        	// page to bring up and passes those parameter.  Like this page,
        	// The SecondPage's constructor will configure it appropriately
        	// to display the first and last name.
        	//
        	// In addition, note that to get the first and last names, it uses
        	// its getters for firstName and lastName.  This is because these
        	// properties are automatically retrieved on submission from the
        	// returned form parameters.
            @Override
            public void onSubmit() {
                super.onSubmit();
                PageParameters params = new PageParameters();
                params.add("firstNameParam", getFirstName());
                params.add("lastNameParam", getLastName());
                setResponsePage(SecondPage.class, params);
            }
        };
        form.add(submit);
    }

    // These getters and setters below are required by the PropertyModel to 
    // update the associated javabean properties for first and last name.
    
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
