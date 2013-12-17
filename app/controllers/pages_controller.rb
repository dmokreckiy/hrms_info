class PagesController < ApplicationController

  def index
    @page_grid = PageGrid.new(params[:page_grid])
    @assets = @page_grid.assets.paginate(:page => params[:page], :per_page => 20)
  end

  

  def create
    @page = Page.create(params[:page])
    if @page.errors.empty? 
      redirect_to pages_path
    else
      redirect_to new_page_path(@page)
      flash[:failure] = "Page save failed"
    end
  end

  def new
    @page = Page.new
  end

  def edit 
    @page = Page.find(params[:id])
  end

  def update
    @page = Page.find(params[:id])
    @page.update_attributes(params[:page])
      if @page.errors.empty?
        redirect_to pages_path
      else
        render 'edit'
      end
  end
  
  def show
    @page = Page.find(params[:id])
  end

  def destroy_multiple
    @page = Page.find(params[:id])
    @page.destroy
    redirect_to pages_path
  end
end