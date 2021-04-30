import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Centralizer, Content, RequiredError } from '../../template/styles';
import { CardContent, Form, Submit } from './styles';
import { UseAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import Header from '../../components/Header';
import house from '../../assets/house.png';
import colors from '../../template/colors';

const schema = yup.object().shape({
  client: yup
    .string()
    .test('client', 'Campo obrigatório', (value) => {
      return value ? (value !== '0') : false;
    })
    .required('Campo obrigatório'),
  payment: yup
    .string()
    .test('payment', 'Campo obrigatório', (value) => {
      return value ? (value !== '0') : false;
    })  
    .required('Campo obrigatório'),
});

export default function Dashboard() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    criteriaMode: 'all',
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [saleLoading, setSaleLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [saleProperty, setSaleProperty] = useState();
  const { SignOut, agent } = UseAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    };

    getProperties(isMounted);

    return () => isMounted = false;
  }, []);

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

  const getClients = async () => {
    setModalLoading(true);

    try {
      const { data } = await api.get('clients/');

      setClients(data);
      console.log('Clients: ', data);
      setModalLoading(false);
    } catch (error) {
      console.log('Error clients: ', error);
      history.push('');
      SignOut();
    };
  };

  const makeSale = async (data) => {
    setSaleLoading(true);

    try {
      await api.post('sales/', {
        "payment": parseInt(data.payment),
        "client": parseInt(data.client - 1),
        "agent": parseInt(agent),
        "property": parseInt(saleProperty.id)
      });

      setSaleLoading(false);
      toggle();
      getProperties(true);
    } catch (error) {
      console.log('Error sale: ', error);
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
            <Form
              onSubmit={handleSubmit(makeSale)}
              id="formSale"
              method="post"
            >
              <Modal.Header closeButton>
                <Modal.Title>Vender Propriedade</Modal.Title>
              </Modal.Header>
              {modalLoading ? (
                <Centralizer>
                  <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                </Centralizer>
              ) : (
                <React.Fragment>
                  <Modal.Body>{`Valor: R$ ${saleProperty?.value}`}</Modal.Body>
                  <Modal.Body>{`Endereço: ${saleProperty?.street}, ${saleProperty?.number}, ${saleProperty?.district}, ${saleProperty?.city}, ${saleProperty?.state}, ${saleProperty?.zipcode}`}</Modal.Body>
                  <Modal.Body>
                    <select
                      id="client"
                      defaultValue="0"
                      style={errors.client && {
                        borderBottomWidth: 2,
                        borderBottomColor: colors.danger
                      }}
                      {...register('client')}
                      disabled={saleLoading ? true : false}
                    >
                      <option value="0" disabled>Cliente</option>
                      {clients.map((client, index) => (
                        <option key={index} value={client.id + 1} >{client.name}</option>
                      ))}
                    </select>
                    {errors.client && (<RequiredError>{errors.client.message}</RequiredError>)}
                  </Modal.Body>
                  <Modal.Body>
                    <select
                      id="payment"
                      defaultValue="0"
                      style={errors.payment && {
                        borderBottomWidth: 2,
                        borderBottomColor: colors.danger
                      }}
                      {...register('payment')}
                      disabled={saleLoading ? true : false}
                    >
                      <option value="0" disabled>Forma de pagamento</option>
                      <option value="1" >À vista</option>
                      <option value="2" >Parcelado em 180x</option>
                    </select>
                    {errors.payment && (<RequiredError>{errors.payment.message}</RequiredError>)}
                    {/* <Selects>
                      <select>
                        <option value="0" >À vista</option>
                        {[...new Array(180)].map((item, index) => (
                          <option value="1" key={index} >{index + 1}</option>
                        ))}
                      </select>
                    </Selects> */}
                  </Modal.Body>
                </React.Fragment>
              )}
              <Modal.Footer>
                <Submit>
                  <input
                    type="submit"
                    value="Vender"
                    disabled={saleLoading ? true : false}
                  />
                </Submit>
              </Modal.Footer>
            </Form>
          </Modal>
          <Row>
            {properties.map((property, index) => (
              <React.Fragment key={index} >
                {property.status && (
                  <Col>
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
                )}
              </React.Fragment>
            ))}
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};