class ApiController < ApplicationController
  
  @@competences_json = File.read(Rails.root.join('app/assets/competences.json'))

  def competences
    render :json => @@competences_json
  end
end
