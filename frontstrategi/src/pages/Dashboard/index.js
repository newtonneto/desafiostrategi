import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { Grid } from './styles';
import api from '../../services/api';
import house from '../../assets/house.png'

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    };

    const getProperties = async (isMounted) => {
      const { data } = await api.get('properties/');

      if (isMounted) {
        setProperties(data);
        console.log('Data: ', data);
        setLoading(false);
      };
    };

    getProperties(isMounted);

    return () => isMounted = false;
  }, []);

  return (
    <Container>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Row>
          {properties.map((property, index) => (
            <Col key={index}>
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
      )}
    </Container>
  );
};