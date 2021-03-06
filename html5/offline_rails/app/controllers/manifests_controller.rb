class ManifestsController < ApplicationController
  # GET /manifests
  # GET /manifests.xml
  def index
    @manifests = Manifest.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @manifests }
    end
    headers["Content-Type"] = 'text/cache-manifest'
    #render :content_type => 'text/cache-manifest'
  end

  # GET /manifests/1
  # GET /manifests/1.xml
  def show
    @manifest = Manifest.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @manifest }
    end
  end

  # GET /manifests/new
  # GET /manifests/new.xml
  def new
    @manifest = Manifest.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @manifest }
    end
  end

  # GET /manifests/1/edit
  def edit
    @manifest = Manifest.find(params[:id])
  end

  # POST /manifests
  # POST /manifests.xml
  def create
    @manifest = Manifest.new(params[:manifest])

    respond_to do |format|
      if @manifest.save
        flash[:notice] = 'Manifest was successfully created.'
        format.html { redirect_to(@manifest) }
        format.xml  { render :xml => @manifest, :status => :created, :location => @manifest }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @manifest.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /manifests/1
  # PUT /manifests/1.xml
  def update
    @manifest = Manifest.find(params[:id])

    respond_to do |format|
      if @manifest.update_attributes(params[:manifest])
        flash[:notice] = 'Manifest was successfully updated.'
        format.html { redirect_to(@manifest) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @manifest.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /manifests/1
  # DELETE /manifests/1.xml
  def destroy
    @manifest = Manifest.find(params[:id])
    @manifest.destroy

    respond_to do |format|
      format.html { redirect_to(manifests_url) }
      format.xml  { head :ok }
    end
  end
end
