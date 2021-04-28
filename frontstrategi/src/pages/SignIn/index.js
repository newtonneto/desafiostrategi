import React from 'react';
import { useForm } from "react-hook-form";

import { Container } from './styles';
import { UseAuth } from '../../hooks/authProvider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  login: yup
      .string()
      .required('Campo obrigatório'),
  password: yup
      .string()
      .required('Campo obrigatório'),
})


export default function SignIn() {
  const { SignIn } = UseAuth();
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    SignIn(data.login, data.password);
  };

  return (
    <Container>
      <div className="wrapper fadeInDown">
        <div id="formContent">

          {/* <div class="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
          </div> */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            id="formLogin"
            method="post"
          >
            <input
              type="text"
              id="login"
              className="fadeIn second"
              placeholder="usuário"
              {...register('login')}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              placeholder="senha"
              {...register('password')}
            />
            {/* <Controller
              name="login"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <React.Fragment>
                  <input
                    type="text"
                    id="login"
                    className="fadeIn second"
                    placeholder="usuário"
                    onChange={e => setLogin(e.target.value)}
                    value={value}
                  />
                </React.Fragment>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <React.Fragment>
                  <input
                    type="text"
                    id="password"
                    className="fadeIn third"
                    placeholder="senha"
                    onChange={e => setPassword(e.target.value)}
                    value={value}
                  />
                </React.Fragment>
              )}
            /> */}
            <input
              type="submit"
              className="fadeIn fourth"
              value="Log In"
            />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">Esqueci minha senha</a>
          </div>

        </div>
      </div>
    </Container>
  );
};