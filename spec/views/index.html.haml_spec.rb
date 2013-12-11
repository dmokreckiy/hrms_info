require "spec_helper"

describe "index page" do
  before { visit root_path}
  
  it 'should have the new button' do
    page.should have_selector("button", text: "New")
  end
  it 'should have the view button' do
    page.should have_selector("button", text: "View")
  end
  it 'should have the edit button' do
    page.should have_selector("button", text: "Edit")
  end
  it 'should have the edit button' do
    page.should have_selector("button", text: "Edit")
  end


end