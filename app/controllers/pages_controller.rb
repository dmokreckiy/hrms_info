class PagesController < ApplicationController


def index
	# @pages = Page.paginate(page: params[:page],:per_page => 20)
	@pages = Page.all
	@pages.sort_by!{ |p| p.created_at }
end

def create
	@page = Page.new(params[:page])
	  if @page.save
	  	flash[:success] = "Page:#{@page.page_title} was created!" 
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

	# private
	# 	def check_for_cancel
 #  		if Page.new(params[:page]) == "Cancel"
 #    	redirect_to pages_path
 #  		end
	# 	end