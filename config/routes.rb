Rails.application.routes.draw do
  devise_for :users
  resources :stories do
    resources :comments
    
    member do
      put :like, to: 'stories#upvote'
      put :dislike, to: 'stories#downvote'
      get :category, to: 'categories#story_category'
      get :user, to: 'users#story_user'
      get :created_on, to: 'stories#story_created_on'
      get :comments_count, to: 'comments#story_comments_count'
      get :story_info, to: 'stories#story_info'
    end
  end
  
  get '/topstories', to: 'stories#top_stories', as: 'topstories'
  get '/randomstories', to: 'stories#random_stories', as: 'randomstories'
  get '/category/:id', to: 'stories#category_stories', as: 'category'
  get '/search/:text', to: 'stories#search', as: 'search'
  get '/search/', to: 'stories#search', as: 'all_stories'
  
  root 'stories#index'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
