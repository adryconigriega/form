import React, { useState } from 'react';
import InputForm from './input';


function GroupCheckBoxs() {
 
    const defaultcheckboxs = {
        langues: [
          {inputName: "cbox1", labelName:"Français"},
          {inputName: "cbox2", labelName:"Allemand"},
          {inputName: "cbox3", labelName:"Anglais"},
        ], 
        services: [
          {inputName: "cbox1", labelName:"VisiSal"},
          {inputName: "cbox2", labelName:"VisiSim"},
          {inputName: "cbox3", labelName:"VisiRev"},
        ]
      }; 
    
    const [blocCheckBox] = useState(defaultcheckboxs)
    
    const inputCheckBox = (grbcbx) => <InputForm type="checkbox" inputName={grbcbx.inputName} labelName={grbcbx.labelName} ></InputForm>

    return ( 
        blocCheckBox.map((item) => (
            inputCheckBox(item)
        ))
    )
 
}


export default InfoForm;