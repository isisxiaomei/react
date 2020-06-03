import React, { Component } from 'react';
import './index.less';
class Home extends Component{
    render(){
        return(
            <div className="home-wrap">
               {this.props.children}
            </div>
        );
    }
}
export default Home;