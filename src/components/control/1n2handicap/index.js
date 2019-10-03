import React ,{Component} from 'react';

class onetwoHandicap extends Component{
    render(){
        return(
            <div className={this.state.activealgo=== "1n2handi" ? "d-flex opacity-2": "d-flex"}>

                <button className={this.state.onentwohandicaperrors ===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                        type="button" onClick={()=> this.onetwohadni()}
                        disabled={this.state.onentwohandicaperrors ===0 ||
                        (this.props.radionbtn && this.props.radionbtn=== "1n2")}
                > 1 n 2 Handicap <strong className="spanred">{this.state.onentwohandicaperrors}</strong> </button>
                <button onClick={(e) => this.exportToCSV(this.state.onentwohandicaperrorsarr,"1n2handicaperrors")}
                        disabled={this.state.onentwohandicaperrors ===0 || (this.props.radionbtn && this.props.radionbtn=== "1n2handi")}
                        className={this.state.onentwohandicaperrors ===0 ? "button1 no-rop-cursor":"button1"}
                        type="button"><i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default onetwoHandicap;