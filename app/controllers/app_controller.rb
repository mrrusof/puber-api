class AppController < ApplicationController

  def driver
  end

  def passenger
  end

  def candidate_passenger_email
    @driver = User.find params[:driver_id]
    @passenger = User.find params[:passenger_id]
    AppMailer.candidate_passenger_email(@driver, @passenger).deliver
  end

end
