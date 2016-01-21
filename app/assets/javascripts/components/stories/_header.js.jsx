var Header = React.createClass({
    getInitialState: function(){
        return {
            top_or_random_stories_is_active: 0, // 0:all not active, 1: top active, 2: random active
            user_signed_in: this.props.options.user_signed_in,
            root_path: this.props.options.root_path,
            edit_user_registration_path: this.props.options.edit_user_registration_path,
            destroy_user_session_path: this.props.options.destroy_user_session_path,
            new_user_session_path: this.props.options.new_user_session_path,
            new_user_registration_path: this.props.options.new_user_registration_path
        };
        
    },
    
    handleTopStoriesClick: function(){
        
        this.props.onHandleTopStoriesClick();
        this.setState({top_or_random_stories_is_active: 1});
    },
    
    handleRandomStoriesClick: function(){
        this.props.onHandleRandomStoriesClick();
        this.setState({top_or_random_stories_is_active: 2});
    },
    
    handleSearchClick: function(){
        var search_text = this.refs.searchText.value;
        this.props.onHandleSearchClick(search_text || "");
    },
    
    render: function(){
        
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                  <div className="container-fluid">
                    
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <a href={this.state.root_path} className="navbar-brand">ScareMe</a>
                    </div>
              
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li className={this.state.top_or_random_stories_is_active == 1 ? "active" : ""}>
                            <a onClick={this.handleTopStoriesClick} className="pointer-cursor">Top Stories</a>
                        </li>
                        <li className={this.state.top_or_random_stories_is_active == 2 ? "active" : ""}>
                            <a onClick={this.handleRandomStoriesClick} className="pointer-cursor">Random Stories</a>
                        </li>
                      </ul>
                      
                      <div className="navbar-form navbar-left">
                        <div className="form-group">
                            <input ref="searchText" name="search" placeholder="Search" className="form-control" />&nbsp;
                            <button className="btn btn-default" onClick={this.handleSearchClick}>Search</button>
                        </div>
                        
                      </div>
                      <ul className="nav navbar-nav navbar-right">
                        { this.state.user_signed_in ?
                            [
                                <li key={1.1}><a href={this.state.edit_user_registration_path}>Edit Profile</a></li>,
                                <li key={1.2}><a href={this.state.destroy_user_session_path} data-method="delete">Sign out</a></li>      
                            ]
                            :
                            [
                                <li key={2.1}><a href={this.state.new_user_session_path}>Sign in</a></li>,
                                <li key={2.2}><a href={this.state.new_user_registration_path}>Sign up</a></li>      
                            ]
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
        );
    }
});