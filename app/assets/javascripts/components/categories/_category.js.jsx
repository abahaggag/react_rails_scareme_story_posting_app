var Category = React.createClass({
    getInitialState: function(){
        return {
            category: this.props.category
        };
    },
    
    getStoriesByCategory: function(){
        this.props.onGetStoriesByCategory(this.state.category.id);
        //alert(this.state.category.id);
    },
    
    render: function(){
        return (
            <li className="list-group-item">
                <a onClick={this.getStoriesByCategory} className="pointer-cursor">
                    {this.state.category.name}
                </a>
            </li>
        );
    }
});