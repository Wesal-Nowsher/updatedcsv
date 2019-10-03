import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style from './style';
import { CSVReader } from 'react-papaparse';

class importation extends Component{
    constructor(props) {
        super(props);
        this.state={
            loader:'cf'
        };
        this.fileInput = React.createRef();
    };

    handleReadCSV = (data) => {
        this.setState({loader: "loader"})

        this.props.dispatch({
            type: "data",
            payLoad: data.data
        })
        this.props.dispatch({
            type: "check",
            payLoad: true
        })

        this.setState({loader: "fc"})
   };

    handleOnError = (err, file, inputElem, reason) => {

    };

    handleImportOffer = () => {
        this.fileInput.current.click();


    };

    render(){
        return(
            <div>
                <div className="starter-head" >
                    <div className="container-inside">
                        <div className="header">
                            <span className="header-text" >Contrôle WEB</span>
                        </div>
                        <div className="empty-space"></div>
                        <Link to="/" className="link1 link">
                            <div className="link-text">Accueil</div>
                        </Link>
                        <Link to="/importation" className="link2 link">
                            <div className="">Importation</div>
                        </Link>
                        <Link to="/control" className="link3  link">
                            <div className="">Contrôles</div>
                        </Link>
                    </div>
                </div>
                <div className="accuil-content" id="">
                    <div className="accuil">
                        <div className="accuil-inside">
                            <div className="import-text">
                                <h2>Parse CSV to JSON</h2>
                                {
                                 this.state.loader === "cf" && <div><CSVReader
                                         onFileLoaded={this.handleReadCSV}
                                         inputRef={this.fileInput}
                                         style={{display: 'none'}}
                                         onError={this.handleOnError}
                                 /> <button className="file-upload" onClick={this.handleImportOffer}>Choose file(no file choosen)</button>   </div>
                                }
                                {
                                    this.state.loader=== "fc" &&      <h3>File Has been choosen, Please route to control to see the data</h3>
                                }
                                {
                                  this.state.loader=== 'loader' &&  <div className="loader"></div>
                                }


                            </div>
                        </div>
                    </div>
                </div>
                <Style/>
            </div>
        )
    }
}
export default importation;