import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Centralizer } from '../../template/styles';
import { Options } from './styles';
import { UseAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import Header from '../../components/Header';

export default function Clients() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const { SignOut } = UseAuth();
  const history = useHistory();

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
        history.push('');
        SignOut();
      };
    };

    getClients(isMounted);

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
          <Options>
            <Button variant="outline-primary" href="/client" >Cadastrar novo usuário</Button>
          </Options>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Cliente desde</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                {/* <td>{client.gender === 1 && 'Masculino' || client.gender === 2 && 'Feminino' || client.gender === 3 && 'Outro'}</td> */}
                <td>{client.gender === 1 ? 'Masculino' : (client.gender === 2 ? 'Feminino' : 'Outro')}</td>
                <td>{client.created_at}</td>
                <td><Button variant="outline-warning" href="/client" >Editar</Button></td>
              </tr>
            ))}
            </tbody>
            </Table>
        </Container>
      )}
    </React.Fragment>
  )
};