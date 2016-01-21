var CategoriesList = React.createClass({
    getInitialState: function(){
        return {
            categories: this.props.categories || []
        };
    },
    
    handleGetStoriesByCategory: function(category_id){
        this.props.getStoriesByCategory(category_id);
    },
    
    render: function(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-center">Categories</div>
                <ul className="list-group">
                    {
                        this.state.categories.map(function(category){
                            return (
                                <Category key={category.id} category={category} onGetStoriesByCategory={this.handleGetStoriesByCategory} />
                            );
                        }.bind(this)) // don't forget to bind(this)
                    }
                </ul>
            </div>
        );
    }
});