class OrderCallbacks     
  # Normalize the credit card number     
  def before_save(model)
    if model.pay_type == "cod"
      model.pay_type = "real-cod"
    end
  end
end