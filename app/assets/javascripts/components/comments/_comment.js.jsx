var Comment = React.createClass({
    getInitialState: function(){
        return {
            comment: this.props.comment || {},
            editing: false
        };
    },
    
    handleEditClick: function(){
        this.setState({editing: true});
    },
    
    handleEditSubmit: function(event){
        event.preventDefault();
        
        var edit_body = this.refs.edit_body.value;
        
        if (!edit_body){
            alert("comment body is required.");
            return false;
        }
        
        var formData = $(this.refs.edit_form).serialize();
        this.props.onEditCommentSubmit(formData, this.state.comment.id);
        
        this.refs.edit_body.value = "";
        
        this.setState({editing: false});
    },
    
    handleCancelEdit: function(e){
        e.preventDefault();
        this.setState({editing: false});
    },
    
    handleDeleteSubmit: function(){
        this.props.onDeleteClick(this.state.comment.id);
    },
    
    handleDeleteClick: function(){
        this.setState({editing: null});
    },
    
    handleCancelDelete: function(){
        this.setState({editing: false});
    },
    
    
    renderDisplay: function(){
        return (
            <div className="well media comment">
                <a className="pull-left">
                    <img className="media-object" src="assets/user_img.png" alt="" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.state.comment.username + "  "}
                        <small>{this.state.comment.created_on}</small>
                    </h4>
                    {this.state.comment.body}
                </div>
                <span id="span">
                    <button onClick={this.handleEditClick} className="btn btn-primary btn-sm glyphicon glyphicon-pencil"></button>&nbsp;
                    <button onClick={this.handleDeleteClick} className="btn btn-danger btn-sm glyphicon glyphicon-trash"></button>
                </span>
            </div>
        );
    },
    
    renderEdit: function(){
        
        return (
            <div className="well media comment">
                <h4>Edit Comment:</h4>
                <form id="edit_form" ref="edit_form" acceptCharset="UTF-8" onSubmit={this.handleEditSubmit}>
                    <div className="form-group">
                        <textarea ref="edit_body" defaultValue={this.state.comment.body} placeholder="Your Comment Here" name="comment[body]" className="form-control" />
                        <input name="comment[id]" type="hidden" value={this.state.comment.id} />
                        <br/>
                        <button type="submit" className="btn btn-success">Edit Comment</button>&nbsp;
                        <button className="btn btn-danger" onClick={this.handleCancelEdit}>Cancel</button>        
                    </div>
                </form>
            </div>
        );
    },
    
    
    renderDelete: function(){
        return (
            <div className="well media comment">
                <h4>Are you sure that you want to delete this comment: "{this.state.comment.body}" ?</h4>
                
                <button className="btn btn-danger" onClick={this.handleDeleteSubmit}>Delete Comment</button>&nbsp;
                <button className="btn btn-primary" onClick={this.handleCancelDelete}>Cancel</button>  
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