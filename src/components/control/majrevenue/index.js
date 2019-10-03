import React ,{Component} from 'react';

class Majorev extends Component{
    render(){
        return(
            <div className={this.state.activealgo=== "majorrev" ? "d-flex opacity-2": "d-flex"}>
                <button  className={this.props.majorarray && this.props.majorarray.length===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                         type="button"
                         onClick={()=> this.majorreven()}
                         disabled={this.props.majorarray.length===0 || this.state.activealgo=== "majorrev"}>
                    Major Revenue<strong className="spanred">{this.props.majorarray.length}</strong></button>
                <button className={this.props.majorarray && this.props.majorarray.length===0 ? "button1 no-rop-cursor":"button1"}
                        onClick={(e) => this.exportToCSV(this.props.majorarray,"majorrevenueerrors")} type="button"
                        disabled={this.props.majorarray.length===0 || this.state.activealgo=== "majorrev"}><i className="fa fa-download"></i> </button>
            </div>
        )
    }
}
export default Majorev;