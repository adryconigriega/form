import React, { useState } from 'react';
import { useForm, FormContext, Controller } from "react-hook-form"
import { useStateMachine } from "little-state-machine";
import './style.css';
import InputForm from './input';
import { RadioGroup } from "@material-ui/core";
import updateAction from './updateAction';
import axios from 'axios';
import { Alert, ListGroup  } from 'react-bootstrap'; 


function InfoForm (props) { 
 

  //CONSTANTES 

  const { action } = useStateMachine(updateAction); //MAJ des données 
  const methods = useForm(); //Contient tous les méthodes pour gérer le formulaire (données et comportement)
  const [dataSubmitted, setDataSubmitted] = useState(); //Données exploitatables du formulaire (tableau) + méthode MAJ du tableau
  const [formOk, setFormOk] = useState(false); //État de la validation du formulaire
  var [errorMessageCheckBox, setErrorMessageCheckBox] = useState() //Message d'erreur pour les checkboxs
  var [errorReponseServer, setErrorReponseServer] = useState([{value:"", msg: "", param:"", location:""}]) // Tableau d'erreurs retourné par le serveur

  // Définition d'un groupe de checkboxs 
 
  const checkboxs = {
    langues: [
      {inputName: "cbox1", labelName:"Français"},
      {inputName: "cbox2", labelName:"Allemand"},
      {inputName: "cbox3", labelName:"Anglais"},
    ], 
    services: [
      {inputName: "cbox1", labelName:"Français"},
      {inputName: "cbox2", labelName:"Allemand"},
      {inputName: "cbox3", labelName:"Anglais"},
    ]
  }; 

  const [blocCheckBox] = useState(checkboxs)
 
  console.log(blocCheckBox)
  
  
  //Methode de test 

  // const getBlocCheckBox = (gcbxName, checkboxs) => {
  //     const gcbx = '{ "langues" : [' +
  //     '{ "inputName":"John" , "labelName":"Doe" },' +
  //     '{ "inputName":"Anna" , "labelName":"Smith" },' +
  //     '{ "inputName":"Peter" , "labelName":"Jones" } ]}';

  //     return (
  //       gcbx
  //     )
  // }

  // var text = '{ "at" : [' +
  // '{ "inputName":"John" , "labelName":"Doe" },' +
  // '{ "inputName":"Anna" , "labelName":"Smith" },' +
  // '{ "inputName":"Peter" , "labelName":"Jones" } ]}';

  // var obj = JSON.parse(text)



  //METHODES 

  // Envoie des données au serveur et récupération de la réponse en JSON
  const onSubmit = data => { 
    action(data);
  //Création d'un tableau à partir de DATA avec key + value
  const datajson = Object.entries(data).map(([key, value]) => ({key, value}))

  if (ValidationCheckBoxs(checkboxs, datajson)) {
      console.log('validé')
      //Envoie de données
      axios.post('http://localhost:4000/', data)
        //Récuperation de la réponse
        .then( reponse => {
          console.log(reponse.data.errors) 
          setDataSubmitted(reponse) 
          setErrorReponseServer(reponse.data.errors)
          setFormOk(true)
        })
        .catch(error => {
          console.log(error)
        })
        
    }
    else {
      console.log('non validé')
      setErrorMessageCheckBox(<span>Veuillez cocher au moins une case</span>)
    }
    
  }
  
  //Validation des checkboxs coté client

  const ValidationCheckBoxs = (checkboxs, datasent) => {

    var validation = false 

    datasent.forEach(itemsend => {
      //Obtention des checkbox selon le prefixe 'cbox' 
      if (itemsend.key.includes('cbox')) {
        //Validation que des checkbox
        checkboxs.forEach(itembox => {
          if (itemsend.key === itembox.inputName) {
              if (itemsend.value) {
                validation = true
              }
          }
        });
      }
    });

    return (validation)

  }
  
 

  const MessageValidation = <div>
                            <Alert variant="success">
                            <Alert.Heading>Benchmarking Services</Alert.Heading>
                            <p> Demande d'information </p>
                            <hr /> 
                            <p className="mb-0">
                                Votre demande d'information a été enregistrée.<br></br>
                                Nous vous remercions de votre intérêt pour nos services.<br></br>

                                Nous allons prendre prochainement contact avec vous. <br></br>
                         
                            <p> 

                            </p>
                            </p>
                            </Alert> 
                            </div>

  const MessagesErrorServer = <Alert variant="danger">
                              <Alert.Heading>Benchmarking Services</Alert.Heading>
                              <p> Demande d'information </p>
                              <hr />
                              <p className="mb-0">
                                  Votre demande d'information contient les erreurs suivantes: <br></br>
                              {errorReponseServer.map(item => (
                                <p>{item.msg}</p>
                              ))}

                              </p>
                              </Alert>
                            

  const CepecFormRequest = <FormContext {...methods} > 

                            <h1>Formulaire</h1>
                            
                            <form align="left" onSubmit={methods.handleSubmit(onSubmit)}> 

                              <InputForm error={methods.errors.email} type="email" inputName="email"> </InputForm>
                                
                              <label>Salutations</label> 

                              <Controller as={ <RadioGroup name="salutations"> 
                                <InputForm type="radio" inputName="monsieur" value="Monsieur" ></InputForm>
                                <InputForm type="radio" inputName="madame" value="Madame" ></InputForm>
                              </RadioGroup> } name="salutations" control={methods.control} />
                              
                              <InputForm error={methods.errors.lastname} inputName="lastname" labelName="Nom" ></InputForm> 
                              <InputForm error={methods.errors.name} inputName="name" labelName="Prénom"> </InputForm> 

                              <label>Choisissez une langue</label>

                            

                            
                              

                              {blocCheckBox.langues.map((item) => (
                               
                                  <InputForm type="checkbox" inputName={item.inputName} labelName={item.labelName} ></InputForm>
                        
                              ))}
                              {errorMessageCheckBox}

                              

                              {/* <InputForm error={methods.errors.fonction}  inputName="fonction" labelName="Fonction" ></InputForm> 
                              <InputForm error={methods.errors.company} inputName="company" labelName="Entreprise" ></InputForm> 
                              <InputForm error={methods.errors.departement} inputName="departement" labelName="Département" ></InputForm> 
                              <InputForm error={methods.errors.adress} inputName="adress" labelName="Adresse" ></InputForm> 
                              <InputForm error={methods.errors.numberadress} inputName="numberadress" labelName="N°" ></InputForm> 
                              <InputForm error={methods.errors.npa} type="number" inputName="npa" labelName="NPA" ></InputForm> 
                              <InputForm error={methods.errors.pays} inputName="pays" labelName="Pays" ></InputForm>
                              <InputForm error={methods.errors.tel} inputName="tel" labelName="Téléphone" ></InputForm>
                              <InputForm error={methods.errors.comments} inputName="comments" labelName="Commentaires" ></InputForm>  */}
                               
                            <button type="submit">Envoyer</button>
                          </form>

                          </FormContext>

      if (formOk) {
        return (
          <div>
            {MessageValidation}
            {MessagesErrorServer}
          </div>
          
        )
      }
      else {
        return (
          CepecFormRequest
        )
      }
          
}


export default InfoForm;