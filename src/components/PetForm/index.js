import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import camera from '../../assets/camera.svg';

import { Container } from '../CreateUserForm/styles';
import CustomerPicker from '../CustomerPicker';

function PetForm({
  schema,
  thumbnail,
  setThumbnail,
  value: pet,
  onCloseModal,
  onSubmit,
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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [noClientError, setNoClientError] = useState(false);

  const hasPet = !!pet?.id;

  const preview = useMemo(
    () => (thumbnail ? URL.createObjectURL(thumbnail) : null),
    [thumbnail]
  );

  const dataTransfer = (data) => {
    if (!selectedCustomer && !hasPet) {
      setNoClientError(true);
      return;
    }
    return !hasPet
      ? onSubmit({ ...data, owner_id: selectedCustomer.id })
      : onSubmit(data);
  };

  const handleSelectCustomer = (customer) => {
    setNoClientError(false);
    setSelectedCustomer(customer);
  };

  return (
    <Container onSubmit={handleSubmit(dataTransfer)}>
      <div
        className="center"
        style={{
          width: '100%',
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <label>Selecione a foto do pet</label>
        <label
          id="thumbnail"
          style={{
            backgroundImage: `url(${preview || pet?.avatar?.url})`,
            backgroundPosition: 'center',
            objectFit: 'cover',
            width: hasPet ? '40%' : '',
            height: '100%',
          }}
          className={thumbnail || pet?.avatar?.url ? 'has-thumbnail' : ''}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setThumbnail(event.target.files[0])}
          />
          <img src={camera} alt="Select img" />
        </label>
      </div>
      {hasPet ? (
        ''
      ) : (
        <>
          <label>Selecione o dono</label>
          <CustomerPicker
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={handleSelectCustomer}
            style={{
              height: '40px',
              marginBottom: '10px',
            }}
            buttonStyle={{
              boxShadow: '0 0 10px 3px #0000000d',
              height: '100%',
            }}
          />
          {noClientError && <p className="error">Selecione um cliente</p>}
        </>
      )}
      <label htmlFor="name">Nome do Pet</label>
      <input
        name="name"
        ref={register}
        defaultValue={pet?.name}
        placeholder="Teddy"
        style={{ marginBottom: errors.name ? '5px' : '10px' }}
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label htmlFor="type">Tipo</label>
      <input
        name="type"
        ref={register}
        placeholder="Cachorro, gato..."
        defaultValue={pet?.type}
        style={{ marginBottom: errors.type ? '5px' : '10px' }}
      />
      {errors.type && <p className="error">{errors.type.message}</p>}

      <label htmlFor="breed">Raça</label>
      <input
        name="breed"
        ref={register}
        defaultValue={pet?.breed?.toLowerCase()}
        placeholder="Pastor alemão"
        style={{ marginBottom: errors.breed ? '5px' : '10px' }}
      />
      {errors.breed && <p className="error">{errors.breed.message}</p>}

      <label htmlFor="sex">Sexo</label>
      <select
        name="sex"
        ref={register}
        defaultValue={pet?.sex || ''}
        style={{ marginBottom: errors.sex ? '5px' : '10px' }}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        <option value="male">Macho</option>
        <option value="female">Fêmea</option>
      </select>
      {errors.sex && <p className="error">{errors.sex.message}</p>}

      <div className="row">
        <button type="submit" className="yes" style={{ maxWidth: '100%' }}>
          {hasPet ? 'Editar' : 'Adicionar'}
        </button>
        <button
          className="blue"
          onClick={onCloseModal}
          style={{ maxWidth: '100%' }}
        >
          Voltar
        </button>
      </div>
    </Container>
  );
}

export default PetForm;
