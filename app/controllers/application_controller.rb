class ApplicationController < ActionController::Base
#  protect_from_forgery with: :exception
  ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, DELETE, OPTIONS'
  ALLOWED_ORIGIN = '*'

  after_filter :set_cors_headers

  def options
  end

  private

  def set_cors_headers
    response.headers['Access-Control-Allow-Methods'] = ALLOWED_METHODS
    response.headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGIN
  end

end
