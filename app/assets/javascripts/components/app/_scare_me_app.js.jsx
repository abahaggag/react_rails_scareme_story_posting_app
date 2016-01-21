var ScareMeApp = React.createClass({
    getInitialState: function(){
        return {
            stories: this.props.stories || [],
        };
    },
    
    getIndexById: function(id){
		var index;
		
		for (var i=0; i<this.state.stories.length; i++)
		{
			if(this.state.stories[i].id == id){
				index = i;
				break;
			}
		}

		return index;
	},
    
    submitNewStory: function(formData){
        $.ajax({
            data: formData,
            url: "/stories",
            type: "POST",
            dataType: "json",
            success: function(submitNewStoryData){
                /*
                    - status object with be either success or fail.
                    - if ajax call success then the submitNewStoryData will have: story and status objects.
                      the story object is the one that we create so we can push it to the stories state.
                    - if ajax call fail then the submitNewStoryData will have: error and status object.
                      the error object will have the array of errors occurs in the server.
                */
                if(submitNewStoryData.status == "success"){
                    var tempStories = this.state.stories;
                    tempStories.unshift(submitNewStoryData.story);
                    this.setState({stories: tempStories});
                }
                else if(submitNewStoryData.status == "fail"){
                    var errors = "Some errors have occured: \n";
                    errors += submitNewStoryData.errors.map(function(error){
                        return "\t - " + error + "\n";
                    });
                    alert(errors);
                }
                else{
                    alert("error occurs in server side action or in ajax call!");
                }
                
            }.bind(this)
        });
    },
    
    topStoriesClick: function(){
        $.getJSON("/topstories", function(top_stories){
            var arr = this.state.stories;
            arr.splice(0, arr.length);
            top_stories.forEach(function(story){
               arr.push(story); 
            });
            
            this.setState({stories: arr});
        }.bind(this));
    },
    
    randomStoriesClick: function(){
        $.getJSON("/randomstories", function(random_stories){
            var arr = this.state.stories;
            arr.splice(0, arr.length);
            random_stories.forEach(function(story){
               arr.push(story); 
            });
            
            this.setState({stories: arr});
        }.bind(this));
    },
    
    getStoriesByCategory: function(category_id){
        $.getJSON("/category/" + category_id, function(category_stories){
            var arr = this.state.stories;
            arr.splice(0, arr.length);
            category_stories.forEach(function(story){
               arr.push(story); 
            });
            
            this.setState({stories: arr});
        }.bind(this));
    },
    
    searchStoriesClick: function(search_text){
        var action = search_text != "" ? "search/" + search_text : "search/";
        var data = search_text != "" ? "text=" + search_text : "";
        $.ajax({
            data: data,
            url: action,
            type: "GET",
            dataType: "json",
            success: function(stories){
                var arr = this.state.stories;
                arr.splice(0, arr.length);
                stories.forEach(function(story){
                   arr.push(story); 
                });
                
                this.setState({stories: arr});    
            }.bind(this)
        });
    },
    
    onDeleteStoryClick: function(story_id){
        var action = "/stories/" + story_id + ".json";
        $.ajax({
            url: action,
            type: "DELETE",
            dataType: "json",
            success: function(submitDeleteStoryData){
                if(submitDeleteStoryData.status == "success"){
                    
                    var indexToDelete = this.getIndexById(submitDeleteStoryData.id);
                    var arrStories = this.state.stories;
                    arrStories.splice(indexToDelete, 1);
                    
                    this.setState({stories: arrStories});
                }
                else if(submitDeleteStoryData.status == "fail"){
                    alert(submitDeleteStoryData.errors);
                }
                else{
                    alert("error occurs in server side action or in ajax call!");
                }
            }.bind(this)
        });
    },
    
    onEditStorySubmit: function(formData, story_id){
        var action = "/stories/" + story_id + ".json";
        $.ajax({
            data: formData,
            url: action,
            type: "PUT",
            dataType: "json",
            success: function(submitEditStoryData){
                if(submitEditStoryData.status == "success"){
                    
                    var indexToEdit = this.getIndexById(submitEditStoryData.story.id);
                    var arrStories = this.state.stories;
                    arrStories[indexToEdit].body = submitEditStoryData.story.body;
                    arrStories[indexToEdit].category_id = submitEditStoryData.story.category_id;
                    
                    this.setState({stories: arrStories});
                }
                else if(submitEditStoryData.status == "fail"){
                    var errors = "Some errors have occured: \n" + submitEditStoryData.errors;
                    alert(errors);
                }
                else{
                    alert("error occurs in server side action or in ajax call!");
                }
            }.bind(this)
        });
    },
    
    render: function(){
        return (
            <div>
                <Header options={this.props.header_options} onHandleTopStoriesClick={this.topStoriesClick}
                        onHandleRandomStoriesClick={this.randomStoriesClick}
                        onHandleSearchClick={this.searchStoriesClick} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <StoryForm categories={this.props.categories} onSubmitNewStory={this.submitNewStory} />
                            <StoriesList stories={this.state.stories} categories={this.props.categories}
                                         onDeleteStoryClick={this.onDeleteStoryClick}
                                         onEditStorySubmit={this.onEditStorySubmit}/>
                        </div>
                        
                        <div className="col-md-4 col-sm-12">
                            <CategoriesList categories={this.props.categories} getStoriesByCategory={this.getStoriesByCategory} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});