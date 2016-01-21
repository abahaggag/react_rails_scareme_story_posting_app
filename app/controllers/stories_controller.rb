class StoriesController < ApplicationController
    
    before_action :authenticate_user!, only: [:new, :create, :upvote, :downvote]
    layout 'custom'
    def index
        @stories = Story.all.order(id: :desc)
        @categories = Category.all
        @header_options = {
            user_signed_in: user_signed_in?,
            root_path: root_path,
            edit_user_registration_path: edit_user_registration_path,
            destroy_user_session_path: destroy_user_session_path,
            new_user_session_path: new_user_session_path,
            new_user_registration_path: new_user_registration_path 
        }
        
        respond_to do |format|
            format.html 
            format.json { render json: @stories.to_json }
        end
    end
    
    def create
        story = Story.new(story_params)
        story.user = current_user
        
        if story.save
            render json: {story: story, status: "success"}
        else
            render json: {errors: story.errors.full_messages, status: "fail"}
        end
    end
    
    def show
        @story = Story.find(params[:id])
    end
    
    def upvote
        story = Story.find(params[:id])
        story.upvote_by(current_user)
        
        render json: { upvotes: story.cached_votes_up, downvotes: story.cached_votes_down }
    end
    
    def downvote
        story = Story.find(params[:id])
        story.downvote_by(current_user)
        
        render json: { upvotes: story.cached_votes_up, downvotes: story.cached_votes_down }
    end
    
    def search
        if params[:text].blank?
            stories = Story.all.order(id: :desc)
        else
            stories = Story.search(params[:text])
        end
        
        render json: stories
    end
    
    def story_info
        story = Story.find(params[:id])
        
        user = story.user
        category = story.category
        created_on = story.created_at.strftime("%B %d, %Y at %l:%M %p")
        comments_count = story.comments.count
        
        respond_to do |format|
            format.json { render json: { user: user, category: category, created_on: created_on, comments_count: comments_count} }
        end
    end
    
    def top_stories
        stories = Story.scariest
        render json: stories
    end
    
    def random_stories
        stories = Story.random
        render json: stories
    end
    
    def category_stories
        category = Category.find(params[:id])
        stories = category.stories.order(id: :desc)
        
        render json: stories
    end
      
    def destroy
        story = Story.find(params[:id])
    
        if current_user == story.user    
          if story.destroy
            render json: {id: params[:id], status: "success"}
          else
            render json: {errors: story.errors.full_messages.to_sentence, status: "fail"}
          end
          
        else
          render json: {errors: "hey yoo! This is not your story .. how could you delete it?", status: "fail"}
        end
    end
    def update
        story = Story.find(params[:id])
    
        if current_user == story.user    
          
          if story.update_attributes(story_params)
            #temp_story = {id: story.id, body: story.body, username: story.user.name, created_on: story.created_at.strftime("%B %d, %Y at %l:%M %p")}
            render json: {story: story, status: "success"}
          else
            render json: {errors: story.errors.full_messages.to_sentence, status: "fail"}
          end
          
        else
          render json: {errors: "hey yoo! This is not your comment .. how could you edit it?", status: "fail"}
        end
    end
    
    private
    def story_params
        params.require(:story).permit(:body, :category_id)
    end
end