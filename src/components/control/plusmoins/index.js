import React,{Component} from 'react';

class PlusMoins extends Component{
    render(){
        return(
            <div className={this.state.activealgo=== "overunder" ? "d-flex opacity-2": "d-flex"}>
                <button  className={this.state.overundererrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                         type="button" onClick={()=> this.overunder()}
                         disabled={this.state.overundererrors===0  || this.state.activealgo=== "overunder"}>
                    Plus / Moins<strong className="spanred">{this.state.overundererrors}</strong> </button>
                <button  className={this.state.overundererrors ===0 ? "button1 no-rop-cursor":"button1"}
                         onClick={(e) => this.exportToCSV(this.state.overundererrorsarr,"plusmoineroors")}
                         type="button"
                         disabled={this.state.overundererrors===0 || this.state.activealgo=== "overunder"}>
                    <i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default PlusMoins;