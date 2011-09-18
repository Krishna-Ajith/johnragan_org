class ClassVar
  @@activity_link_field_text = "To complete this task, please click on the following link"
  def ClassVar.activity_link_field_text     
    @@activity_link_field_text
  end

  def ClassVar.activity_link_field_text=(x)
     @@activity_link_field_text = x
  end
end

ClassVar.activity_link_field_text= "arrrgghhh"
puts ClassVar.activity_link_field_text
