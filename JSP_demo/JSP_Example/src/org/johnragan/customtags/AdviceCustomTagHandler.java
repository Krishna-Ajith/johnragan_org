package org.johnragan.customtags;

import java.io.IOException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class AdviceCustomTagHandler extends SimpleTagSupport {
  private String user;

  public void doTag() throws IOException {
       getJspContext().getOut().write( "Hello " + user + " <br.>" );
       getJspContext().getOut().write("Your advice is: " + getAdvice() );
  }

  public void setUser(String user) {
       this.user = user;
  }

  String getAdvice() {
       return "You might want to rethink that haircut.";
  }
}
