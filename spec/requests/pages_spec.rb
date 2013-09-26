require 'spec_helper'

describe "Pages" do

 describe "new page" do

    before { visit new_page_path }

    let(:submit) { "Save page" }

    describe "with valid information" do
      before do
        fill_in "Page title",   with: "Example page"
        fill_in "Page url",     with: "example url"
        fill_in "Keywords",     with: "keywords"
        fill_in "Description",  with: "description"
    
    it "should create a page" do
      expect { click_button submit }.to change(Page, :count).by(1)
     end  
   end
  end
 end
end
