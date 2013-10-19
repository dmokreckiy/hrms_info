class PagesController < ApplicationController


  def index
    @pages = Page.paginate(page: params[:page],:per_page => 20)
    sorting(params[:sort], params[:order])
  end

  def create
    @page = Page.new(params[:page])
      if @page.save
        flash[:success] = "The #{@page.page_title} has been saved" 
        redirect_to pages_path
      else
        render 'new'
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
  def sorting (column_name = 'created', order_type = 'desc')
    case column_name
    when 'title'
      if order_type == 'asc'
        @pages.sort_by!{ |p| p.page_title }
      elsif order_type == 'desc'
        (@pages.sort_by!{ |p| p.page_title }).reverse
      end
    when 'created'
      if order_type == 'asc'
        @pages.sort_by!{ |p| p.created_at }
      elsif order_type == 'desc'
        (@pages.sort_by!{ |p| p.created_at }).reverse
      end
    end
  end
end
