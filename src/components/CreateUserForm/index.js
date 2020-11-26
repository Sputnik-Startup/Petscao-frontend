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
  method,
  onCloseModal,
  setThumbnail,
  thumbnail,
  customer,
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

        clearErrors('cep');
        setValue('state', stateName);
        setValue('city', response.data.localidade);
        setValue('neighborhood', response.data.bairro);
        setValue('address', response.data.logradouro);
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
    console.log(phone[phone.length - 1]);

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
                backgroundImage: `url(${customer?.avatar?.url || preview})`,
                backgroundPosition: 'center',
                objectFit: 'cover',
              }}
              className={thumbnail ? 'has-thumbnail' : ''}
            >
              <input
                type="file"
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
                style={{ marginBottom: errors.username ? '5px' : '10px' }}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </>
          ) : (
            <>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                ref={register}
                defaultValue={customer?.email}
                style={{ marginBottom: errors.email ? '5px' : '10px' }}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </>
          )}

          <label htmlFor="cpf">CPF</label>
          <input
            name="cpf"
            ref={register}
            onKeyPress={handleKeypressCpf}
            maxLength={14}
            defaultValue={customer?.cpf}
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
            style={{ marginBottom: errors.age ? '5px' : '10px' }}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>
        <div className="column">
          {hasCustomer && (
            <>
              <label htmlFor="password">Senha antiga</label>
              <CustomInput
                name="oldPassword"
                register={register}
                style={{ marginBottom: errors.oldPassword ? '5px' : '10px' }}
              />
              {errors.oldPassword && (
                <p className="error">{errors.oldPassword.message}</p>
              )}
            </>
          )}

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
                <option value="male">administrador</option>
                <option value="female">padrão</option>
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
            style={{ marginBottom: errors.confirmPassword ? '5px' : '10px' }}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <label htmlFor="phone">Telefone</label>
          <input
            name="phone"
            ref={register}
            onKeyPress={handleKeypressPhone}
            maxLength={15}
            defaultValue={customer?.phone}
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
            style={{ marginBottom: errors.cep ? '5px' : '10px' }}
          />
          {errors.cep && <p className="error">{errors.cep.message}</p>}

          <label htmlFor="state">Estado</label>
          <input
            name="state"
            ref={register}
            defaultValue={customer?.state}
            style={{ marginBottom: errors.state ? '5px' : '10px' }}
          />
          {errors.state && <p className="error">{errors.state.message}</p>}

          <label htmlFor="city">Cidade</label>
          <input
            name="city"
            ref={register}
            defaultValue={customer?.city}
            style={{ marginBottom: errors.city ? '5px' : '10px' }}
          />
          {errors.city && <p className="error">{errors.city.message}</p>}

          <label htmlFor="neighborhood">Bairro</label>
          <input
            name="neighborhood"
            ref={register}
            defaultValue={customer?.neighborhood}
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
            style={{ marginBottom: errors.address ? '5px' : '10px' }}
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>
      </div>

      <div className="row" style={{ padding: '0 20px' }}>
        <button type="submit" className="yes">
          Criar
        </button>
        <button className="blue" onClick={onCloseModal}>
          Voltar
        </button>
      </div>
    </Container>
  );
}

export default CreateUserForm;
