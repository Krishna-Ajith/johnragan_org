class FilterDemosController < ApplicationController
  before_filter :say_hello
  after_filter :log_goodbye
  helper_method :message_for_view
  
  # GET /filter_demos
  # GET /filter_demos.xml
  def index
    session[:session_msg] = "here is what is in the session under :session_msg"
    
    @filter_demos = FilterDemo.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @filter_demos }
    end
  end

  # GET /filter_demos/1
  # GET /filter_demos/1.xml
  def show
    @filter_demo = FilterDemo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @filter_demo }
    end
  end

  # GET /filter_demos/new
  # GET /filter_demos/new.xml
  def new
    session[:session] ||= "nothing was set in the session message"
    @session_msg = session[:session_msg]
    @filter_demo = FilterDemo.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @filter_demo }
    end
  end

  # GET /filter_demos/1/edit
  def edit
    @filter_demo = FilterDemo.find(params[:id])
  end

  # POST /filter_demos
  # POST /filter_demos.xml
  def create
    @filter_demo = FilterDemo.new(params[:filter_demo])

    respond_to do |format|
      if @filter_demo.save
        flash[:notice] = 'FilterDemo was successfully created.'
        format.html { redirect_to(@filter_demo) }
        format.xml  { render :xml => @filter_demo, :status => :created, :location => @filter_demo }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @filter_demo.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /filter_demos/1
  # PUT /filter_demos/1.xml
  def update
    @filter_demo = FilterDemo.find(params[:id])

    respond_to do |format|
      if @filter_demo.update_attributes(params[:filter_demo])
        flash[:notice] = 'FilterDemo was successfully updated.'
        format.html { redirect_to(@filter_demo) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @filter_demo.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /filter_demos/1
  # DELETE /filter_demos/1.xml
  def destroy
    @filter_demo = FilterDemo.find(params[:id])
    @filter_demo.destroy

    respond_to do |format|
      format.html { redirect_to(filter_demos_url) }
      format.xml  { head :ok }
    end
  end
  
  def say_hello
    flash.now[:notice] = "This is put up with a controller before_filter.  An after_filter will log 'JPR - have a nice day'."
  end
  
  def log_goodbye
    logger.info("JPR - have a nice day")
  end
  
  def message_for_view
    "this is the message for the view set up with a helper method on the controller"
  end
end
