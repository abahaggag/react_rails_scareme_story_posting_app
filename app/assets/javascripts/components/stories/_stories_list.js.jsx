var StoriesList = React.createClass({
    getInitialState: function(){
        return {
            stories: this.props.stories || []
        };
    },
    
    handleDeleteStoryClick: function(story_id){
        this.props.onDeleteStoryClick(story_id);
    },
    
    handleEditStorySubmit:function(formData, story_id){
        this.props.onEditStorySubmit(formData, story_id);
    },
    
    render: function(){
        return (
            <div className="col-md-12">
                {   this.state.stories.map(function(story){
                        return (
                            <Story  key={story.id} story={story} categories={this.props.categories}
                                    onDeleteStoryClick={this.handleDeleteStoryClick}
                                    onEditStorySubmit={this.handleEditStorySubmit}/>
                        );
                    }.bind(this))
                }
                
                { this.state.stories.length == 0 ?
                    [
                        <div className="well">No stories match what you specified.</div>
                    ]
                    :
                    ""
                }
            </div>
        );
    }
});