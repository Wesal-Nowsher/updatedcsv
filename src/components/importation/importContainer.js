import React, {Component} from 'react';

import {Consumer} from '../../store/context';
import Importation from './index';

class importationcontainer extends Component{
    render(){
        return(
            <Consumer>
                {
                    ({dispatch, data, check}) => (
                        <Importation dispatch={dispatch} data={data} check={check}/>
                    )
                }
            </Consumer>
        )
    }
}
export default importationcontainer;