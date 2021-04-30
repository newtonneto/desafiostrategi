import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormLogin, RequiredError } from '../../template/styles';
import colors from '../../template/colors';
import { UseAuth } from '../../hooks/authProvider';

const schema = yup.object().shape({
  login: yup
    .string()
    .required('Campo obrigatório'),
  password: yup
    .string()
    .required('Campo obrigatório'),
});

export default function SignIn() {
  const { SignIn } = UseAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
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
              style={errors.login && {
                borderBottomWidth: 2,
                borderBottomColor: colors.danger
              }}
              placeholder="usuário"
              {...register('login')}
            />
            {errors.login && (<RequiredError>{errors.login.message}</RequiredError>)}
            <input
              type="password"
              id="password"
              className="fadeIn third"
              style={errors.login && {
                borderBottomWidth: 2,
                borderBottomColor: colors.danger
              }}
              placeholder="senha"
              {...register('password')}
            />
            {errors.password && (<RequiredError>{errors.password.message}</RequiredError>)}
            <input
              type="submit"
              className="fadeIn fourth"
              value="Log In"
            />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="/changepassword">Esqueci minha senha</a>
          </div>

        </div>
      </div>
    </FormLogin>
  );
};