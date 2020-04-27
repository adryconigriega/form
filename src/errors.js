import React  from 'react';

function Errors(props) {



    return (

        <div>
            { props.error && props.error.type === 'required' && <span>Ce champ est obligatoire</span>}
            { props.error && props.error.type === 'maxLength' && <span>Le champ dépasse les 30 caractères</span>}
        </div>
    )

}

export default Errors