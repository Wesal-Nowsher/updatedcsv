import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
// import CountUp from 'react-countup';
// import { MDBDataTable } from 'mdbreact';
// import Pagination from "react-js-pagination";
// import ReactTable from 'react-table';
// import Search from 'react-search';
import 'react-table/react-table.css';
import Table from "../customtable/TableComponent";
// import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from "react-csv";

import { Progress } from 'reactstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import Inputcontainer from "../Inputsrev/inputContainter";
import Checkbox from './checkbox/index';


class control extends Component{
    state={
        data:[],
        loading: false,
        filechoosen: true,
        width:0,
        headers:[],
        activePage: 15,
        itemonpage:20,
        alldatain:[],
        onetwo:[],
        onetwohandicap:[],
        faceface:[],
        facefacehandi:[],
        overunder:[],
        Allerrors:[],
        one2face:[],
        majorrevenue:[],
        minorrevenue:[],
        allother:[],
        onentwoerrors:0,
        faceafaceerrors:0,
        onentwohandicaperrors:0,
        faceafacehandicaperrors:0,
        overundererrors:0,
        onentwoerrorsarr:[],
        faceafaceerrorsarr:[],
        onentwohandicaperrorsarr:[],
        faceafacehandicaperrorsarr:[],
        overundererrorsarr:[],
        majorrevenueerrors:0,
        minorevenueerrors:0,
        allothererrors:0,
        majorvalueInput:0,
        minorvalueInput:0,
        //radio
        activealgo:"1n2"

    }

    componentDidMount(){
        if(this.props.data.length > 0){
            this.setState({loading:true, filechoosen: false});
            let {data}= this.props;
            let self= this;

            setTimeout(function () {
                let newdata=[...data];
                let strc=[];
                let nw={};
                let headers=[...newdata[0]];
                self.setState({headers: headers})
                newdata.map((items,index)=>{
                    if(index >0){
                        items.map((item,inde)=>{
                            nw[headers[inde]]= item;
                        });
                        strc.push({...nw});

                    }
                })
                // console.log("data", strc)
                let onentwo=[];
                let handicap=[];
                let faceaface=[];
                let handicapfaceaface=[];
                let plusmoins=[];
                let one2facecombine=[];
                let one2faceno=[];
                let everyerrorscoming=[];
                strc.map((item, index)=>{
                    if(index >0){
                        if(item["Pari"].includes("1 N 2")  && !item["Pari"].includes("Handicap")){
                            item["inlist"]=true;
                            item["index"]=index;
                            item["group"]="1n2";
                            item["blue"]="ok";
                            item["fav"]=false;
                            onentwo.push(item);
                        }
                        else if(item["Pari"].includes("1 N 2") && item["Pari"].includes("Handicap")){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            handicap.push(item)
                        }
                        else if(item["Pari"].includes("Face à Face") && !item["Pari"].includes("Handicap") ){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            faceaface.push(item)
                        }
                        else if(item["Pari"].includes("Face à Face") && item["Pari"].includes("Handicap") ){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            handicapfaceaface.push(item)
                        }
                        else if(item["Pari"].includes("Plus / Moins") && !item["Pari"].includes("Suspend")){
                            item["group"]="plusmoins/moins";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            plusmoins.push(item)
                        }
                        else{
                            item["inlist"]=false;
                            item["index"]=index;
                            item["group"]="ok";
                            item["blue"]="ok";
                            item["fav"]=false;
                        }
                    }
                })
                strc.map((ite)=>{
                    if(ite["Pari"].includes("1 N 2")  ){
                        one2facecombine.push(ite);
                    }
                    else if(ite["Pari"].includes("Face à Face")){
                        one2facecombine.push(ite);
                    }
                    else{
                        one2faceno.push(ite);
                    }
                });
                self.props.dispatch({
                    type: "one2facecombine",
                    payLoad: one2facecombine
                })
                self.props.dispatch({
                    type: "one2faceno",
                    payLoad: one2faceno
                })

                // Chiﬀre d’aﬀaires
                let includingvalues=["Ligue 1 Conforama","Domino’s Ligue", "Premier League","Liga Primera",
                    "Serie A", "Bundesliga 1", "NBA", "TOP 14"];
                let majorrev=[];
                let minorrev=[];
                one2facecombine.map((item)=>{
                    includingvalues.map((items)=>{
                        if(item["Chiffre d'affaires"] !== ""){
                            if(item["Evénement"].toLowerCase().includes(items.toLowerCase()) &&  parseInt(item["Chiffre d'affaires"]) > 3000){
                                item["blue"]="red";
                                majorrev.push(item);
                                console.log("major revenue",item);
                                everyerrorscoming.push(item);
                            }
                        }
                    });
                    if(!item["Evénement"].toLowerCase().includes(includingvalues[0].toLowerCase()) &&
                        !item["Evénement"].toLowerCase().includes(includingvalues[1].toLowerCase()) &&
                        !item["Evénement"].toLowerCase().includes(includingvalues[2].toLowerCase()) &&
                        !item["Evénement"].toLowerCase().includes(includingvalues[3].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[4].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[5].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[6].toLowerCase())&&
                        !item["Evénement"].toLowerCase().includes(includingvalues[7].toLowerCase())
                    ){
                        if(parseInt(item["Chiffre d'affaires"]) > 1000 ){
                            item["blue"]="red";
                            minorrev.push(item);
                            console.log("minor revenue",item);
                            everyerrorscoming.push(item);
                        }
                    }
                });
                self.props.dispatch({
                    type: "minarr",
                    payLoad: minorrev
                });
                self.props.dispatch({
                    type: "majarr",
                    payLoad: majorrev
                });

                // self.setState({majorrevenue: majorrev,majorrevenueerrors:majorrev.length,minorrevenue:minorrev,minorevenueerrors:minorrev.length});
                let allother=[];
                let allothererros=[];

                one2faceno.map((item)=>{
                        if(item["Chiffre d'affaires"] > 500 ){
                            item["blue"]="red";
                            allother.push(item);
                            allothererros.push(item);
                            console.log("all other revenue",item);
                            everyerrorscoming.push(item);
                        }
                });
                self.props.dispatch({
                    type: "allarr",
                    payLoad: allother
                });


                // console.log("majorrev length",majorrev.length,"minor rev lenth",minorrev.length,"all other error", allothererros.length);
                self.setState({allother:allother,allothererrors:allothererros.length});

                // Chiﬀre d’aﬀaires

                //onentwo
                let ioneindex =0;
                let winner="";
                let aswholewinner="";
                let minimumion;
                while(ioneindex <= onentwo.length-4){
                    // minone
                    if(parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",","."))
                        && parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",","."))){
                        minimumion= ioneindex;
                    }
                    else if(parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",","."))
                        && parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",","."))){
                        minimumion= ioneindex+1;
                    }
                    else if( parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",","."))
                        && parseFloat(onentwo[ioneindex+2]["Cotes Dernière"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Dernière"].replace(",","."))){
                        minimumion= ioneindex+2;
                    }
                    // minone
                    if(ioneindex <3){
                        aswholewinner=onentwo[minimumion]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                        onentwo[minimumion]["blue"]="green";
                    }
                    winner=onentwo[minimumion]["Paris/Pronostics"];
                    let newwinner;

                    let skip= false;
                    if(ioneindex >=3){
                        if(onentwo[ioneindex]["Evénement"] !== onentwo[ioneindex-1]["Evénement"]
                            || onentwo[ioneindex]["Pari"] !== onentwo[ioneindex-1]["Pari"]){
                            if(onentwo[ioneindex]["Cotes Dernière"] !== "" && onentwo[ioneindex+1]["Cotes Dernière"] !== "") {

                                // minone
                                if (parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",", ".")) <= parseFloat(onentwo[ioneindex + 1]["Cotes Dernière"].replace(",", "."))
                                    && parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",", ".")) <= parseFloat(onentwo[ioneindex + 2]["Cotes Dernière"].replace(",", "."))) {
                                    newwinner = ioneindex;
                                }
                                else if (parseFloat(onentwo[ioneindex + 1]["Cotes Dernière"].replace(",", ".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",", "."))
                                    && parseFloat(onentwo[ioneindex + 1]["Cotes Dernière"].replace(",", ".")) <= parseFloat(onentwo[ioneindex + 2]["Cotes Dernière"].replace(",", "."))) {
                                    newwinner = ioneindex + 1;
                                }
                                else if (parseFloat(onentwo[ioneindex + 2]["Cotes Dernière"].replace(",", ".")) <= parseFloat(onentwo[ioneindex]["Cotes Dernière"].replace(",", "."))
                                    && parseFloat(onentwo[ioneindex + 2]["Cotes Dernière"].replace(",", ".")) <= parseFloat(onentwo[ioneindex + 1]["Cotes Dernière"].replace(",", "."))) {
                                    newwinner = ioneindex + 2;
                                }
                                // minone
                                if(newwinner){
                                    onentwo[newwinner]["blue"] = "green";
                                    aswholewinner = onentwo[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-", "").replace("+", "");
                                    skip=false;
                                }
                                else{
                                    skip=true;
                                }

                            }
                            else{
                                skip=true
                            }
                            }
                        else if(skip=== false){
                            if(!aswholewinner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                    winner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                )
                            && winner !== "N"){
                                onentwo[minimumion]["blue"]= "red";
                            }
                        }
                    }
                    ioneindex =ioneindex +3;
                }
                let onentwoerrors=[];
                onentwo.map((item)=>{
                    strc[item["index"]]= item;
                    if(item["blue"]==="red"){
                        onentwoerrors.push(item);
                        everyerrorscoming.push(item);
                    }
                });
                self.props.dispatch({
                    type:"onetwo",
                    payLoad:onentwoerrors
                })
                console.log("one two errros",onentwo, onentwoerrors.length);
                self.setState({onetwo: onentwo, onentwoerrors:onentwoerrors.length, onentwoerrorsarr:onentwoerrors });
                //onentwo

                //faceaface
                let ioneindexface =0;
                let winnerface="";
                let aswholewinnerface="";
                let minimumface;
                while(ioneindexface <= faceaface.length-3){

                    // min2
                    if(parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",","."))){
                        minimumface= ioneindexface;
                    }
                    else if(parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",","."))){
                        minimumface= ioneindexface+1;
                    }
                    // min2
                    if(ioneindexface <2){
                        aswholewinnerface=faceaface[minimumface]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                        faceaface[minimumface]["blue"]="green";
                    }
                    // console.log("minimum",minimumface,faceaface[minimumface]);
                    winnerface=faceaface[minimumface]["Paris/Pronostics"];
                    let newwinner;
                    let skip= false;
                    if(ioneindexface >=2){
                        if(faceaface[ioneindexface]["Evénement"] !== faceaface[ioneindexface-1]["Evénement"] || faceaface[ioneindexface]["Pari"] !== faceaface[ioneindexface-1]["Pari"]){
                            // min2
                           if(faceaface[ioneindexface]["Cotes Dernière"] !== "" && faceaface[ioneindexface+1]["Cotes Dernière"] !== "") {
                            if(parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindexface;
                                // console.log("newwinner in if",newwinner,ioneindexface)
                            }
                            else if(parseFloat(faceaface[ioneindexface+1]["Cotes Dernière"].replace(",",".")) <= parseFloat(faceaface[ioneindexface]["Cotes Dernière"].replace(",","."))){
                                newwinner= ioneindexface+1;
                                // console.log("newwinner in else if",newwinner,ioneindexface);
                            }
                            // min2
                            // console.log("newwinner", faceaface,ioneindexface,ioneindexface);
                               if(newwinner){
                                   faceaface[newwinner]["blue"]="green";
                                   aswholewinnerface= faceaface[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");
                                   skip=false;
                               }
                               else{
                                   skip=true;
                               }
                        }
                        else{
                               skip=true
                           }
                        }
                        else if(skip=== false){
                            if(!aswholewinnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                    winnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                )
                            ){
                                faceaface[minimumface]["blue"]= "red";
                            }
                        }
                    }
                    ioneindexface =ioneindexface +2;
                }
                let facefaceerrors=[];
                console.log("face a face all values",faceaface);
                faceaface.map((item)=>{
                    strc[item["index"]]= item;

                    if(item["blue"]==="red"){
                        // console.log("face a face errors", item);
                        facefaceerrors.push(item);
                        everyerrorscoming.push(item);
                    }
                });
                console.log("faceaface errors",facefaceerrors);

                self.setState({faceface:faceaface, faceafaceerrors:facefaceerrors.length,faceafaceerrorsarr:facefaceerrors});
                self.props.dispatch({
                    type:"faceaface",
                    payLoad:facefaceerrors
                })
                //faceaface
                //handicaps in 1 n2
                let index=0;
                let valuetocheck=0;
                while(index  <= handicap.length -4){
                    if(index<3){
                        valuetocheck=   handicap[index]["Cotes Dernière"].replace(",",".");
                    }
                    if(index >=3){
                        if(handicap[index]["Evénement"] !== handicap[index-1]["Evénement"] ){
                            valuetocheck =handicap[index]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicap[index]["Pari"] !== handicap[index-1]["Pari"]){
                            valuetocheck =handicap[index]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheck) < parseFloat(handicap[index]["Cotes Dernière"].replace(",","."))){
                                handicap[index]["blue"]= "red";
                            }
                            valuetocheck=   handicap[index]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    index=index+3;
                }
                let indexi=0;
                let valuetochecki=0;
                while(indexi  <= handicap.length -4){


                    if(indexi<3){
                        valuetochecki=handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexi >=3){
                        if(handicap[indexi]["Evénement"] !== handicap[indexi-1]["Evénement"] ){
                            valuetochecki =handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicap[indexi]["Pari"] !== handicap[indexi-1]["Pari"] ){
                            valuetochecki =handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetochecki) > parseFloat(handicap[indexi+2]["Cotes Dernière"].replace(",","."))){

                                handicap[indexi+2]["blue"]= "red";
                            }

                            valuetochecki=handicap[indexi+2]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexi=indexi+3;
                }

                let onentwohandierrors=[];
                handicap.map((item)=>{
                    strc[item["index"]]= item;
                    if(item["blue"]==="red"){
                        onentwohandierrors.push(item);
                        everyerrorscoming.push(item);
                    }
                });
                console.log("one two handle errors",onentwohandierrors.length );
                self.setState({onetwohandicap:handicap,onentwohandicaperrors:onentwohandierrors.length,onentwohandicaperrorsarr:onentwohandierrors});
                self.props.dispatch({
                    type:"onetwohandi",
                    payLoad:onentwohandierrors
                });
                //handicap in 1n 2

                //handicapfaceaface
                let indexhandface=0;
                let valuetocheckhandface=0;
                while(indexhandface  <= handicapfaceaface.length -3){
                    if(indexhandface<2){
                        valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexhandface >=2){
                        if(handicapfaceaface[indexhandface]["Evénement"] !== handicapfaceaface[indexhandface-1]["Evénement"] ){
                            valuetocheckhandface =handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicapfaceaface[indexhandface]["Pari"] !== handicapfaceaface[indexhandface-1]["Pari"] ){
                            valuetocheckhandface =handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckhandface) < parseFloat(handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",","."))){
                                handicapfaceaface[indexhandface]["blue"]= "red";                                }
                            valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexhandface=indexhandface+2;
                }
                let indexihandface=0;
                let valuetocheckihandface=0;
                while(indexihandface  <= handicapfaceaface.length -3){
                    if(indexihandface<2){
                        valuetocheckihandface=handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexihandface >=2){
                        if(handicapfaceaface[indexihandface]["Evénement"] !== handicapfaceaface[indexihandface-1]["Evénement"] ){
                            valuetocheckihandface =handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(handicapfaceaface[indexihandface]["Pari"] !== handicapfaceaface[indexihandface-1]["Pari"] ){
                            valuetocheckihandface =handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckihandface) > parseFloat(handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",","."))){
                                handicapfaceaface[indexihandface+1]["blue"]= "red";
                            }
                            valuetocheckihandface=handicapfaceaface[indexihandface+1]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexihandface=indexihandface+2;
                }
                    // console.log("derniere");
                let handicapfaceafaceerrors=[];
                handicapfaceaface.map((item)=>{
                    strc[item["index"]]= item;
                    if(item["blue"]==="red"){
                        handicapfaceafaceerrors.push(item);
                        everyerrorscoming.push(item);
                    }
                });
                // console.log("handicapface aface erros",handicapfaceafaceerrors.length);
                self.setState({facefacehandi:handicapfaceaface, faceafacehandicaperrors:handicapfaceafaceerrors.length,faceafacehandicaperrorsarr:handicapfaceafaceerrors});
                self.props.dispatch({
                    type:"facefacehandi",
                    payLoad:handicapfaceafaceerrors
                })
                //handicapfaceaface

                //plusmoins
                let indexplus=0;
                let valuetocheckplus=0;
                while(indexplus  <= plusmoins.length -3){
                    if(indexplus <2){
                        valuetocheckplus=   plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexplus >=2){
                        if(plusmoins[indexplus]["Evénement"] !== plusmoins[indexplus-1]["Evénement"] ){
                                valuetocheckplus =plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(plusmoins[indexplus]["Pari"] !== plusmoins[indexplus-1]["Pari"] ){
                            valuetocheckplus =plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckplus) > parseFloat(plusmoins[indexplus]["Cotes Dernière"].replace(",","."))){
                                // console.log("plusmoins ",plusmoins[indexplus],valuetocheckplus,indexplus );
                                plusmoins[indexplus]["blue"]= "red";
                            }
                            valuetocheckplus=   plusmoins[indexplus]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexplus=indexplus+2;
                }
                let indexiplus=0;
                let valuetocheckiplus=0;
                while(indexiplus  <= plusmoins.length -3){
                    if(indexiplus<2){
                        valuetocheckiplus = plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");
                    }
                    if(indexiplus >=2){
                        if(plusmoins[indexiplus]["Evénement"] !== plusmoins[indexiplus-1]["Evénement"]   ){
                            valuetocheckiplus =plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");
                        }
                        else  if(plusmoins[indexiplus]["Pari"] !== plusmoins[indexiplus-1]["Pari"] ){
                            valuetocheckiplus =plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");
                        }
                        else{
                            if(parseFloat(valuetocheckiplus) < parseFloat(plusmoins[indexiplus+1]["Cotes Dernière"].replace(",","."))){
                                // console.log("moins ",plusmoins[indexiplus+1],valuetocheckiplus,indexiplus );
                                plusmoins[indexiplus+1]["blue"]= "red";
                            }
                            valuetocheckiplus = plusmoins[indexiplus+1]["Cotes Dernière"].replace(",",".");
                        }
                    }
                    indexiplus=indexiplus+2;
                }
                let plusmoinserros=[];

                plusmoins.map((item)=>{
                    strc[item["index"]]= item;
                    if(item["blue"]==="red"){
                        plusmoinserros.push(item);
                        everyerrorscoming.push(item);
                    }
                });
                // console.log("plusmoins", plusmoins)

                console.log("plusmoins moins over all lenth",plusmoins.length,plusmoinserros.length, plusmoinserros,plusmoins );

                self.setState({overunder:plusmoins,overundererrors:plusmoinserros.length,overundererrorsarr:plusmoinserros});
                self.props.dispatch({
                    type: "overunder",
                    payLoad:plusmoinserros
                })
                // plusmoins

                // console.log(
                //     "pageinations",strc.length
                // )
                let errors=[];
                let onlyerros=[];
                self.setState({data: strc,alldatain:strc,loading:false });

                strc.map((item)=>{
                    if(item["blue"]==="red"){
                        errors.push(item);
                        // everyerrorscoming.push(item);
                    }
                });
                // console.log("all errors",errors.length);
                // console.log("more on this", errors.length);

                self.props.majorarray.map((item)=>{
                    errors.push(item);
                    onlyerros.push(item);
                });
                self.props.minorarray.map((item)=>{
                    errors.push(item);
                    onlyerros.push(item);
                });
                self.state.allother.map((item)=>{
                    errors.push(item);
                    onlyerros.push(item);
                });


                // console.log("more on this", errors.length,onlyerros.length);
                self.setState({Allerrors:everyerrorscoming});
                self.props.dispatch({
                    type:"allerrors",
                    payLoad: everyerrorscoming
                })
            },1000);
        }
    }
    nitems(value){
        // console.log("wesal",value);
        this.setState({itemonpage:value});
    }

    exportToCSV(csvData, fileName) {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';


            const ws = XLSX.utils.json_to_sheet(csvData);
            const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
            const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);

    }
    search(value){
        let {data,alldatain}=this.state;
        if(value !== ""){
            let results=[];

            for(var i=0; i<alldatain.length; i++) {
                if(alldatain[i]["Pari"].toString().toLowerCase().indexOf(value)!=-1 ) {
                    results.push(alldatain[i]);
                }
            }
            // for(let i=0; i<alldatain.length; i++) {
            //     // console.log("chifree",alldatain[i]["Chiffre d'affaires"]);
            //     if(parseInt(alldatain[i]["Chiffre d'affaires"]) > parseInt(value) ) {
            //         // console.log("chifree",alldatain[i]["Chiffre d'affaires"]);
            //         results.push(alldatain[i]);
            //     }
            // }

            this.setState({data:results,itemonpage:20});
            // console.log("data",data);
            // console.log("results",results);
            // console.log("vakl",value);
            results=[];
        }
        else{
            // console.log("looseall",alldatain);
            this.setState({data:alldatain,itemonpage:20});
        }
    }
    onetwo(){
        // console.log("onetwo",this.state.onetwo);
        let {onentwoerrorsarr}= this.state;
        let errors=[...onentwoerrorsarr];
            // onetwo.map((item)=>{
            //     if (item["blue"]==="red"){
            //         errors.push(item);
            //     }
            // })
        // console.log("onetwo erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No 1 N 2 errors found");
            this.setState({data: this.state.alldatain, itemonpage:20});
        }
    }
    reset(){
        this.setState({data: this.state.alldatain,itemonpage:20});
    }
    onetwohadni(){
        // console.log("onetwo",this.state.onetwohandicap);
        let {onetwohandicap}= this.state;
        let errors=[];
        onetwohandicap.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("onetwo erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No 1 N 2 handicap errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }
    }
    faceaface(){
        let {faceface}= this.state;
        let errors=[];
        // console.log("faceaface", faceface.length)
        faceface.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        });
        // console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No faceaface errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }
    }
    majorreven(){
        let {majorarray}= this.props;
        let errors=[];
        // console.log("faceaface", faceface.length)
        console.log("minor arr", this.props.majorarray);
        majorarray.map((item)=>{
            // if(item["blue"]="red"){
                item["blue"]="red"

                errors.push(item);
            // }
        });
        console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No Major Revenue errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    minoreven(){
        // let {minorarray}= this.props;
        let errors=[];
        // console.log("faceaface", faceface.length)
        console.log("minor arr", this.props.minorarray);
        this.props.minorarray.map((item)=>{
            // if(item["blue"]==="red"){
                item["blue"]="red"
                errors.push(item);
            // }
        })
      // /  console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No Minor Revenue errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
     allother(){
        let {allother}= this.state;
        let errors=[];
        // console.log("faceaface", faceface.length)
         allother.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("faceaface erros", errors.length)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    facehandi(){
        let {facefacehandi}= this.state;
        let errors=[];
        // console.log("facefacehandi", facefacehandi.length)
        facefacehandi.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("facefacehandi erros", errors)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
        }
        else{
            alert("No faceaface-handicap errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }

    }
    overunder(){
        let {overunder}= this.state;
        let errors=[];
        // console.log("overunder", overunder.length)
        overunder.map((item)=>{
            if(item["blue"]==="red"){
                errors.push(item);
            }
        })
        // console.log("overunder erros", errors.length, errors)
        if(errors.length>0){
            this.setState({data: errors});
            if(errors.length< 100){
                this.setState({ itemonpage:errors.length});
            }
            else {
                this.setState({ itemonpage: 100});
            }
        }
        else{
            alert("No over-under errors found");
            this.setState({data: this.state.alldatain,itemonpage:20});
        }
    }
    takeinputmin( value ){
        this.setState({
            minorvalueInput: value
        });
    }
    takeinputmaj( value ){
        this.setState({
            majorvalueInput: value
        });
    }


    //
    // pushmajor(){
    //     console.log(this.state.majorvalueInput);
    // }
    // pushminor(){
    //     console.log(this.state.minorvalueInput);
    // }
    render(){
        let {data,headers,Allerrors}= this.state;
        let {dispatch}= this.props;
        // console.log("headersdata",headers, data)
        // console.log("data at render",data);
        return(
            <div>
                <div className="starter-head" >
                    <div className="container-inside">
                        <div className="header">
                            <span className="header-text" >Controle WEB</span>
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
                            <div className="accuil-text">

                                {
                                    this.state.filechoosen &&  <h2>No file has been choosen!</h2>
                                }
                                {
                                     this.state.loading===false &&
                                    <div className="container">
                                        <div className="row downloadrow">
                                            {
                                                this.props.allerrors.length>0 && <div className="download"><button onClick={(e) => this.exportToCSV(this.props.allerrors,"Allerrors")}  type="button">Download All Errors<strong className="spanred"> <i className="fa fa-download"></i> {this.props.allerrors.length}</strong> </button>
                                                </div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="row table-header">
                                                    <div className="col-12 search-col button-col justify-content-center">
                                                        <button className="buttonok"  type="button" onClick={()=> this.reset()} > Reset </button>
                                                        <input type="text" placeholder="Search" onChange={(e) => this.search(e.target.value)} />
                                                    </div>
                                                    <div className="col-12 button-col mt-3">
                                                        <div className="d-flex align-items-center ">
                                                            {/*<input type="radio"  className="mr-2 ml-2 form-radio" onChange={(e)=>this.radiochange(e.target.value)}*/}
                                                                    {/*value="1n2"  name="algochange" />*/}
                                                            <Checkbox value={"1n2"} dispatch={dispatch} />
                                                           <div className={this.props.radionbtn && this.props.radionbtn=== "1n2" ? "d-flex opacity-2": "d-flex"}>
                                                               <button
                                                                   className={this.state.onentwoerrorsarr.length ===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                                                                   type="button"
                                                                   onClick={()=> this.onetwo()}
                                                                   disabled={this.state.onentwoerrorsarr.length===0 || (this.props.radionbtn && this.props.radionbtn=== "1n2")}>
                                                                   1 n 2 <strong className="spanred">{this.state.onentwoerrorsarr.length}
                                                               </strong></button>

                                                               <button onClick={(e) => this.exportToCSV(this.state.onentwoerrorsarr,"1n2errors")}
                                                                       className={this.state.onentwoerrorsarr.length ===0 ? "button1 no-rop-cursor":"button1"}
                                                                       type="button" disabled={this.state.onentwoerrorsarr.length===0 ||
                                                               (this.props.radionbtn && this.props.radionbtn=== "1n2")}>
                                                                   <i className="fa fa-download"></i> </button>
                                                           </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">

                                                            {/*<input type="radio" className="mr-2 ml-2 form-radio" onChange={(e)=>this.radiochange(e.target.value)} value="1n2handi" name="algochange"/>*/}
                                                            <Checkbox value={"1n2handi"} dispatch={dispatch} />
                                                        <div className={this.state.activealgo=== "1n2handi" ? "d-flex opacity-2": "d-flex"}>

                                                            <button className={this.state.onentwohandicaperrors ===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                                                                    type="button" onClick={()=> this.onetwohadni()}
                                                                    disabled={this.state.onentwohandicaperrors ===0 ||
                                                                    (this.props.radionbtn && this.props.radionbtn=== "1n2")}
                                                            > 1 n 2 Handicap <strong className="spanred">{this.state.onentwohandicaperrors}</strong> </button>
                                                            <button onClick={(e) => this.exportToCSV(this.state.onentwohandicaperrorsarr,"1n2handicaperrors")}
                                                                    disabled={this.state.onentwohandicaperrors ===0 || (this.props.radionbtn && this.props.radionbtn=== "1n2handi")}
                                                                    className={this.state.onentwohandicaperrors ===0 ? "button1 no-rop-cursor":"button1"}
                                                                    type="button"><i className="fa fa-download"></i> </button>
                                                        </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <Checkbox value={"faceaface"} dispatch={dispatch} />

                                                            {/*<input type="radio" className="mr-2 ml-2 form-radio"   onChange={(e)=>this.radiochange(e.target.value)} value="faceaface" name="algochange"/>*/}
                                                           <div className={this.state.activealgo=== "faceaface" ? "d-flex opacity-2": "d-flex"}>
                                                               <button  className={this.state.faceafaceerrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                                                                        type="button" onClick={()=> this.faceaface()}
                                                                        disabled={this.state.faceafaceerrors===0 || this.state.activealgo=== "faceaface"}
                                                               > face a face <strong className="spanred">{this.state.faceafaceerrors}</strong></button>
                                                               <button   className={this.state.faceafaceerrors ===0 ? "button1 no-rop-cursor":"button1"}
                                                                         onClick={(e) => this.exportToCSV(this.state.faceafaceerrorsarr,"faceafaceerrors")}
                                                                         type="button" disabled={this.state.faceafaceerrors===0 || this.state.activealgo=== "faceaface"}>
                                                                   <i className="fa fa-download"></i> </button>
                                                           </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <Checkbox value={"faceafacehandi"} dispatch={dispatch}/>

                                                            {/*<input type="radio" className="mr-2 ml-2 form-radio"  onChange={(e)=>this.radiochange(e.target.value)} value="faceafacehandi" name="algochange"/>*/}
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
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <Checkbox value={"overunder"} dispatch={dispatch}/>
                                                            {/*<input type="radio" className="mr-2 ml-2 form-radio"  onChange={(e)=>this.radiochange(e.target.value)} value="overunder"  name="algochange"/>*/}
                                                           <div className={this.state.activealgo=== "overunder" ? "d-flex opacity-2": "d-flex"}>
                                                               <button  className={this.state.overundererrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                                                                        type="button" onClick={()=> this.overunder()}
                                                                        disabled={this.state.overundererrors===0  || this.state.activealgo=== "overunder"}>
                                                                   Plus / Moins<strong className="spanred">{this.state.overundererrors}</strong> </button>
                                                               <button  className={this.state.overundererrors ===0 ? "button1 no-rop-cursor":"button1"}
                                                                        onClick={(e) => this.exportToCSV(this.state.overundererrorsarr,"plusmoineroors")}
                                                                        type="button"
                                                                        disabled={this.state.overundererrors===0 || this.state.activealgo=== "overunder"}>
                                                                   <i className="fa fa-download"></i> </button>
                                                           </div>
                                                        </div>
                                                    </div>
                                                    <div className="download-btn">
                                                        {
                                                            data.length>0 && <div>
                                                                <CSVLink  filename={"errors.csv"} data={data}><button type="button"><i className="fa fa-download"></i>  </button></CSVLink>
                                                            </div>
                                                        }
                                                    </div>
                                                    {/*<div className="col-sm-3 per-page-col">*/}
                                                        {/*<label>item per page</label>*/}
                                                        {/*<select onChange={(e) => this.nitems(e.target.value)}>*/}
                                                            {/*<option value="20">20</option>*/}
                                                            {/*<option value="40">40</option>*/}
                                                        {/*</select>*/}
                                                    {/*</div>*/}
                                                </div>
                                                <div className="row chifree m-0 mt-3 mb-3">
                                                    {/*<Checkbox value={"faceafacehandi"} dispatch={dispatch} />*/}
                                                    {/*<input type="radio" className=" ml-2 mr-2 form-radio"  onChange={(e)=>this.radiochange(e.target.value)} value="majorrev" name="algochange"/>*/}
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
                                                    {/*<Checkbox value={"faceafacehandi"} dispatch={dispatch} />*/}
                                                    {/*<input type="radio" className="mr-2 ml-2 form-radio"  onChange={(e)=>this.radiochange(e.target.value)} value="minorrev" name="algochange"/>*/}
                                                    <div className={this.state.activealgo=== "minorrev" ? "d-flex opacity-2": "d-flex"}>
                                                        <button  className={this.props.minorarray.length===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                                                                 type="button" onClick={()=> this.minoreven()}
                                                                 disabled={this.props.minorarray.length===0 || this.state.activealgo=== "minorrev" }>
                                                            Minor Revenue
                                                            <strong className="spanred">{this.props.minorarray.length}</strong></button>
                                                        <button onClick={(e) => this.exportToCSV(this.props.minorarray,"minorrevenueerrors")}
                                                                className={this.props.minorarray.length===0 ? "button1 no-rop-cursor":"button1"}
                                                                type="button" disabled={this.props.minorarray.length===0 || this.state.activealgo=== "minorrev"}
                                                        ><i className="fa fa-download"></i>
                                                        </button>
                                                    </div>
                                                    {/*<Checkbox value={"faceafacehandi"} dispatch={dispatch} />*/}
                                                    {/*<input type="radio" className=" ml-2 mr-2 form-radio"  onChange={(e)=>this.radiochange(e.target.value)} value="allotherrev" name="algochange"/>*/}
                                                    <div className={this.state.activealgo=== "allotherrev" ? "d-flex opacity-2": "d-flex"}>
                                                        <button className={this.state.allothererrors===0 ? "button d-flex no-rop-cursor":"button d-flex"}
                                                                type="button" onClick={()=> this.allother()}
                                                                disabled={this.state.allothererrors===0 || this.state.activealgo=== "allotherrev"}>
                                                            All Event <strong className="spanred">{this.state.allothererrors}</strong></button>
                                                        <button  onClick={(e) => this.exportToCSV(this.state.allother,"allerrorsofother")}
                                                                 className={this.state.allothererrors===0  ? "button1 no-rop-cursor":"button1"}
                                                                 type="button"  disabled={this.state.allothererrors===0 || this.state.activealgo=== "allotherrev"}>
                                                            <i className="fa fa-download"></i> </button>
                                                    </div>

                                                </div>
                                                <Inputcontainer  />

                                                <Table head={headers} data={data} pageSize={this.state.itemonpage} />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    this.state.loading &&
                                    <div>
                                        <div className="loader">
                                        </div>

                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default control;