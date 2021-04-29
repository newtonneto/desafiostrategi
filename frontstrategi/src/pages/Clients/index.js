import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Header from '../../components/Header';

export default function Clients() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    };

    const getClients = async (isMounted) => {
      try {
        const { data } = await api.get('clients/');

        if (isMounted) {
          setClients(data);
          console.log('Clients: ', data);
          setLoading(false);

        };
      } catch (error) {
        console.log('Error clients: ', error);
      };
    };

    getClients(isMounted);

    return () => isMounted = false;
  }, []);

  return (
    <React.Fragment>
      <Header/>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Container>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Cliente desde</th>
              </tr>
            </thead>
            {clients.map((client, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index}</td>
                  <td>{client.name}</td>
                  <td>{client.gender === 1 && 'Masculino' || client.gender === 2 && 'Feminino' || client.gender === 3 && 'Outro'}</td>
                  {/* <td>{client.gender === 1 ? 'Masculino' : (client.gender === 2 ? 'Feminino' : 'Outro')}</td> */}
                  <td>{client.created_at}</td>
                </tr>
              </tbody>
            ))}
            </Table>
        </Container>
      )}
    </React.Fragment>
  )
};