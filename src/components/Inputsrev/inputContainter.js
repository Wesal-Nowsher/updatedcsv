import React, {Component} from 'react';

import {Consumer} from '../../store/context';
import InputRef from './index';

class inputcontainer extends Component{
    render(){
        return(
            <Consumer>
                {
                    ({dispatch,one2facecombine,one2faceno , allerrors,
                        onentwoerrors,onentwohandierrors,faceafaceerrors,faceafacehandierrors,
                        overundererrors, majorarray,minorarray,allother}) => (
                        <InputRef dispatch={dispatch} allerrors={allerrors} one2facecombine={one2facecombine} 
                        onentwoerrors={onentwoerrors} onentwohandierrors={onentwohandierrors} 
                        faceafaceerrors={faceafaceerrors} faceafacehandierrors={faceafacehandierrors}
                        overundererrors={overundererrors} majorarray={majorarray} minorarray={minorarray}
                        allother={allother} />
                    )
                }
            </Consumer>
        )
    }
}
export default inputcontainer;