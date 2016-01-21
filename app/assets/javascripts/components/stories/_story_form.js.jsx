var StoryForm = React.createClass({
    getInitialState: function(){
        return {
            adding_new_story: false,
            categories: this.props.categories || []
        };
    },
    
    handleShowAddStoryForm: function(){
        this.setState({adding_new_story: true});
    },
    
    handleSubmitNewStory: function(event){
        event.preventDefault();
        
        var body = this.refs.story_body.value;
        var category_id = this.refs.category_id.value;
        
        if (!body || !category_id){
            alert("story and its category are required.");
            return false;
        }
        
        var formData = $(this.refs.form).serialize();
        
        this.props.onSubmitNewStory(formData);
        this.refs.story_body.value = "";
    },
    
    handleCancelClick: function(event){
        event.preventDefault();
        this.setState({adding_new_story: false});
    },
    
    renderAddingStoryButton: function(){
        return (
            <div className="container">
                <p>
                    <button className="btn btn-primary" onClick={this.handleShowAddStoryForm}>Submit your scary story</button>
                </p>
            </div>
        );
    },
    
    renderAddingStoryForm: function(){
        return (
            
                <div className="col-md-12">
                    <div className="form-area">
                      <h3>Create a Story</h3>
                      <form ref="form" onSubmit={this.handleSubmitNewStory} acceptCharset="UTF-8">
                        <div className="form-group">
                            <label htmlFor="story_body">Tell us your scary story</label>
                            <textarea rows="10" className="form-control" name="story[body]" ref="story_body"></textarea>
                            <br/>
                            <label htmlFor="story_category_id">Category</label>
                            <select className="form-control" id="select" name="story[category_id]" ref="category_id">
                                <option value="">Select Category</option>
                                {
                                    this.state.categories.map(function(category){
                                        return <option key={category.id} value={category.id}>{category.name}</option>;
                                    })
                                }
                            </select>
                            <br/>
                            <div>
                                <button type="submit" className="btn btn-success">Create Story</button>&nbsp;
                                <button className="btn btn-danger" onClick={this.handleCancelClick}>Close</button>
                            </div>
                        </div>
                      </form>
                    </div>
                </div>
        );
    },
    
    render: function(){
        if (this.state.adding_new_story){
            return this.renderAddingStoryForm();
        }
        else {
            return this.renderAddingStoryButton();
        }
    }
});