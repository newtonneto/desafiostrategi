import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Centralizer } from '../../template/styles';
import { UseAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import Header from '../../components/Header';
import house from '../../assets/house.png'

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const { SignOut } = UseAuth();
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
              <Col key={index} >
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={house} />
                  <Card.Body>
                    <Card.Title>{property.district}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};