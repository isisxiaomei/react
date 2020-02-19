import React from 'react';

function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = null;
        this.callbackfun = this.callbackfun.bind(this);
    }
    componentDidMount(){
        console.dir(this.inputElement);
    }
    callbackfun(ele){
        this.inputElement = ele;
    }
    render() {
        return (
            <CustomTextInput
                inputRef={this.callbackfun}
            />
        );
    }
}
export default Parent;
