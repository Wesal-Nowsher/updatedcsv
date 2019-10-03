import React ,{Component} from 'react';

class Minorrev extends Component{
    render(){
        return(
            <div className={this.state.activealgo=== "minorrev" ? "d-flex opacity-2": "d-flex"}>
                <button  className={this.props.minorarray.length===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                         type="button" onClick={()=> this.minoreven()}
                         disabled={this.props.minorarray.length===0 || this.state.activealgo=== "minorrev" }>
                    Minor Revenue
                    <strong className="spanred">{this.props.minorarray.length}</strong></button>
                <button onClick={(e) => this.exportToCSV(this.props.minorarray,"minorrevenueerrors")}
                        className={this.props.minorarray.length===0 ? "button1 no-rop-cursor":"button1"}
                        type="button" disabled={this.props.minorarray.length===0 || this.state.activealgo=== "minorrev"}
                ><i className="fa fa-download"></i>
                </button>
            </div>
        )
    }
}
export default Minorrev;