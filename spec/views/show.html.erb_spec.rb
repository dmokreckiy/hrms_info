require 'spec_helper'

describe 'pages/show.html.haml' do
  it 'displays pages details correctly' do
    assign(:page, Page.create(page_title: 'Test title', page_url: 'page/test', keywords: 'keywords', description: 'test'))

    render

    rendered.should have_selector('h4', text: "Test title" )
    rendered.should have_selector("li:nth-child(1)", text: 'page/test')
    rendered.should have_selector("li:nth-child(2)", text: 'keywords')
    rendered.should have_selector("li:nth-child(3)", text: 'test')
  end
end
