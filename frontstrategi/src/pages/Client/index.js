import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { FormRegister, Centralizer } from '../../template/styles';
import { UseAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import Header from '../../components/Header';

const schema = yup.object().shape({
  name: yup
      .string()
      .required('Campo obrigatório'),
  birth: yup
      .string()
      .required('Campo obrigatório'),
  gender: yup
      .string()
      .required('Campo obrigatório'),
})

export default function Client() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    resolver: yupResolver(schema)
  });
  const { SignOut } = UseAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await api.post('clients/', {
        "name": data.name,
        "birth": data.birth,
        "gender": parseInt(data.gender)
      });

      setLoading(false);
      history.push('clients');
    } catch (error) {
      console.log('Error client: ', error);
      setLoading(false);
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
          <FormRegister>
            <div className="wrapper">
              <div id="formContent">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="formLogin"
                  method="post"
                >
                  <input
                    type="text"
                    id="name"
                    placeholder="Nome completo"
                    disabled={loading ? true : false}
                    {...register('name')}
                  />
                  <input
                    type="date"
                    id="birth"
                    disabled={loading ? true : false}
                    {...register('birth')}
                  />
                  <select id="gender" defaultValue="0" {...register('gender')} disabled={loading ? true : false}>
                    <option value="0" disabled >Informe seu gênero...</option>
                    <option value="1" >Masculino</option>
                    <option value="2" >Feminino</option>
                    <option value="3" >Outro</option>
                  </select>
                  <input
                    type="submit"
                    value="Cadastrar"
                  />
                </form>
              </div>
            </div>
          </FormRegister>
        </Container>
      )}
    </React.Fragment>
  );
};