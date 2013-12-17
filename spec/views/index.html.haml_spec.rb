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
  it 'should have the delete button' do
    page.should have_selector("button", text: "Delete")
  end

  it 'should have the search input' do
  	page.should have_selector("input")
  end

  it 'should have a correct table' do
  	page.should have_selector("table thead  tr:nth-of-type(1) th:nth-of-type(1).id")
    page.should have_selector("table thead  tr:nth-of-type(1) th:nth-of-type(2)", text: 'Title')
    page.should have_selector("table thead  tr:nth-of-type(1) th:nth-of-type(3)", text: 'Published')
    page.should have_selector("table thead  tr:nth-of-type(1) th:nth-of-type(4)", text: 'Last changed')
  end

end