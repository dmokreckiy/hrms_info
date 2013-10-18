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

	