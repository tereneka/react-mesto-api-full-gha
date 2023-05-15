import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ErrorMessage from './ErrorMessage';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import RouterApp from './RouterApp';
import Spinner from './Spinner';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(
    {}
  );
  const [currentUserEmail, setCurrentUserEmail] =
    useState('');

  const [cards, setCards] = useState([]);

  const [
    isEditAvatarPopupOpen,
    setIsEditAvatarPopupOpen,
  ] = useState(false);
  const [
    isEditProfilePopupOpen,
    setIsEditProfilePopupOpen,
  ] = useState(false);
  const [
    isAddPlacePopupOpen,
    setIsAddPlacePopupOpen,
  ] = useState(false);
  const [selectedCard, setSelectedCard] =
    useState(null);
  const [tooltipData, setTooltipData] = useState({
    state: '',
    message: '',
  });
  const [
    isFormDataLoading,
    setIsFormDataLoading,
  ] = useState(false);

  const [isError, setIsError] = useState('');

  const [isContentLoading, setIsContentLoading] =
    useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleUpdateAvatar(newAvatar) {
    setIsFormDataLoading(true);
    api
      .setAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => setIsError(err))
      .finally(() => setIsFormDataLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleUpdateUser(newUserInfo) {
    setIsFormDataLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => setIsError(err))
      .finally(() => setIsFormDataLoading(false));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleAddPlace(card) {
    setIsFormDataLoading(true);
    api
      .postCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => setIsError(err))
      .finally(() => setIsFormDataLoading(false));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );

    api
      .setCardLikeStatus(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) =>
            c._id === card._id ? newCard : c
          )
        )
      )
      .catch((err) => setIsError(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) =>
          state.filter(
            (item) => item._id !== card._id
          )
        )
      )
      .catch((err) => setIsError(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipData({ state: '', message: '' });
  }

  function handleLogin(values) {
    auth
      .login(values)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setCurrentUserEmail(values.email);
          navigate('/');
        }
      })
      .catch((err) => {
        setTooltipData({
          state: 'error',
          message: `${
            err === 401
              ? 'Неверный Email или пароль. Попробуйте ещё раз.'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }`,
        });
      });
  }

  function handleRegister(values) {
    auth
      .register(values)
      .then((res) => {
        if (res.data) {
          setTooltipData({
            state: 'success',
            message:
              'Вы успешно зарегистрировались!',
          });
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setTooltipData({
          state: 'error',
          message:
            'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }

  // function handleTokenCheck() {
  //   if (localStorage.getItem('jwt')) {
  //     setIsContentLoading(true);
  //     auth
  //       .checkToken()
  //       .then((res) => {
  //         if (res.data) {
  //           setLoggedIn(true);
  //           setCurrentUserEmail(res.data.email);
  //           navigate('/');
  //         }
  //       })
  //       .catch(() => {
  //         localStorage.removeItem('jwt');
  //         setIsContentLoading(false);
  //       });
  //   }
  // }

  useEffect(() => {
    // handleTokenCheck();
    api
      .getUserInfo()
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        setCurrentUser(data);
        setCurrentUserEmail(data.email);
        navigate('/');
      })
      .catch((err) => {
        setIsContentLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     Promise.all([
  //       api.getUserInfo(),
  //       api.getCards(),
  //     ])
  //       .then(([user, cards]) => {
  //         setCurrentUser(user);
  //         setCards([...cards]);
  //       })
  //       .catch((err) => {
  //         setIsError(err);
  //       })
  //       .finally(() =>
  //         setIsContentLoading(false)
  //       );
  //   }
  // }, [loggedIn]);
  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((data) => {
          setCards([...data]);
        })
        .catch((err) => {
          setIsError(err);
        })
        .finally(() =>
          setIsContentLoading(false)
        );
    }
  }, [loggedIn]);

  return (
    <>
      {isError && (
        <ErrorMessage message={isError} />
      )}

      {isContentLoading && <Spinner />}

      {!isContentLoading && !isError && (
        <div className='content'>
          <CurrentUserContext.Provider
            value={currentUser}>
            <Header
              userEmail={currentUserEmail}
            />

            <RouterApp
              loggedIn={loggedIn}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={
                handleEditProfileClick
              }
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onRegister={handleRegister}
              onLogin={handleLogin}
            />

            <Footer />

            {isEditAvatarPopupOpen && (
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                isLoading={isFormDataLoading}
                onClose={closeAllPopups}
                onUpdateAvatar={
                  handleUpdateAvatar
                }
              />
            )}

            {isEditProfilePopupOpen && (
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                isLoading={isFormDataLoading}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {isAddPlacePopupOpen && (
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                isLoading={isFormDataLoading}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
              />
            )}

            {selectedCard && (
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              />
            )}

            {tooltipData.state && (
              <InfoTooltip
                data={tooltipData}
                onClose={closeAllPopups}
              />
            )}
          </CurrentUserContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;
