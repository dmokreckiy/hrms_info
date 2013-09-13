class PagesController < ApplicationController

def index
	@pages = Page.all
end

def create
	@page = Page.new(params[:page])
end

def new
	@page = Page.new
end

def show
	@page = Page.find(params[:id])
end

def destroy 
	Page.find(params[:id]).destroy
end

end
