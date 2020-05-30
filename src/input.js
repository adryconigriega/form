// Composant pour créer un champ de plusieurs types (text par défaut)
import React from 'react';
import {useFormContext } from "react-hook-form";
import { FormControlLabel, Radio } from "@material-ui/core";
import Errors from './errors';

// Propriétés par défaut si rien définit dans les props
InputForm.defaultProps = {
    type: "text",
    required: false,
    maxLength: 30
}

function InputForm (props) {
    //Contient les indentifiants des champs
    const { register } = useFormContext();

    var InputReturned = null

    const InputText = (labelName, type, inputName, register, errorMessage) =>  
    <div>
        <label>{labelName}:  <input type={type} name={inputName} ref={register} /> </label> 
        <Errors error={errorMessage}> </Errors> 
    </div>
    //-------------------------------------
    const InputRadio = (value, inputName) => 
    <FormControlLabel value={value} control={<Radio/>} label={inputName}/> 
    //-------------------------------------
    const InputEmail = (type, inputName, register, errorMessage) => 
    <div> <label>Email:  <input type={type} name={inputName} ref={register} /> </label> 
        <Errors error={errorMessage}> </Errors> 
    </div>

    switch (props.type) {
        case "radio":
            InputReturned = InputRadio(props.value,props.inputName)
            break;
        case "email":
            InputReturned = InputEmail(props.type,props.inputName, register({ required: props.required } ), props.error)
            break;
        default: InputReturned = InputText(props.labelName, props.type, props.inputName, register({ required: props.required, maxLength: props.maxLength}), props.error)
            break; 
    }


    return (
        InputReturned 
    )

}


export default InputForm;