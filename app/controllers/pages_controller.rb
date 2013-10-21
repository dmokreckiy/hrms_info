class PagesController < ApplicationController


  def index
    @pages = Page.paginate(page: params[:page],:per_page => 20)
    sort_and_filter(params[:sort], params[:order], params[:filter])
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

  private

  #сортировка по умолчания - created desc - от нового к старым значениям
  def sort_and_filter (column_name = 'created', order_type = 'desc', filter = nil)
    unless filter.nil?
        @filtered = @pages.where("page_title LIKE INITCAP(?)", filter)
      else
        @filtered = @pages
    end
    
    case column_name
    when 'title'
      if order_type == 'asc'
        @filtered.sort_by!{ |p| p.page_title }
      elsif order_type == 'desc'
        (@filtered.sort_by!{ |p| p.page_title }).reverse
      end
    when 'created'
      if order_type == 'asc'
        @filtered.sort_by!{ |p| p.created_at }
      elsif order_type == 'desc'
        (@filtered.sort_by!{ |p| p.created_at }).reverse
      end
    end
  end
end
