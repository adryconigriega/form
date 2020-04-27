import React from 'react';
import {useFormContext , Controller} from "react-hook-form";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
  } from "@material-ui/core";

InputForm.defaultProps = {
    type: "text",
    required: false,
    maxLength: 30
}


function GroupRadio(props) {

    const GroupRadio = (items) => 
                            items.map((item) => 
                                <Controller as={ <RadioGroup name={item.groupName}> 
                                <InputForm type={item.type} inputName={item.inputName} value={item.value} ></InputForm>
                                </RadioGroup> } name={item.groupName} control={item.control} /> 
                            ) 

    return (

        GroupRadio(props.items)
        
    )

}


export default GroupRadio