class PagesController < ApplicationController


def index
	# @users = User.order(:name).page params[:page]
	@pages = Page.page params[:page]
end

def create
	@page = Page.new(params[:page])
	  if @page.save
	  	flash[:success] = "The #{@page.page_title} has been saved" 
	  	redirect_to pages_path
	  else
	  	render 'new'
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

	