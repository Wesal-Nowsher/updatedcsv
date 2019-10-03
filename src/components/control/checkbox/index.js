import React, {Component} from 'react';




class Checkbox extends Component{
    radiochange(value){
        console.log("value in readio button", value)
        this.props.dispatch({
            type:"radiobtn",
            payLoad: value
        })
    }

    render(){
        return(

            <input type="radio" className=" ml-2 mr-2 form-radio"
                    onChange={(e)=>this.radiochange(e.target.value)}
                   value={this.props.value && this.props.value}
                   name="algochange"/>
        )
    }
}
export default Checkbox;