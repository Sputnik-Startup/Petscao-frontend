import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FiAlertCircle,
  FiBell,
  FiCalendar,
  FiSettings,
  FiX,
} from 'react-icons/fi';
import ComponentHeader from '../../components/ComponentHeader';
import DateInput from '../../components/DateInput';
import { UserContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import api from '../../services/api';

import { Container } from '../Appointment/styles';
import { schema } from './schema';

function Tools() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [dataVerifyModal, setDataVerify] = useState(false);
  const [sendNotificationModal, setSendNotification] = useState(false);
  const [date, setDate] = useState(null);
  const [hours, setHours] = useState([]);

  const { showToast } = useContext(ToastContext);
  const { user, token } = useContext(UserContext);

  function closeModal(e) {
    e.preventDefault();
    setDate(null);
    setHours([]);

    if (dataVerifyModal) setDataVerify(false);
    if (sendNotificationModal) setSendNotification(false);
  }

  async function onSubmit(data) {
    try {
      const notification = await api({
        method: 'post',
        url: '/company/notifications',
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(notification);

      showToast(
        'Notificação enviada com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
      setSendNotification(false);
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  function handleCopy(text) {
    let elem = document.createElement('textarea');
    if (elem) {
      document.body.appendChild(elem);
      elem.value = text;
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
    }
  }
  return (
    <Container>
      <ComponentHeader
        title="Ferramentas"
        icon={<FiSettings size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content" style={{ background: 'none' }}>
        <div className="card" onClick={() => setDataVerify(true)}>
          <FiCalendar size={30} color="#c959ad" />
          <h3 style={{ color: '#c959ad' }}>Verificar data</h3>
        </div>
        {user.access === 'adm' && (
          <div className="card" onClick={() => setSendNotification(true)}>
            <FiBell size={30} color="#6c7ae6" />
            <h3 style={{ color: '#6c7ae6' }}>Enviar notificação</h3>
          </div>
        )}
      </div>
      {dataVerifyModal && (
        <div className="global-modal">
          <div className="modal">
            <button onClick={closeModal}>
              <FiX size={16} color="#fff" />
            </button>
            <label htmlFor="">Selecione a data</label>
            <DateInput
              setDate={setDate}
              date={date}
              onlyDate
              getHour={setHours}
            />

            <label htmlFor="">Horários disponíveis</label>
            <ul className="hours">
              {!hours[0] && (
                <li className="hour no-hours">
                  Selecione uma data parar mostrar os horários
                </li>
              )}
              {hours.map((hour) => (
                <li
                  className={`hour ${hour.available ? '' : 'not-available'}`}
                  key={hour.time}
                >
                  {hour.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {sendNotificationModal && (
        <div className="global-modal">
          <div className="modal-window w-500">
            <form className="notify-form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="title">Título da notificação</label>
              <input
                type="text"
                name="title"
                id="title"
                ref={register}
                placeholder="Feriado"
                style={{ marginBottom: errors.title ? '5px' : '10px' }}
              />
              {errors.title && <p className="error">{errors.title.message}</p>}

              <label htmlFor="content">Conteúdo</label>
              <input
                type="text"
                name="content"
                id="content"
                ref={register}
                placeholder="Não abriremos na próxima quarta-feira"
                style={{ marginBottom: errors.content ? '5px' : '10px' }}
              />
              {errors.content && (
                <p className="error">{errors.content.message}</p>
              )}

              <label htmlFor="midia">Ícone</label>
              <input
                type="text"
                name="midia"
                id="midia"
                ref={register}
                placeholder="Link do ícone"
                style={{ marginBottom: errors.midia ? '5px' : '10px' }}
              />
              {errors.midia && <p className="error">{errors.midia.message}</p>}

              <label htmlFor="sendTo">Enviar para</label>
              <select
                name="sendTo"
                id="sendTo"
                ref={register}
                defaultValue=""
                style={{ marginBottom: errors.to ? '5px' : '10px' }}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="employees">Funcionários</option>
                <option value="customers">Clientes</option>
                <option value="all">Todos</option>
              </select>
              {errors.sendTo && (
                <p className="error">{errors.sendTo.message}</p>
              )}

              <div className="row">
                <button type="submit" className="yes">
                  Enviar
                </button>
                <button className="blue" onClick={closeModal}>
                  Voltar
                </button>
              </div>
            </form>
          </div>
          <div className="modal-window" style={{ marginLeft: '20px' }}>
            <h4>Alguns Ícones</h4>
            <span>(Clique no ícone para copiar o link)</span>
            <div className="icons">
              <div
                className="icon"
                title="Feliz aniversário!"
                onClick={() =>
                  handleCopy(
                    'https://i.ibb.co/18p0Sbw/happy-Birthday-8-512.png'
                  )
                }
              >
                <img
                  src="https://i.ibb.co/18p0Sbw/happy-Birthday-8-512.png"
                  alt="happy-birthday"
                />
              </div>
              <div
                className="icon"
                title="Feriado?!"
                onClick={() => handleCopy('https://i.ibb.co/C0f4ZvJ/image.png')}
              >
                <img src="https://i.ibb.co/C0f4ZvJ/image.png" alt="calendar" />
              </div>
              <div
                className="icon"
                title="Aviso!"
                onClick={() => handleCopy('https://i.ibb.co/7Nt7gCm/image.png')}
              >
                <img src="https://i.ibb.co/7Nt7gCm/image.png" alt="warning" />
              </div>
              <div
                className="icon"
                title="Padrão"
                onClick={() => handleCopy('https://i.ibb.co/wC9146G/image.png')}
              >
                <img
                  src="https://i.ibb.co/wC9146G/image.png"
                  alt="default-bell"
                />
              </div>
              <div
                className="icon"
                title="Dia de festa!"
                onClick={() => handleCopy('https://i.ibb.co/NTdk5B1/image.png')}
              >
                <img src="https://i.ibb.co/NTdk5B1/image.png" alt="party-day" />
              </div>
              <div
                className="icon"
                title="Hoje tem desconto!"
                onClick={() => handleCopy('https://i.ibb.co/YRHk93Y/image.png')}
              >
                <img src="https://i.ibb.co/YRHk93Y/image.png" alt="descount" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Tools;
