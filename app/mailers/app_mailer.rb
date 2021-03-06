class AppMailer < ApplicationMailer
  default from: 'no-reply@puber.xyz'

  def candidate_passenger_email(driver, passenger, message)
    @driver = driver
    @passenger = passenger
    @message = message
    puts "username = #{ENV['smtp_username']}"
    puts "password = #{ENV['smtp_password']}"
    mail to: @driver.email, from: @passenger.email, subject: "#{@driver.name}, a passenger wants to ride with you."
  end

  def accepted_passenger_email(driver, passenger)
    @driver = driver
    @passenger = passenger
    mail to: @passenger.email, from: @driver.email, subject: "#{@driver.name} accepted you in the carpool!"
  end

  def rejected_passenger_email(driver, passenger)
    @driver = driver
    @passenger = passenger
    mail to: @passenger.email, from: @driver.email, subject: "#It is ok {@passenger.name}, there are other rides you can try."
  end
end
