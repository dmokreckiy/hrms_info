class PagesController < ApplicationController


	def index
		@pages = Page.page params[:page]
	end

	def create
    # @user = User.new(params[:user]) # zapolnenie parametrov dlia usera
    # if @user.save
    #   sign_in @user # posle registracii srazu na str pol'zovatelia
    #   flash[:success] = "Welcome to MTwitter!" # flash-soobshenie ob uspeshnoi registracii
    #   redirect_to @user   # redirectit na stranicu usera
    # else
    #   render 'new'
    # end
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