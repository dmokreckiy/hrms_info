class PagesController < ApplicationController


	def index
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

  def destroy_multiple
    Page.destroy(params[:pages])

    respond_to do |format|
      format.html { redirect_to pages_path }
      format.json { head :no_content }
    end
  end

end