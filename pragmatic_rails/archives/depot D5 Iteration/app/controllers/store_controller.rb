class StoreController < ApplicationController
  def index
    @products = Product.find_products_for_sale
    @time = Time.now
    @cart = find_cart
    
    if session[:counter].nil?
      session[:counter] = 0
    end  
    session[:counter] += 1
    @counter = session[:counter]  
  end
  
  def add_to_cart
    begin
      product = Product.find(params[:id])
    rescue
      logger.error("Attempt to access invalid product #{params[:id]}")
      redirect_to_index("Invalid product")
    else
      @cart = find_cart
      @current_item = @cart.add_product(product)
      respond_to do |format|
        format.js if request.xhr?
        format.html {redirect_to_index}
      end
    end
    session[:counter] = 0
  end
  
  def empty_cart
    session[:cart] = nil
    redirect_to_index
  end
  
private

  def redirect_to_index(msg = nil)
    flash[:notice] = msg if msg
    redirect_to :action => :index
  end
  
  def find_cart
    session[:cart] ||= Cart.new
  end
end
