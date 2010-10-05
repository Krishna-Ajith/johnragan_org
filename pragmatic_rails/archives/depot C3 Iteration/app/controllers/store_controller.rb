class StoreController < ApplicationController
  def index
    @products = Product.find_products_for_sale
    @time = Time.now
  end
  
  def add_to_cart
    begin
      product = Product.find(params[:id])
    rescue
      logger.error("Attempt to access invalid product #{params[:id]}")
      flash[:notice] = "Invalid product"
      redirect_to :action => :index
    else
      @cart = find_cart
      @cart.add_product(product)
    end
  end
  
private

  def find_cart
    session[:cart] ||= Cart.new
  end
end
