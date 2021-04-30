import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Centralizer, Content } from '../../template/styles';
import { CardContent } from './styles';
import { UseAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import Header from '../../components/Header';
import house from '../../assets/house.png'

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [saleProperty, setSaleProperty] = useState();
  const { SignOut } = UseAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    };

    const getProperties = async (isMounted) => {
      try {
        const { data } = await api.get('properties/');

        if (isMounted) {
          setProperties(data);
          console.log('Properties: ', data);
          setLoading(false);
        };
      } catch (error) {
        console.log('Error dashboard: ', error);
        history.push('');
        SignOut();
      };
    };

    getProperties(isMounted);

    return () => isMounted = false;
  }, []);

  const getClients = async () => {
    setModalLoading(true);

    try {
      const { data } = await api.get('clients/');

      setClients(data);
      console.log('Clients: ', data);
      setModalLoading(true);
    } catch (error) {
      console.log('Error clients: ', error);
      history.push('');
      SignOut();
    };
  };

  const toggle = (property = false) => {
    property ? setSaleProperty(property) : setSaleProperty();
    if (property) {
      getClients();
    }
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      <Header/>
      {loading ? (
        <Centralizer>
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </Centralizer>
      ) : (
        <Container>
          <Modal show={modalVisible} onHide={toggle}>
            <Modal.Header closeButton>
              <Modal.Title>Vender Propriedade</Modal.Title>
            </Modal.Header>
            {loading ? (
              <Centralizer>
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
              </Centralizer>
            ) : (
              <React.Fragment>
                <Modal.Body>{`Valor: R$ ${saleProperty?.value}`}</Modal.Body>
                <Modal.Body>{`Endereço: ${saleProperty?.street}, ${saleProperty?.number}, ${saleProperty?.district}, ${saleProperty?.city}, ${saleProperty?.state}, ${saleProperty?.zipcode}`}</Modal.Body>
                <Modal.Body>
                  <select>
                    {clients.map((client, index) => (
                      <option key={index} value={client.id} >{client.name}</option>
                    ))}
                  </select>
                </Modal.Body>
                <Modal.Body>
                  <select>
                    <option value="0" >À vista</option>
                    <option value="1" >Parcelado em 180x</option>
                  </select>
                </Modal.Body>
              </React.Fragment>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={toggle}>
                Close
              </Button>
              <Button variant="primary" onClick={toggle}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Row>
            {properties.map((property, index) => (
              <Col key={index} >
                <CardContent>
                  <Content>
                    <div id="formContent">
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={house} />
                        <Card.Body>
                          <Card.Title>R$ {property.value}</Card.Title>
                          <ListGroup variant="flush">
                            <ListGroup.Item>{property.district}</ListGroup.Item>
                            <ListGroup.Item>{`${property.street}, ${property.number}`}</ListGroup.Item>
                            <ListGroup.Item>{`${property.city}, ${property.state}`}</ListGroup.Item>
                          </ListGroup>
                          <Button variant="success" onClick={() => toggle(property)} block >Vender</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </Content>
                </CardContent>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};