import React, {Component} from 'react';


class Onetwo extends Component{
    render(){
        return(
            <div className={this.props.radionbtn && this.props.radionbtn=== "1n2" ? "d-flex opacity-2": "d-flex"}>
                <button
                    className={this.state.onentwoerrorsarr.length ===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                    type="button"
                    onClick={()=> this.onetwo()}
                    disabled={this.state.onentwoerrorsarr.length===0 || (this.props.radionbtn && this.props.radionbtn=== "1n2")}>
                    1 n 2 <strong className="spanred">{this.state.onentwoerrorsarr.length}
                </strong></button>

                <button onClick={(e) => this.exportToCSV(this.state.onentwoerrorsarr,"1n2errors")}
                        className={this.state.onentwoerrorsarr.length ===0 ? "button1 no-rop-cursor":"button1"}
                        type="button" disabled={this.state.onentwoerrorsarr.length===0 ||
                (this.props.radionbtn && this.props.radionbtn=== "1n2")}>
                    <i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default Onetwo;