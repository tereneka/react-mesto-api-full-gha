import React from 'react';
import {
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import logo from '../images/logo-white.svg';

export default function Header({
  userEmail,
  onLogout,
}) {
  return (
    <header className='header'>
      <a href='#'>
        <img
          className='logo'
          src={logo}
          alt='Место'
        />
      </a>

      <Routes>
        <Route
          path='/sign-up'
          element={
            <Link
              className='header__link'
              to={'/sign-in'}>
              Войти
            </Link>
          }
        />

        <Route
          path='/sign-in'
          element={
            <Link
              className='header__link'
              to={'/sign-up'}>
              Регистрация
            </Link>
          }
        />

        <Route
          path='/'
          element={
            <div className='header__container'>
              <p className='header__email'>
                {userEmail}
              </p>
              <Link
                className='header__link header__link_page_main'
                to={'/sign-up'}
                onClick={onLogout}>
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
