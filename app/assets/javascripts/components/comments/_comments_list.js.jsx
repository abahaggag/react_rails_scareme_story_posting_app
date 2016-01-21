var CommentsList = React.createClass({
    getInitialState: function(){
        return {comments: this.props.comments || []};
    },
    
    
    handleDeleteClick: function(id){
        this.props.onDeleteCommentClick(id);
    },
    
    handleEditCommentClick: function(formData, comment_id){
        this.props.onEditCommentClick(formData, comment_id);
    },
    
    handleDeleteCommentClick: function(comment_id){
        this.props.onDeleteCommentClick(comment_id);
    },
    
    render: function(){
        var comments = this.state.comments.map(function(comment){
            return (
                <Comment key={comment.id} comment={comment} onEditCommentSubmit={this.handleEditCommentClick} onDeleteClick={this.handleDeleteCommentClick}/>
            );
        }, this);
        
        var is_visible = this.state.comments.length > 0 ? "show" : "hide" ;
        return (
            <div className={is_visible}>
                <h3>Comments</h3>
                <div className="commentsList">
                    {
                        comments
                    }
                </div>
                <hr/>
            </div>
        );
    }
});