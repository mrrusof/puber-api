class AppController < ApplicationController

  def driver
  end

  def passenger
  end

  def candidate_passenger_email
    @driver = User.find params[:driver_id]
    @passenger = User.find params[:passenger_id]
    begin
      AppMailer.candidate_passenger_email(@driver, @passenger, params[:message]).deliver
    rescue
    end
    redirect_to 'http://puber.xyz/dashboard.html'
  end

end
