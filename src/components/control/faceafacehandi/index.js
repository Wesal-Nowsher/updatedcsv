import React ,{Component} from 'react';

class Faceafacehandi extends Component{
    render(){
        return(
            <div  className={this.state.activealgo=== "faceafacehandi" ? "d-flex opacity-2": "d-flex"}>
                <button  className={this.state.faceafacehandicaperrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                         type="button" onClick={()=> this.facehandi()}
                         disabled={this.state.faceafacehandicaperrors===0 || this.state.activealgo=== "faceafacehandi"}>
                    face a face-Handicap <strong className="spanred">{this.state.faceafacehandicaperrors}</strong></button>
                <button  onClick={(e) => this.exportToCSV(this.state.faceafacehandicaperrorsarr,"faceafacehandicaperrors")}
                         className={this.state.faceafacehandicaperrors ===0 ? "button1 no-rop-cursor":"button1"} type="button"
                         disabled={this.state.faceafacehandicaperrors===0 || this.state.activealgo=== "faceafacehandi"}>
                    <i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default Faceafacehandi;