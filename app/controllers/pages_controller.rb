class PagesController < ApplicationController


def index
	@pages = Page.paginate(page: params[:page],:per_page => 20)
	@pages.sort_by!{ |p| p.created_at }
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

end

	