import React, {Component} from 'react';

import {Consumer} from '../../store/context';
import Control from './index';

class controlcontainer extends Component{
    render(){
        return(
            <Consumer>
                {
                    ({dispatch, data, check ,majorarray, minorarray, allerrors,radionbtn}) => (
                        <Control dispatch={dispatch}  radionbtn={radionbtn}
                        allerrors={allerrors} majorarray={majorarray}  data={data} check={check} minorarray={minorarray}/>
                    )
                }
            </Consumer>
        )
    }
}
export default controlcontainer;