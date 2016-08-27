class AppMailer < ApplicationMailer
  default from: 'no-reply@puber.xyz'

  def candidate_passenger_email(driver, passenger)
    @driver = driver
    @passenger = passenger
    mail to: @driver.email, subject: "#{@driver.name}, a passenger wants to ride with you!"
  end
end
