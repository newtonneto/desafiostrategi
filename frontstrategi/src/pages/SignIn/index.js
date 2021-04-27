import React from 'react';

import { Container } from './styles';

export default function SignIn() {
  return (
    <Container>
      <div class="wrapper fadeInDown">
        <div id="formContent">

          {/* <div class="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
          </div> */}

          <form>
            <input type="text" id="login" class="fadeIn second" name="login" placeholder="usuário" />
            <input type="text" id="password" class="fadeIn third" name="login" placeholder="senha" />
            <input type="submit" class="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a class="underlineHover" href="#">Esqueci minha senha</a>
          </div>

        </div>
      </div>
    </Container>
  );
};