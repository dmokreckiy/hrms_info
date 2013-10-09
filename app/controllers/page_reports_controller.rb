class PageReportsController < ApplicationController
  def index
    @page_report = PageReport.new(params[:page_report])
    @assets = @page_report.assets.page(params[:page])
  end
end
