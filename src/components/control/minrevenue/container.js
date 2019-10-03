import React, {Component} from 'react';

import {Consumer} from '../../../store/context';
import Index from './index';

class controlcontainer extends Component{
    render(){
        return(
            <Consumer>
                {
                    ({dispatch, data, check ,majorarray, minorarray, allerrors,radionbtn}) => (
                        <Index dispatch={dispatch}  radionbtn={radionbtn}
                               data={data} check={check} />
                    )
                }
            </Consumer>
        )
    }
}
export default controlcontainer;