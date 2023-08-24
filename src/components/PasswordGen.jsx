import React, { useState } from "react";
import { PasswordService } from "../service/passwordService";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useEffect } from "react";
import '../components/Password.css';

let PasswordGen = () =>{


   let [state,setState] = useState({
         generatePassword:'',
         passwordLength:20,
         number:false,
         alphabet:false,
         specialChar:false,
   });

   let [copied, setCopied] = useState(false);
   const [previousPasswords, setPreviousPasswords] = useState([]);


   let updateInput = (event) =>{
    setState({
        ...state,
        [event.target.name] : event.target.value
    })
   };

   let updateCheck = (event) =>{
    setState({
        ...state,
        [event.target.name] : event.target.checked
    })
   };


   let submit = (event) =>{
     event.preventDefault();
     let passwordObj = PasswordService.getPasswordObj(state);
     let thePassword = PasswordService.generatePassword(passwordObj, state.passwordLength )
     setPreviousPasswords(prevPasswords => [thePassword, ...prevPasswords.slice(0, 4)]);
     setState({...state, generatePassword: thePassword})
     
   }
// add data to localstorage

      useEffect(()=>{
         
        localStorage.setItem('previousPasswords', JSON.stringify(previousPasswords))
      },[previousPasswords])

     useEffect(()=>{
        const storedPassword = JSON.parse(localStorage.getItem('previousPasswords'));
        if(storedPassword){
            setPreviousPasswords(storedPassword);
        }
     },[])

    return (
        
        <>
        <div className="conatiner mt-5">
             <div className="row">
             <div className="col-md-4" style={{ position: 'absolute', left: '35%', width: 'auto', top: '25%' }}   
>

             
                <div className="card shadow-lg">
                    <div className="card-header bg-light p-3">
                    <p className="h4">Password Generator</p>

                    </div>
                    <div className="card-body bg-info">
                         <form onSubmit={submit}>
                            <div className="mb-2">
                            <div className="input-group">
                                <span className="input-group-text">Password</span>
                                 <input 
                                   value = {state.generatePassword}
                                   onChange={updateInput}
                                   name = "generatePassword"
                                 type="text" className="form-control" placeholder="Generated Password"/>
                                 <CopyToClipboard text = {state.generatePassword}>
                                <span  className="input-group-text"><i className="fa fa-clipboard"/></span>
                                </CopyToClipboard>
                               </div>
                            </div>
                            <div className="mb-2">
                            <div className="input-group">

            
                            <input 
                              required = {true}
                             value = {state.passwordLength}
                                   onChange={updateInput} 
                                   name = "passwordLength"
                                   type = "number" className="form-control" placeholder="Pawword Length"/>
                            <span className="input-group-text"> Password length</span>
                            </div>
                            </div>
                           
                              <div className="mb-2">
                                <div className="input-group">
                                     <span className="input-group-text bg-white">
                                        <input  onChange={updateCheck} name="number" type="checkbox" className="form-check-input"/>
                                     </span>
                                     <input   type="number"   disabled={true} className="form-control"  placeholder ="number"/>
                                </div>
                              </div>
                              <div className="mb-2">
                                <div className="input-group">
                                     <span className="input-group-text bg-white">
                                        <input onChange={updateCheck} name="alphabet" type="checkbox" className="form-check-input"/>
                                     </span>
                                     <input type="text"   disabled={true} className="form-control"  placeholder ="alphabet"/>
                                </div>
                              </div>
                              <div className="mb-2">
                                <div className="input-group">
                                     <span className="input-group-text bg-white">
                                        <input   onChange={updateCheck}  name="specialChar" type="checkbox" className="form-check-input"/>
                                     </span>
                                     <input type="text"   disabled={true} className="form-control"  placeholder ="special characters"/>
                                </div>
                              </div>
                             
                              <div className="mb-2">
                                <input type="submit" value="Generate" className="btn btn-outline-dark" />
                              </div>
                         </form>
                         <div>
                            <h2>Previous Generated Password</h2>

                            <ul>
                            {previousPasswords.map((password, index) => (
                                 <li key={index}>{password}</li>
                              ))}
                            </ul>
                         </div>

                    </div>
                </div>
                </div>
             </div>
        </div>
           
        </>
    )
}

export default PasswordGen;