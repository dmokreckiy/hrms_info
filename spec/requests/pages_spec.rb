require 'spec_helper'

describe "Pages" do

  describe "Home page" do  	
    it "should have the content 'Pages:List'" do
     visit '/pages'
     page.should have_content('Pages:List')
    end
  end

end
