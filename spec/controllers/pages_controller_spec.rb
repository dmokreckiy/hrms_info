require 'spec_helper'

describe PagesController do

  def self.it_renders_404_page_when_page_is_not_found(*actions)

    actions.each do |f|
      it "#{f} renders 404 page when page is not found" do
        type = if f == :update
          "PATCH"
        elsif f == :destroy
          "DELETE"
        else
          "GET"
        end
        process f, type, { id: 0 }
        response.status.should == 404
      end

    end

  end

  it_renders_404_page_when_page_is_not_found :show, :edit, :update, :destroy

  describe "show action" do
    
    it "renders show tempalte if an item is found" do
      page = Page.create
      get :show,  id: page.id
      response.should render_template('show')
    end
    
  end

  describe "create action" do

    it "redirects to page path if validation pass" do
      post :create, page: { page_title: 'Page101', page_url: 'page-name-#{page.id+1}'   }
      response.should redirect_to(pages_path)
    end

    it "redirects to new page path if validation fail" do
      post :create, page: { page_title: 'Page102', page_url: "///" }
      response.should redirect_to(new_page_path)
    end

  end

  describe "destroy action" do
  
    it "redirects to index action when page is destroyed successfully " do
      page = Page.create
      delete :destroy, id: page.id
      response.should redirect_to(action: "index")
    end

  end  

end
