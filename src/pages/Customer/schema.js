import * as Yup from 'yup';

export const createSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  cpf: Yup.string().required('CPF obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 carateres')
    .required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .required('É necessário confirmar a senha')
    .oneOf([Yup.ref('password')], 'As senhas não são iguais'),
  age: Yup.number()
    .integer('A idade deve ser um número inteiro')
    .required('Idade obrigatório')
    .typeError('Apenas números'),
  phone: Yup.string().required('Telefone obrigatório'),
  address: Yup.string().required('Endereço obrigatório'),
  city: Yup.string().required('Cidade obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  gender: Yup.string().required('Gênero obrigatório'),
  birth_date: Yup.date()
    .required('Data de nascimento obrigatório')
    .typeError('Data inválida'),
  cep: Yup.string().required('CEP obrigatório'),
});

export const editSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  cpf: Yup.string().required('CPF obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword ? field.required('Senha obrigatória') : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('É necessário confirmar a nova senha')
          .oneOf([Yup.ref('password')], 'As senhas não são iguai')
      : field
  ),
  age: Yup.number()
    .integer('A idade deve ser um número inteiro')
    .required('Idade obrigatório')
    .typeError('Apenas números'),
  phone: Yup.string().required('Telefone obrigatório'),
  address: Yup.string().required('Endereço obrigatório'),
  city: Yup.string().required('Cidade obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  gender: Yup.string().required('Gênero obrigatório'),
  birth_date: Yup.date()
    .required('Data de nascimento obrigatório')
    .typeError('Data inválida'),
  cep: Yup.string().required('CEP obrigatório'),
});
