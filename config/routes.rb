Rails.application.routes.draw do

  root 'app#driver'
  get '/driver', to: 'app#driver'
  get '/passenger', to: 'app#passenger'

  resources :roads
  resources :users
  match "*path", to: 'application#options', via: [:options]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
