Rails.application.routes.draw do

  root 'app#search'

  resources :roads
  resources :users
  match "users", to: 'users#options', via: [:options]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
