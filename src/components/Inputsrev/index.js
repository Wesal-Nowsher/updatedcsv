import React, {Component} from 'react';

class InputRef extends Component{
    state={
        majorvalueInput:null,
        minorvalueInput:null,
        pushmaj:"Push value to Algorithm",
        pushmin:"Push value to Algorithm"
    }
    pushmajor(){
        this.setState({pushmaj:"Pushing... value to Algorithm"});
        setTimeout(()=>{
        let {allerrors,
            onentwoerrors,onentwohandierrors,faceafaceerrors,faceafacehandierrors,
            overundererrors,majorarray,minorarray,allother}= this.props;
        let allerrnow=[...onentwoerrors,...onentwohandierrors,...faceafaceerrors,...faceafacehandierrors,...overundererrors
        ,...minorarray,...allother];
        // allerrnow.concat(onentwoerrors,onentwohandierrors,faceafaceerrors,faceafacehandierrors,overundererrors);
        console.log("allerrors at inputs rev",allerrnow, "one two at input rev",onentwoerrors,overundererrors );
        let majorrev=[];
        let includingvalues=["Ligue 1 Conforama","Domino’s Ligue", "Premier League","Liga Primera","Serie A", "Bundesliga 1", "NBA", "TOP 14"];
        console.log("onetwocombine",this.props.one2facecombine);
        if(this.state.majorvalueInput !== null){
            if(this.props.one2facecombine.length>0){
           
            this.props.one2facecombine.map((item)=>{
                includingvalues.map((items)=>{
                    if(item["Chiffre d'affaires"] !== ""){
                        if(item["Evénement"].toLowerCase().includes(items.toLowerCase()) &&  parseInt(item["Chiffre d'affaires"]) >
                            this.state.majorvalueInput){
                            item["blue"]="red";
                            majorrev.push(item);
                            console.log("major revenue",item);
                            allerrnow.push(item);
                        }
                    }
                });
            });
            this.props.dispatch({
                type: "majarr",
                payLoad: majorrev
            });
            this.props.dispatch({
                type:"allerrors",
                payLoad:allerrnow
            })
             this.setState({pushmaj:"Pushed value to Algorithm"});
             setTimeout(()=>{
                 this.setState({pushmaj:"Push value to Algorithm"});
             },1000)
             console.log("minor rev",majorrev);
           }
        }
      },1000)
    }
    pushminor(){
       
        this.setState({pushmin:"Pushing... value to Algorithm"});
       
        setTimeout(()=>{
        let {allerrors,
            onentwoerrors,onentwohandierrors,faceafaceerrors,faceafacehandierrors,
            overundererrors,majorarray,minorarray,allother}= this.props;
        let allerrnow=[...onentwoerrors,...onentwohandierrors,...faceafaceerrors,...faceafacehandierrors,...overundererrors
        ,...majorarray,...allother];
        // allerrnow.concat(onentwoerrors,onentwohandierrors,faceafaceerrors,faceafacehandierrors,overundererrors);
        console.log("allerrors at inputs rev",allerrnow, "one two at input rev",onentwoerrors,overundererrors );
        let minorrev=[];
        let includingvalues=["Ligue 1 Conforama","Domino’s Ligue", "Premier League","Liga Primera","Serie A", "Bundesliga 1", "NBA", "TOP 14"];
        console.log("onetwocombine",this.props.one2facecombine);
       if(this.state.minorvalueInput !== null){
        if(this.props.one2facecombine.length>0){
          
                this.props.one2facecombine.map((item)=>{
                    if(!item["Evénement"].toLowerCase().includes(includingvalues[0].toLowerCase()) &&
                        !item["Evénement"].toLowerCase().includes(includingvalues[1].toLowerCase()) &&
                        !item["Evénement"].toLowerCase().includes(includingvalues[2].toLowerCase()) &&
                        !item["Evénement"].toLowerCase().includes(includingvalues[3].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[4].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[5].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[6].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[7].toLowerCase())
                    ){
                        if(parseInt(item["Chiffre d'affaires"]) > this.state.minorvalueInput ){
                            item["blue"]="red";
                            minorrev.push(item);
                            allerrnow.push(item);
                            console.log("minor revenue",item);
                        }
                    }
                });
                this.props.dispatch({
                    type: "minarr",
                    payLoad: minorrev
                });
                this.props.dispatch({
                    type:"allerrors",
                    payLoad:allerrnow
                })
                this.setState({pushmin:"Pushed value to Algorithm"});
                setTimeout(()=>{
                    this.setState({pushmin:"Push value to Algorithm"});
                },1000)
                console.log("minor rev",minorrev);
            }
        }
       },100)
    }
    render(){
        return(
            <div className="inputsmajor">
                <input type="number" className="majmininout" placeholder="Enter Major revenue limit" onChange={(e)=> this.setState({majorvalueInput: e.target.value})} />
                <button className="btn btn-primary glue-value" onClick={()=> this.pushmajor()} disabled={this.state.majorvalueInput===0 }>{this.state.pushmaj}</button>
                <input type="number" className="majmininout" placeholder="Enter Minor revenue limit"  onChange={(e)=> this.setState({minorvalueInput: e.target.value})} />
                <button className="btn btn-primary glue-value" onClick={()=> this.pushminor()} disabled={this.state.minorvalueInput===0}>{this.state.pushmin}</button>
            </div>
        )
    }
}

export default  InputRef;