class PagesController < ApplicationController

  before_filter :find_page, only: [:show, :edit, :update, :destroy_multiple]

  def index
    @page_grid = PageGrid.new(params[:page_grid])
    @assets = @page_grid.assets.paginate(:page => params[:page], :per_page => 20)
  end

  

  def create
    @page = Page.create(params[:page])
    if @page.errors.empty? 
      redirect_to pages_path
      flash[:'save-name'] = @page.page_title
    else
      redirect_to new_page_path(@page)
      if @page.errors.full_messages.include? "Page title has already been taken"
        flash[:'unique-name'] = @page.page_title
      end
      if @page.errors.full_messages.include? "Page url has already been taken"
        flash[:'unique-url'] = @page.page_title
      end
    end
  end

  def new
    @page = Page.new
  end

  def edit 
   
  end

  def update
    
    @page.update_attributes(params[:page])
      if @page.errors.empty?
        redirect_to pages_path
        flash[:'save-name'] = @page.page_title
      else
        render 'edit'
        # if @page.errors.full_messages.include? "Page title has already been taken"
        #   flash.now[:'unique-name'] = @page.page_title
        # end
        # if @page.errors.full_messages.include? "Page url has already been taken"
        #   flash.now[:'unique-url'] = @page.page_title
        # end
      end
  end
  
  def show
    
  end

  def destroy_multiple
     @page.destroy
    redirect_to pages_path
  end

  private

    def find_page
      begin
        @page = Page.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render "/public/404", status: 404
      end
    end
end