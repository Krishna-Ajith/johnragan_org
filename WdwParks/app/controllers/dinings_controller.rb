class DiningsController < ApplicationController
  # GET /dinings
  # GET /dinings.json
  def index
    @dinings = Dining.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @dinings }
    end
  end

  # GET /dinings/1
  # GET /dinings/1.json
  def show
    @dining = Dining.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @dining }
    end
  end

  # GET /dinings/new
  # GET /dinings/new.json
  def new
    @dining = Dining.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @dining }
    end
  end

  # GET /dinings/1/edit
  def edit
    @dining = Dining.find(params[:id])
  end

  # POST /dinings
  # POST /dinings.json
  def create
    @dining = Dining.new(params[:dining])

    respond_to do |format|
      if @dining.save
        format.html { redirect_to @dining, notice: 'Dining was successfully created.' }
        format.json { render json: @dining, status: :created, location: @dining }
      else
        format.html { render action: "new" }
        format.json { render json: @dining.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /dinings/1
  # PUT /dinings/1.json
  def update
    @dining = Dining.find(params[:id])

    respond_to do |format|
      if @dining.update_attributes(params[:dining])
        format.html { redirect_to @dining, notice: 'Dining was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @dining.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dinings/1
  # DELETE /dinings/1.json
  def destroy
    @dining = Dining.find(params[:id])
    @dining.destroy

    respond_to do |format|
      format.html { redirect_to dinings_url }
      format.json { head :no_content }
    end
  end
end
