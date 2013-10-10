require 'spec_helper'

describe Page do
  
  before do
    @page = Page.new(page_title: 'PageTitle', page_url: 'PageTitleUrl', keywords: 'news', description: 'Ipsum lorum', content: 'There be flashy content')
  end

  subject { @page }

  it { should respond_to (:page_title) }
  it { should respond_to (:page_url) }
  it { should respond_to (:keywords) }
  it { should respond_to (:description) }
  it { should respond_to (:content) }
  it { should respond_to (:parent_page_id) }
  it { should respond_to (:page_type) }
  it { should respond_to (:display_top_menu) }
  it { should respond_to (:display_bottom_menu) }
  it { should respond_to (:published) }

  it { should be_valid }

  describe "when page title is empty" do
    before { @page.page_title = ' ' }
    it { should_not be_valid }
  end

  describe "when page title is too small" do
    before { @page.page_title = 'sm' }
    it { should_not be_valid }
  end

  describe "when page title is too big" do
    before { @page.page_title = 's'*51 }
    it { should_not be_valid }
  end

  # Expanded test with regards to Naming rules

  describe "when title format is invalid" do
    it "should not be valid" do
      titles = %w[title/ За родину мать %^&*()]
      titles.each do |invalid_titles|
        @page.page_title = invalid_titles
        expect(@page).not_to be_valid
      end
    end
  end

  # describe "when page title consist of ineligible symbols" do
  #   before { @page.page_title = '%^&*()' }
  #   it { should_not be_valid }
  # end

  describe "when page url is empty" do
    before { @page.page_url= ' ' }
    it { should_not be_valid }
  end

  describe "when description is too big" do
    before { @page.description = 'd'*201 }
    it { should_not be_valid }
  end

  describe "when description is empty" do
    before { @page.description = ' ' }
    it { should_not be_valid }
  end

  describe "when page title contains whitespace" do
    before { @page.page_title = "  yesterday all my \n troubles     seemed    so \t far away      " }
    it "should clean title of whitespace" do
      @page.run_callbacks(:after_save)
      @page.page_title
    end
  end


end
