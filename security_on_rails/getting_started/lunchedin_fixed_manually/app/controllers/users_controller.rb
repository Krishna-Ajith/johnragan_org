#---
# Excerpted from "Security on Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material, 
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose. 
# Visit http://www.pragmaticprogrammer.com/titles/fr_secure for more book information.
#---
class UsersController < ApplicationController

  skip_before_filter :check_authentication, :only => [:index, :new, :create]

  def new
    @hide_tabs = true
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end
  
  
  def create
    @hide_tabs = true    
    @user = User.new(params[:user])  
    if @user.save  
      flash[:notice] = 'your account was successfully created.'
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render :action => 'new'
    end    
  end
  

end
