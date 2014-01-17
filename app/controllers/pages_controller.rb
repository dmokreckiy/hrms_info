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
    else
      redirect_to new_page_path(@page)
      flash[:failure] = "Page save failed"
      #полезное сообщение, которое выводит что конкретно не дало сохранить новую страницу
      flash[:notice] = @page.errors.full_messages 
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
      else
        render 'edit'
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