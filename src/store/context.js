import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) =>{
    switch (action.type){
        case 'data':
            return {...state, data: action.payLoad};
        case 'check':
            return {...state, check: action.payLoad};
        case 'majinput':
            return {...state, majorvalueInput: action.payLoad};
        case 'mininput':
            return {...state, majorvalueInput: action.payLoad};
        case 'minarr':
            return {...state, minorarray: action.payLoad};
        case 'majarr':
            return {...state, majorarray: action.payLoad};
        case 'allarr':
            return {...state, allother: action.payLoad};
        case 'one2facecombine':
            return {...state, one2facecombine: action.payLoad};
        case 'one2faceno':
            return {...state, one2faceno: action.payLoad};
        case 'allerrors':
            return {...state, allerrors: action.payLoad};
        case 'onetwo':
            return {...state, onentwoerrors: action.payLoad};        
        case 'faceaface':
            return {...state, faceafaceerrors: action.payLoad};
        case 'onetwohandi':
            return {...state, onentwohandierrors: action.payLoad};
        case 'facefacehandi':
            return {...state, faceafacehandierrors: action.payLoad};
        case 'overunder':
            return {...state, overundererrors: action.payLoad};
        case 'radiobtn':
            return {...state, radiobtn:action.payLoad };
        default:
            return state;
    }
};

export class Provider extends Component{

    state = {
        dispatch: action =>{
            this.setState(state => reducer(state, action))
        },
        data: [],
        check: false,
        one2facecombine:[],
        one2faceno:[],
        majorarray:[],
        minorarray:[],
        allother:[],
        majorvalueInput:0,
        minorvalueInput:0,
        allerrors:[],
        onentwoerrors:[],
        onentwohandierrors: [],
        faceafaceerrors:[],
        faceafacehandierrors:[],
        overundererrors:[],
        radiobtn:"1n2"
    };

    render(){
        const { state, props: {children} } = this;
        return <Context.Provider value={ state } >{children}</Context.Provider>;
    }
}

export const Consumer = Context.Consumer;

