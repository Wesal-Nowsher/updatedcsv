import React from 'react';

export default () => (
    <style jsx="true">{`
* {
    background-size: cover;
    font-family: "Avenir", Helvetica, Arial, sans-serif;

}
.starter-head{
    margin-top: 0px;
    height: 54px;
    padding-right: 0px;
    padding-left: 0px;
    transform: translateY(0px);
    background-color: rgb(151, 2, 10);
    border-color: rgb(151, 2, 10);
    transition: .2s cubic-bezier(.4,0,.2,1);
    color: #fff;
    z-index: 3;
    top: 0;
    left: 0;
    position: fixed;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    width: 100%;
    will-change: padding-left,padding-right;

}

.starter-head .container-inside{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 24px;
}
.starter-head .container-inside .header{
    display: flex;
    align-items: center;

}
.starter-head .container-inside .header .header-text{
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: .02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: #fff;
}
.starter-head .container-inside  .empty-space{
    -webkit-box-flex: 1!important;
    -ms-flex-positive: 1!important;
    flex-grow: 1!important;
}
.starter-head .container-inside .link{
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    height: 44px;
    padding: 0 32px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 2px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;

    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
     font-weight: 500;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 6px 8px;
    min-width: 88px;
    outline: 0;
    text-transform: uppercase;
    text-decoration: none;
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1),color 1ms;
    transition: .3s cubic-bezier(.25,.8,.5,1),color 1ms;
    position: relative;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.starter-head .container-inside .link div{
    font-weight:600;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: inherit;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
    transition: .3s cubic-bezier(.25,.8,.5,1);
    white-space: nowrap;
    width: inherit;
}
.accuil-content{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.accuil-content .accuil{
    padding: 0px 0px 0px;
    background-image: url("src/Assets/backgournd.png");
    height: 100vh
}
.accuil-content .accuil .accuil-inside{
    -webkit-transition: none;
    transition: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    max-width: 100%;
    padding-top: 6%;
}
.accuil-content .accuil .accuil-inside .accuil-text{
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
}
.accuil-content .accuil .accuil-inside .import-text{
-webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
}
.accuil-content .accuil .accuil-inside .import-text h2{
font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
        font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.file-upload{
    cursor: pointer;
    color: #1976d2 !important;
    caret-color: #1976d2 !important;
    border: 1px solid #1976d2 !important;
    padding: 10px 20px;
    border-bottom-left-radius: 23px;
    border-bottom-right-radius: 23px;
    border-top-left-radius: 23px;
    border-top-right-radius: 23px;
    background: transparent;
    font-size: 15px;
}
.file-upload:hover{
    background:#1976d236 !important;
}
.file-upload:focus{
    outline:none;
}

        `}</style>
);
