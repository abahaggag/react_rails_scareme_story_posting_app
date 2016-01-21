var Story = React.createClass({
    getInitialState: function(){
        return {
            story: this.props.story,
            upvotes: this.props.story.cached_votes_up,
            downvotes: this.props.story.cached_votes_down,
            story_link: "/stories/" + this.props.story.id,
            user_name: "",
            category_name: "",
            created_on: "",
            comments_count: 0,
            story_info: {},
            comments_visibility: "hide",
            is_comments_loaded: false,
            comments: [],
            editing: false
        };
    },
    
    componentDidMount: function(){
        // get story info
        this.loadStorynfo();
    },
    
    loadStorynfo: function(){
        $.getJSON(this.state.story_link + "/story_info.json", function(story_info){
            if(this.isMounted()){
                this.setState({
                    user_name: story_info.user.name,
                    category_name: story_info.category.name,
                    created_on: story_info.created_on,
                    comments_count: story_info.comments_count,
                });
            }
        }.bind(this));
    },
    
    handleUpVote: function(){
        $.ajax({
            method: 'PUT',
            url: this.state.story_link + "/like",
            success: function(story){
                this.setState({
                    upvotes: story.upvotes,
                    downvotes: story.downvotes
                });
            }.bind(this)
        });
    },
    
    handleDownVote: function(){
        $.ajax({
            method: "PUT",
            url: this.state.story_link + "/dislike",
            success: function(story){
                this.setState({
                    upvotes: story.upvotes,
                    downvotes: story.downvotes
                });
            }.bind(this)
        });
    },
    
    show_and_load_comments: function(){
        if(this.state.comments_visibility == "hide"){
            
            if(!this.state.is_comments_loaded){
                this.loadStoryComments();
                this.setState({is_comments_loaded: true});
            }
            
            this.setState({comments_visibility: "show"});
        }
        else{
            this.setState({comments_visibility: "hide"});
        }
    },
    
    loadStoryComments: function(){    
        $.getJSON(this.state.story_link + "/comments.json", function(data){
            var arr = this.state.comments;
            arr.splice(0, arr.length);
            data.comments.forEach(function(comment){
                arr.push(comment);
            });
            this.setState({
                comments: arr
            });
        }.bind(this));
    },
    
    submitNewComment: function(formData){
        $.ajax({
            url: this.state.story_link + "/comments.json",
            data: formData,
            method: "POST",
            dataType: "json",
            success: function(submitNewCommentData){
                if(submitNewCommentData.status == "success"){
                    if(!this.state.is_comments_loaded){
                        this.loadStoryComments();
                    }
                    
                    var tempComments = this.state.comments;
                    tempComments.unshift(submitNewCommentData.comment);
                    this.setState({comments: tempComments, comments_count: this.state.comments_count + 1});
                }
                else if(submitNewCommentData.status == "fail"){
                    var errors = "Some errors have occured: \n" + submitNewCommentData.errors;
                    alert(errors);
                }
                else{
                    alert("error occurs in server side action or in ajax call!");
                }
            }.bind(this)
        });
    },
    
    handleEditComment: function(formData, comment_id){
		    
        var action = this.state.story_link + "/comments/" + comment_id + ".json";
        $.ajax({
            data: formData,
            url: action,
            type: "PUT",
            dataType: "json",
            success: function(submitEditCommentData){
                if(submitEditCommentData.status == "success"){
                    
                    var indexToEdit = this.getIndexById(submitEditCommentData.comment.id);
                    var arrComments = this.state.comments;
                    arrComments[indexToEdit].body = submitEditCommentData.comment.body;
                    
                    this.setState({comments: arrComments});
                }
                else if(submitEditCommentData.status == "fail"){
                    var errors = "Some errors have occured: \n" + submitEditCommentData.errors;
                    alert(errors);
                }
                else{
                    alert("error occurs in server side action or in ajax call!");
                }
            }.bind(this)
        });
	},
    
    handleDeleteComment: function(comment_id){
        var action = this.state.story_link + "/comments/" + comment_id + ".json";
        $.ajax({
            url: action,
            type: "DELETE",
            dataType: "json",
            success: function(submitDeleteCommentData){
                if(submitDeleteCommentData.status == "success"){
                    
                    var indexToDelete = this.getIndexById(submitDeleteCommentData.id);
                    var arrComments = this.state.comments;
                    arrComments.splice(indexToDelete, 1);
                    
                    this.setState({comments: arrComments});
                }
                else if(submitDeleteCommentData.status == "fail"){
                    var errors = "Some errors have occured: \n" + submitDeleteCommentData.errors;
                    alert(errors);
                }
                else{
                    alert("error occurs in server side action or in ajax call!");
                }
            }.bind(this)
        });
    },
    
    getIndexById: function(id){
		var index;
		
		for (var i=0; i<this.state.comments.length; i++)
		{
			if(this.state.comments[i].id == id){
				index = i;
				break;
			}
		}

		return index;
	},
	
    renderDisplay: function(){
        return (
            <div className="well story">
                { this.state.story.body }
                <br/>
                <br/>
                <a className="btn btn-warning btn-xs" role="button" onClick={this.handleUpVote}>That scared me</a>
                <span className="text-warning">&nbsp;({this.state.upvotes})</span>
                &nbsp;
                <a className="btn btn-success btn-xs" role="button" onClick={this.handleDownVote}>You wimp!</a>
                <span className="text-success">&nbsp;({this.state.downvotes})</span>
                &nbsp;
                <small>
                    <a className="btn btn-link btn-xs" onClick={this.show_and_load_comments}>
                        {
                            this.state.comments_visibility == "hide" ? "show comments" : "hide comments"
                        }
                    </a>
                    <em>({this.state.comments_count})</em>
                </small>
                <span className="text-muted pull-right"><small>Created by: {this.state.user_name} on {this.state.created_on} </small></span>
                <br/>
                <span className="text-muted pull-right"><small>Category: {this.state.category_name}</small></span>
                
                <div className={this.state.comments_visibility + " well comments_container"}>
                    <CommentsList comments={this.state.comments} onEditCommentClick={this.handleEditComment}
                                  onDeleteCommentClick={this.handleDeleteComment}/>
                    <CommentForm onCommentSubmit={this.submitNewComment}/>
                </div>
                <span id="span">
                    <button onClick={this.handleEditStoryClick} className="btn btn-primary btn-sm glyphicon glyphicon-pencil"></button>&nbsp;
                    <button onClick={this.handleDeleteStoryClick} className="btn btn-danger btn-sm glyphicon glyphicon-trash"></button>
                </span>
            </div>
                
        );
    },
    
    handleEditStoryClick: function(){
        this.setState({editing: true});
    },
    
    handleEditStorySubmit: function(event){
        event.preventDefault();
        
        var edit_body = this.refs.edit_body.value;
        var edit_category_id = this.refs.category_id.value;
        if (!edit_body || !edit_category_id){
            alert("comment body and its category are required.");
            return false;
        }
        
        var formData = $(this.refs.edit_form).serialize();
        this.props.onEditStorySubmit(formData, this.state.story.id);
        this.loadStorynfo();
        this.refs.edit_body.value = "";
        this.refs.category_id.value = "";
        
        this.setState({editing: false});
    },
    
    handleCancelEditStory: function(e){
        e.preventDefault();
        this.setState({editing: false});
    },
    
    renderEdit: function(){
        return (
            <div className="well media story">
                <h4>Edit Story</h4>
                
                <form ref="edit_form" onSubmit={this.handleEditStorySubmit} acceptCharset="UTF-8" placeholder="Your Story Here">
                    <div className="form-group">
                        <textarea defaultValue={this.state.story.body} rows="5" className="form-control" name="story[body]" ref="edit_body"></textarea>
                        <br/>
                        <label htmlFor="story_category_id">Category</label>
                        <select defaultValue={this.state.story.category_id} className="form-control" id="select" name="story[category_id]" ref="category_id">
                            <option value="">Select Category</option>
                            {
                                this.props.categories.map(function(category){
                                    return <option key={category.id} value={category.id}>{category.name}</option>;
                                })
                            }
                        </select>
                        <br/>
                        <div>
                            <button type="submit" className="btn btn-success">Edit Story</button>&nbsp;
                            <button className="btn btn-danger" onClick={this.handleCancelEditStory}>Cancel</button>
                        </div>
                    </div>
                  </form>
            </div>
        );
    },
    
    handleDeleteStoryClick: function(){
        this.setState({editing: null});
    },
    
    handleDeleteStorySubmit: function(){
        //alert("_story.jsx");
        this.props.onDeleteStoryClick(this.state.story.id);
    },
    
    handleCancelDeleteStory: function(){
        this.setState({editing: false});
    },
    
    renderDelete: function(){
        return (
            <div className="well media story">
                <h4>Are you sure that you want to delete this Story that written by: "{this.state.user_name}" ?</h4>
                
                <button className="btn btn-danger" onClick={this.handleDeleteStorySubmit}>Delete Delete</button>&nbsp;
                <button className="btn btn-primary" onClick={this.handleCancelDeleteStory}>Cancel</button>  
            </div>
        );
    },
    
    render: function(){
        if(this.state.editing == true){
            return this.renderEdit();
        }
        else if(this.state.editing == false){
            return this.renderDisplay();
        }
        else if(this.state.editing == null){
            return this.renderDelete();
        }
    }
});