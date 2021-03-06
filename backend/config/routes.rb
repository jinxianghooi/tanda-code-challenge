Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root "pages#index"

  namespace :api do
    namespace :v1 do
      post '/login',    to: 'sessions#create'
      post '/logout',   to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'

      resources :organisations do
        resources :shifts
      end

      resources :users do
        resources :shifts
      end
      resources :shifts, only: [:create]
    end
  end

  # get '*path', to: 'pages#index', via: :all
end
