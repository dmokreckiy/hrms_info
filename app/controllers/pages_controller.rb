class PagesController < ApplicationController


  def index
    @pages = Page.page params[:page]
  end

  def create
    @page = Page.create(params[:page])
    if @page.errors.empty?
      flash[:success] = "The #{@page.page_title} has been saved" 
      redirect_to pages_path
    else
      redirect_to new_page_path(@page)
      flash[:failure] = "Page save failed"
    end
  end

  def edit 
    @page = Page.find(params[:id])
  end

  def update
    @page = Page.find(params[:id])
    @page.update_attributes(params[:page])
      if @page.errors.empty?
        flash[:success] = "The #{@page.page_title} has been updated"
        redirect_to pages_path
      else
        render 'edit'
      end
  end
 
  def new
    @page = Page.new
  end

  def show
    @page = Page.find(params[:id])
  end

  def destroy 
    @page = Page.find(params[:id])
    @page.destroy
    redirect_to action: "index"
  end

end