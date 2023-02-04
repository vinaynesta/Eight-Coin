import { login } from './login';
import { logout } from './login';
import '@babel/polyfill';
import { signUp } from './signup';
import { updateData } from './updateSettings';
import { updateC } from './updateCoins';

import { showAlert } from './alert'


const signupForm = document.querySelector("#sign-up-form");

if (signupForm){
    $("#signup-submit").click(()=>{
        let a=JSON.stringify($('#sign-up-form').serialize()) 
        let res = a.replace(/=/g, '":"');
        res= res.replace(/&/g,'","')
        res= res.replace(/%40/g,'@')
        res= res.replace(/%20/g,' ')
        let c = '{'+res+'}'
        const data = JSON.parse(c)
        //console.log(data)  

        //console.log(data.password,data.passwordConfirm);
        if (data.password === data.passwordConfirm){
            signUp(data)
        }
        else{
            showAlert("error","Your Passwords don't match")
        }

    })
}

const cpin = document.querySelector("#cpin");
if (cpin){

    
    $("#cpin-submit").click(()=>{
        let a=JSON.stringify($('#cpin-form').serialize()) 
        let res = a.replace(/=/g, '":"');
        res= res.replace(/&/g,'","')
        res= res.replace(/%40/g,'@')
        let c = '{'+res+'}'
        const data = JSON.parse(c)
        console.log(data)  

        if (data.cpin === data.cpinConfirm){
            updateData(data,"cpin")
        }
        else{
            showAlert("error","Your Passwords don't match")
        }

    })

}

// login settings (login and log-out)

const acc = document.querySelector(".user-details");
if (acc){
    $("#user").click(()=>{
        location.assign("/account")
    })
}
const prof = document.querySelector(".user-details");
if (prof){
    $("#user-profile").click(()=>{
        location.assign("/profile")
    })
}



const loginForm = document.querySelector("#login-form");
const logoutBtn = document.querySelector('#logout-button');

if (loginForm) {

    $("#login-button").click(()=>{
        let a=JSON.stringify($('#login-form').serialize()) 
        let res = a.replace(/=/g, '":"');
        res= res.replace(/&/g,'","')
        res= res.replace(/%40/g,'@')
        let c = '{'+res+'}'
        const loginData = JSON.parse(c)
        console.log(loginData,res,a)  

        login(loginData)
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}


const privatekey = document.querySelector("#private-key");

if (privatekey){

    let pin1 = $("#user-profile").attr("data-val")

    $("#eye").click(() =>{
        let pin2 = prompt("Please enter your Cpin")
        if (pin1 == pin2){
            let a = $("#pk2").attr("data-key")
            $("#pk1").text(a)
            $("#eye").hide()

        } 
        else{
            showAlert("error","Wrong Cpin")
        }
    })
}

const editDetails = document.querySelector("#ep1");

if (editDetails){
    $("#edit-details").click(()=>{
        let a=JSON.stringify($('#ep11').serialize()) 
        let res = a.replace(/=/g, '":"');
        res= res.replace(/&/g,'","')
        res= res.replace(/%20/g,' ')
        res= res.replace(/%40/g,'@')
        let c = '{'+res+'}'
        let editData = JSON.parse(c)

        const form = new FormData();
        form.append('photo', document.getElementById('photo').files[0]);

        for (const i in editData) {
            form.append(`${i}`, editData[i]);
          }
        //console.log(form)  
        updateData(form)
    })
}


const cur = document.querySelector("#cx1");

if (cur){

    const currencyexchange = {india:0.0128915818,
        china:0.0011939586,
        mexico:0.0502008032,
        malaysia:0.2277904328,
        egypt:0.0547045952,
        saudiarabia:0.2666666667,
        pakistan:0.0049975012,
        iraq:0.0006851662,
        europe:1.0526315789,
        swizerland:1.0309278351,
        usa:1,
        canada:0.78125,
        australia:0.7042253521,
        singapore:0.7246376812,
        newzealand:0.641025641,
        brazil:0.2028397566,
        israel:0.2976190476,
        southafrica:0.0631313131,
        russia:0.017088175,
        uk:1.25,
        japan:0.0078228898,
        };

    let value = 0 
    $("#currencies").click(() => {
        let c = $('#currencies').find(":selected").val();
        let a = $("#amount").val()
        a= parseInt(a)
        
        value = currencyexchange[c]*a
        console.log(value);
        $("#setCurrVal").text(`${value}`)

    })
    


    
    $("#buy-button").click(() =>{
        if (value != 0){
    
            let c = $("#getbal").attr("data-coin")
            c= parseFloat(c)
            c+=value
        const form = {coinBalance:c};
        updateData(form,"coins")
        }
        
    })

    $("#ads1").click(() =>{
        let c = $("#numberOfCoins").val()
        let bal = $("#bal").val()
        c = parseFloat(c)
        bal = parseFloat(bal)
        if(c > bal){
            showAlert("error","Insufficient balance")
        }
        else{
            let rpuba = $("#receiverPublicAddress").val()
            let spuba = $("#ads1").attr("data-publickey")
            const fdata = {name:"Transfer Coins",receiverPublicAddress:rpuba,senderPublicAddress:spuba,sentCoins:c}
            updateC(fdata);
        }
        
        
    })

    $("#currencies1").click(() => {
        let c = $('#currencies1').find(":selected").val();
        let a = $("#amount1").val()
        a= parseInt(a)
        
        value = currencyexchange[c]*a
        //console.log(value);
        $("#setCurrVal1").text(`${value}`)

    })

    $("#transfer-cash").click(() =>{
        let c = $("#setCurrVal1").text()
        c= parseFloat(c)
        
        
        let bal = $("#bal").text()
        bal = parseFloat(bal)
        if(c > bal){
            showAlert("error","Insufficient balance")
        }
        else{
            let rpuba =  $("#receiverPublicAddress1").val()
            let spuba = $("#ads1").attr("data-publickey")
            let name = "Transfer Cash"
            const fdata = {receiverPublicAddress:rpuba,senderPublicAddress:spuba,sentCoins:c,name:name}
            updateC(fdata);
        }
        
    })

    
    

}
let searchParams = new URLSearchParams(window.location.search)

if(searchParams.has('coins')){
    let param = searchParams.get('coins')
    $("#numberOfCoins").val(param)
}
if(searchParams.has('name')){
    console.log("hii");
    let param = searchParams.get('name')
    param = param.replace(/%20/g, " ");
    $("#orderName").text(param)
}


$("#pay").click(() =>{
        
        
        let c =  $("#numberOfCoins").val()
        c = parseFloat(c)
        let rpuba =  $("#receiverPublicAddress").val()
        let spuba = $("#puk").attr("data-publickey")
        let name = $("#orderName").text()
        const fdata = {receiverPublicAddress:rpuba,senderPublicAddress:spuba,sentCoins:c,name:name}
        //console.log(fdata);
       updateC(fdata);
    
})

for(let i=0;i<6;i++){
    $(`#b${i}`).click( ()=>{
        let name = $(`#ab${i}`).data("name")
        let coins = $(`#ab${i}`).data("coins")
        coins = parseInt(coins)
        location.assign(`/paymerchant?coins=${coins}&name=${name}`)
    })
}

