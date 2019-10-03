import React ,{Component} from 'react';

class Faceaface extends Component{
    render(){
        return(
            <div className={this.state.activealgo=== "faceaface" ? "d-flex opacity-2": "d-flex"}>
                <button  className={this.state.faceafaceerrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                         type="button" onClick={()=> this.faceaface()}
                         disabled={this.state.faceafaceerrors===0 || this.state.activealgo=== "faceaface"}
                > face a face <strong className="spanred">{this.state.faceafaceerrors}</strong></button>
                <button   className={this.state.faceafaceerrors ===0 ? "button1 no-rop-cursor":"button1"}
                          onClick={(e) => this.exportToCSV(this.state.faceafaceerrorsarr,"faceafaceerrors")}
                          type="button" disabled={this.state.faceafaceerrors===0 || this.state.activealgo=== "faceaface"}>
                    <i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default Faceaface;