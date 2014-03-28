require 'base64'

class HomeController < ApplicationController
  def index
  end

  def create_image
    time = Time.new
    name= params[:name]
    image_name = "#{name}-#{time.month}-#{time.day}-#{time.year}_#{time.hour}.#{time.min}.#{time.sec}"
    File.open("#{Rails.root}/public/uploads/#{image_name}.png", 'wb') do |f|
      f.write(params[:image].read)
    end

    render nothing: true
  end

end
