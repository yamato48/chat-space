class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if devise controller?

  def configure_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
