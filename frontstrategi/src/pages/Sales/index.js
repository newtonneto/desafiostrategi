import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Centralizer, Content } from '../../template/styles';
import { CardContent } from '../Dashboard/styles';
import { UseAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import Header from '../../components/Header';
import house from '../../assets/house.png';


export default function Sales() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const { SignOut } = UseAuth();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    };

    getSales(isMounted);

    return () => isMounted = false;
  }, []);

  const getSales = async (isMounted) => {
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

  return (
    <React.Fragment>
      <Header/>
      {loading ? (
        <Centralizer>
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </Centralizer>
      ) : (
        <Container>
          <Row>
            {properties.map((property, index) => (
              <React.Fragment key={index} >
                {!property.status && (
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
                              <Button variant="danger" block disabled >Vendido</Button>
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