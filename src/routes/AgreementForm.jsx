import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAgreement } from '../actions/actions';

const AgreementForm = () => {
  const agreed = useSelector((state) => state.agreement.agreed);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(toggleAgreement());
  };

  const handleConfirm = () => {
    alert('Соглашение принято! Спасибо за ваше доверие.');
  };

  return (
    <div>
    <div>
      <h2>Пользовательское соглашение</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '200px', overflowY: 'scroll', marginBottom: '20px' }}>
        <p>
          Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между вами (пользователем) и нами (разработчиками).
          Пожалуйста, внимательно прочитайте это Соглашение перед использованием нашего приложения.
        </p>
        <p>
          1. Вы соглашаетесь с тем, что будете использовать приложение только в законных целях.
        </p>
        <p>
          2. Мы не несем ответственности за любые убытки, возникшие в результате использования приложения.
        </p>
        <p>
          3. Вы обязуетесь не распространять вредоносное программное обеспечение через наше приложение.
        </p>
        <p>
          4. Мы оставляем за собой право изменять это Соглашение в любое время без предварительного уведомления.
        </p>
        <p>
          5. Продолжая использовать приложение, вы соглашаетесь с условиями данного Соглашения.
        </p>
      </div>
      <label>
        <input
          type="checkbox"
          checked={agreed}
          onChange={handleCheckboxChange}
        />
        Я принимаю пользовательское соглашение
      </label>
      <br />
      <button onClick={handleConfirm} disabled={!agreed}>
        Подтвердить
      </button>
    </div>
    </div>
  );
};

export default AgreementForm;