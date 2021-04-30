import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { FormRegister, Centralizer, RequiredError } from '../../template/styles';
import colors from '../../template/colors';
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
    .test('gender', 'Campo obrigatório', (value) => {
      return value ? (value !== '0') : false;
    })  
    .required('Campo obrigatório'),
})

export default function Client() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
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
                    style={errors.name && {
                      borderBottomWidth: 2,
                      borderBottomColor: colors.danger
                    }}
                    placeholder="Nome completo"
                    disabled={loading ? true : false}
                    {...register('name')}
                  />
                  {errors.name && (<RequiredError>{errors.name.message}</RequiredError>)}
                  <input
                    type="date"
                    id="birth"
                    style={errors.birth && {
                      borderBottomWidth: 2,
                      borderBottomColor: colors.danger
                    }}
                    disabled={loading ? true : false}
                    {...register('birth')}
                  />
                  {errors.birth && (<RequiredError>{errors.birth.message}</RequiredError>)}
                  <select
                    id="gender"
                    defaultValue="0"
                    style={errors.gender && {
                      borderBottomWidth: 2,
                      borderBottomColor: colors.danger
                    }}
                    {...register('gender')}
                    disabled={loading ? true : false}>
                    <option value="0" disabled >Informe seu gênero...</option>
                    <option value="1" >Masculino</option>
                    <option value="2" >Feminino</option>
                    <option value="3" >Outro</option>
                  </select>
                  {errors.gender && (<RequiredError>{errors.gender.message}</RequiredError>)}
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