import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './styles';
import CustomInput from '../CustomInput';

import camera from '../../assets/camera.svg';
import Axios from 'axios';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';

const ufToName = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

function CreateUserForm({
  schema,
  context,
  onSubmit,
  onCloseModal,
  setThumbnail,
  thumbnail,
  value: customer,
}) {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const hasCustomer = !!customer?.id;

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleChangeCep = (e) => {
    const cep = getValues('cep');

    if (e.which >= 48 && e.which <= 57) {
      if (cep.length === 5) {
        setValue('cep', cep + '-');
      }
    } else {
      e.preventDefault();
    }
  };

  const handleKeyUpCep = async () => {
    const cep = getValues('cep');

    if (cep.length === 9) {
      try {
        const cepWithoutHiphen = cep.replace('-', '');
        const response = await Axios({
          method: 'get',
          url: `https://viacep.com.br/ws/${cepWithoutHiphen}/json/`,
        });

        const stateName = ufToName[response.data.uf];

        if (response.data.erro) {
          setError('cep', {
            type: 'manual',
            message: 'Cep inválido',
          });
          return;
        }

        setValue('state', stateName);
        setValue('city', response.data.localidade);
        setValue('neighborhood', response.data.bairro);
        setValue('address', response.data.logradouro);
        clearErrors('cep');
        clearErrors('state');
        clearErrors('city');
        clearErrors('neighborhood');
        clearErrors('address');
      } catch (error) {}
    }
  };

  const handleKeypressCpf = (e) => {
    const cpf = getValues('cpf');

    if (e.which >= 48 && e.which <= 57) {
      if (cpf.length === 3) {
        setValue('cpf', cpf + '.');
      } else if (cpf.length === 7) {
        setValue('cpf', cpf + '.');
      } else if (cpf.length === 11) {
        setValue('cpf', cpf + '-');
      }
    } else {
      e.preventDefault();
    }
  };

  const handleKeypressPhone = (e) => {
    const phone = getValues('phone');

    if (e.which >= 48 && e.which <= 57) {
      if (phone.length === 4 && phone[phone.length - 1] !== ' ') {
        setValue('phone', phone + ' ');
      }
      if (phone.length === 0) {
        setValue('phone', '(' + phone);
      } else if (phone.length === 3) {
        setValue('phone', phone + ') ');
      } else if (phone.length === 10) {
        setValue('phone', phone + '-');
      }
    } else {
      e.preventDefault();
    }
  };

  const handleStateChange = () => {
    const state = getValues('state');

    if (state.length === 2) {
      const stateName = ufToName[state];

      if (stateName) setValue('state', stateName);
    }
  };

  const handlePhoneChange = () => {
    const phone = getValues('phone');

    if (phone.length === 11 && phone[0] !== '(') {
      let newPhoneString;

      newPhoneString =
        '(' +
        phone.substring(0, 2) +
        ') ' +
        phone.substring(2, 7) +
        '-' +
        phone.substring(7, 11);

      setValue('phone', newPhoneString);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="column">
          <div
            className="center"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <label htmlFor="">Selecione a foto de perfil</label>
            <label
              id="thumbnail"
              style={{
                backgroundImage: `url(${preview || customer?.avatar?.url})`,
                backgroundPosition: 'center',
                objectFit: 'cover',
                width: hasCustomer ? '40%' : '',
              }}
              className={thumbnail ? 'has-thumbnail' : ''}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setThumbnail(event.target.files[0])}
              />
              <img src={camera} alt="Select img" />
            </label>
          </div>
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            ref={register}
            defaultValue={customer?.name}
            placeholder="Roberto Carlos"
            style={{ marginBottom: errors.name ? '5px' : '10px' }}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          {context === 'employee' ? (
            <>
              <label htmlFor="username">Nome de usuário</label>
              <input
                name="username"
                ref={register}
                defaultValue={customer?.username}
                placeholder="roberto.carlos"
                style={{ marginBottom: errors.username ? '5px' : '10px' }}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </>
          ) : !hasCustomer ? (
            <>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                ref={register}
                defaultValue={customer?.email}
                placeholder="rc.2020@domínio.com"
                style={{ marginBottom: errors.email ? '5px' : '10px' }}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </>
          ) : null}

          <label htmlFor="cpf">CPF</label>
          <input
            name="cpf"
            ref={register}
            onKeyPress={handleKeypressCpf}
            maxLength={14}
            defaultValue={customer?.cpf}
            placeholder="000.000.000-00"
            style={{ marginBottom: errors.cpf ? '5px' : '10px' }}
          />
          {errors.cpf && <p className="error">{errors.cpf.message}</p>}

          <label htmlFor="age">Idade</label>
          <input
            type="number"
            min="0"
            name="age"
            ref={register}
            defaultValue={customer?.age}
            placeholder="34"
            style={{ marginBottom: errors.age ? '5px' : '10px' }}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>
        <div className="column">
          {context === 'employee' && (
            <>
              <label htmlFor="access">Nível de acesso</label>
              <select
                name="access"
                ref={register}
                defaultValue={customer?.access || ''}
                style={{ marginBottom: errors.access ? '5px' : '10px' }}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="adm">administrador</option>
                <option value="default">padrão</option>
              </select>
              {errors.access && (
                <p className="error">{errors.access.message}</p>
              )}
            </>
          )}

          <label htmlFor="password">
            {hasCustomer ? 'Nova Senha' : 'Senha'}
          </label>
          <CustomInput
            register={register}
            placeholder="Escolha uma ótima senha"
            style={{ marginBottom: errors.password ? '5px' : '10px' }}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <label htmlFor="confirmPassowrd">
            {hasCustomer ? 'Confirmar nova Senha' : 'Confirmar senha'}
          </label>
          <CustomInput
            name="confirmPassword"
            register={register}
            placeholder="Confirme a senha"
            style={{ marginBottom: errors.confirmPassword ? '5px' : '10px' }}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <label htmlFor="phone">Telefone</label>
          <input
            name="phone"
            ref={register({ pattern: /(\(\d{2}\)\s)(\d{4,5}-\d{4})/g })}
            onKeyPress={handleKeypressPhone}
            onChange={handlePhoneChange}
            maxLength={15}
            defaultValue={customer?.phone}
            placeholder="(00) 00000-0000"
            style={{ marginBottom: errors.phone ? '5px' : '10px' }}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}

          <label htmlFor="birth_date">Data de nascimento</label>
          <input
            type="date"
            name="birth_date"
            ref={register}
            defaultValue={
              customer?.birth_date
                ? format(parseISO(customer?.birth_date), 'yyyy-MM-dd', {
                    locale: ptBR,
                  })
                : ''
            }
            min="1997-01-01"
            style={{ marginBottom: errors.birth_date ? '5px' : '10px' }}
          />
          {errors.birth_date && (
            <p className="error">{errors.birth_date.message}</p>
          )}
          <label htmlFor="gender">Gênero</label>
          <select
            name="gender"
            ref={register}
            defaultValue={customer?.gender || ''}
            style={{ marginBottom: errors.gender ? '5px' : '10px' }}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>
        <div className="column">
          <label htmlFor="cep">CEP</label>
          <input
            name="cep"
            ref={register}
            maxLength={9}
            onKeyPress={handleChangeCep}
            onKeyUp={handleKeyUpCep}
            defaultValue={customer?.cep}
            placeholder="00000-000"
            style={{ marginBottom: errors.cep ? '5px' : '10px' }}
          />
          {errors.cep && <p className="error">{errors.cep.message}</p>}

          <label htmlFor="state">Estado</label>
          <input
            name="state"
            ref={register}
            defaultValue={customer?.state}
            onChange={handleStateChange}
            placeholder="Minas Gerais"
            style={{ marginBottom: errors.state ? '5px' : '10px' }}
          />
          {errors.state && <p className="error">{errors.state.message}</p>}

          <label htmlFor="city">Cidade</label>
          <input
            name="city"
            ref={register}
            defaultValue={customer?.city}
            placeholder="Belo Horizonte"
            style={{ marginBottom: errors.city ? '5px' : '10px' }}
          />
          {errors.city && <p className="error">{errors.city.message}</p>}

          <label htmlFor="neighborhood">Bairro</label>
          <input
            name="neighborhood"
            ref={register}
            defaultValue={customer?.neighborhood}
            placeholder="Santa Mônica"
            style={{ marginBottom: errors.neighborhood ? '5px' : '10px' }}
          />
          {errors.neighborhood && (
            <p className="error">{errors.neighborhood.message}</p>
          )}

          <label htmlFor="address">Endereço</label>
          <input
            name="address"
            ref={register}
            defaultValue={customer?.address}
            placeholder="Rua Nome Qualquer, 235"
            style={{ marginBottom: errors.address ? '5px' : '10px' }}
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>
      </div>

      <div className="row" style={{ padding: '0 20px', margin: '0' }}>
        <button type="submit" className="yes">
          {hasCustomer ? 'Editar' : 'Criar'}
        </button>
        <button className="blue" onClick={onCloseModal}>
          Voltar
        </button>
      </div>
    </Container>
  );
}

export default CreateUserForm;
