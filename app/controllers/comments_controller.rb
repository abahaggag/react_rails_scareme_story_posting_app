class CommentsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def create
    story = Story.find(params[:story_id])
    comment = story.comments.create(comment_params)
    comment.user = current_user
    
    if comment.save
      temp_comment = {id: comment.id, body: comment.body, username: comment.user.name, created_on: comment.created_at.strftime("%B %d, %Y at %l:%M %p")}
      render json: {comment: temp_comment, status: "success"}
    else
      render json: {error: comment.errors.full_messages.to_sentence, status: "fail"}
    end
  end
  
  def index
    story = Story.find(params[:story_id])
    temp_comments = story.comments.order(id: :desc)
    comments = []
    temp_comments.each do |comment|
      comments << {id: comment.id, body: comment.body, username: comment.user.name, created_on: comment.created_at.strftime("%B %d, %Y at %l:%M %p")}
    end
    
    render json: {comments: comments}
    
  end
  
  def update
    comment = Comment.find(params[:id])
    
    if current_user == comment.user    
      
      if comment.update_attributes(comment_params)
        temp_comment = {id: comment.id, body: comment.body, username: comment.user.name, created_on: comment.created_at.strftime("%B %d, %Y at %l:%M %p")}
        render json: {comment: temp_comment, status: "success"}
      else
        render json: {errors: comment.errors.full_messages.to_sentence, status: "fail"}
      end
      
    else
      render json: {errors: "hey yoo! This is not your comment .. how could you edit it?", status: "fail"}
    end
  end
  
  def destroy
    comment = Comment.find(params[:id])
    
    if current_user == comment.user    
      if comment.destroy
        render json: {id: params[:id], status: "success"}
      else
        render json: {errors: comment.errors.full_messages.to_sentence, status: "fail"}
      end
      
    else
      render json: {errors: "hey yoo! This is not your comment .. how could you delete it?", status: "fail"}
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:body)
    end
end