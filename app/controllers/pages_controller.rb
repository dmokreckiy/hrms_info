class PagesController < ApplicationController

	# before_filter :check_for_cancel, :only => [:create, :update]

def index
	# @pages = Page.paginate(page: params[:page],:per_page => 20)
	@pages = Page.all
end

def create
	@page = Page.new(params[:page])
	@page.save
	redirect_to page_path(@page)
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