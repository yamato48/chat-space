Rails.application.routes.draw do
  resources :messages, only: :get
  root 'messages#index'

end
