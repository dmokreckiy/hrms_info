class PageGridsController < ApplicationController
  def index
  	@page_grid = PageGrid.new(params[:page_grid])
    @assets = @page_grid.assets.page(params[:page])
  end
end