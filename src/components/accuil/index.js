import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style from './style';

class accuil extends Component{

    render(){
        return(
            <div>
                <div className="starter-head" >
                    <div className="container-inside">
                        <div className="header">
                            <span className="header-text" >Contrôle WEB</span>
                        </div>
                        <div  className="empty-space"></div>
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
                            <div className="accuil-text">
                                <h2>Bienvenue sur votre outil de contrôle</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Style/>
            </div>
        )
    }
}
export default accuil;