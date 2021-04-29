import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormLogin } from '../../template/styles';
import { UseAuth } from '../../hooks/authProvider';

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
    <FormLogin>
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
    </FormLogin>
  );
};