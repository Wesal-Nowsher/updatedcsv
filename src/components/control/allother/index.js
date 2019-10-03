import React ,{Component} from 'react';

class Allother extends Component{
    render(){
        return(
            <div className={this.state.activealgo=== "allotherrev" ? "d-flex opacity-2": "d-flex"}>
                <button className={this.state.allothererrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                        type="button" onClick={()=> this.allother()}
                        disabled={this.state.allothererrors===0 || this.state.activealgo=== "allotherrev"}>
                    All Event <strong className="spanred">{this.state.allothererrors}</strong></button>
                <button  onClick={(e) => this.exportToCSV(this.state.allother,"allerrorsofother")}
                         className={this.state.allothererrors===0  ? "button1 no-rop-cursor":"button1"}
                         type="button"  disabled={this.state.allothererrors===0 || this.state.activealgo=== "allotherrev"}>
                    <i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default Allother;