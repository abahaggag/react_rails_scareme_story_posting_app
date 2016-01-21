var CommentForm = React.createClass({
    handleSubmit: function(event){
        event.preventDefault();
        
        var body = this.refs.body.value;
        
        if (!body){
            alert("comment body is required");
            return false;
        }
        
        var formData = $(this.refs.form).serialize();
        this.props.onCommentSubmit(formData);
        
        this.refs.body.value = "";
    },

    render: function(){
        return (
            <div>
                <h4>Leave a Comment:</h4>
                <form ref="form" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <textarea ref="body" placeholder="Your Comment Here" name="comment[body]" className="form-control" />
                        <br/>
                        <button type="submit" className="btn btn-primary">Post Comment</button>
                    </div>
                </form>
            </div>
        );
    }
});