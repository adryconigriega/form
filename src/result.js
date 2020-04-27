import React from 'react';
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { Card , ListGroup, Row, Col} from 'react-bootstrap';

function Result () {

const { state } = useStateMachine(updateAction);

const data = Object.entries(state.data).map(([key, value]) => ({key, value}))

console.log(data)

  return (
   
    <div>
        <h1>Mes informations</h1>
        <Row className="justify-content-md-center">
        <Col md="auto">
            <Card style={{ width: '500px' }}>
            <ListGroup>
            {data.map(item =>
            <ListGroup.Item style={{ height: '50px'}}>{item.value}</ListGroup.Item>
            )}
            </ListGroup>
            </Card>
        </Col>

        </Row>
          
    </div>
  )
}


export default Result