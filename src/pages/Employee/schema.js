import * as Yup from 'yup';
import { isValidCPF } from '../../utils/isValidCPF';

export const createSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  username: Yup.string().required('Nome de usuário obrigatório'),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .matches(
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      'A formatação está incorreta. Digite o CPF novamente.'
    )
    .test('validate-cpf', 'CPF inválido', isValidCPF),
  password: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 carateres')
    .required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .required('É necessário confirmar a senha')
    .oneOf([Yup.ref('password')], 'As senhas não são iguais'),
  age: Yup.number()
    .integer('A idade deve ser um número inteiro')
    .required('Idade obrigatório')
    .typeError('Informe a idade'),
  phone: Yup.string()
    .required('Telefone obrigatório')
    .matches(
      /(\(\d{2}\)\s)(\d{5}-\d{4})/g,
      'A formatação está incorreta. Digite o telefone novamente.'
    ),
  address: Yup.string().required('Endereço obrigatório'),
  city: Yup.string().required('Cidade obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  gender: Yup.string().required('Gênero obrigatório'),
  birth_date: Yup.date()
    .required('Data de nascimento obrigatório')
    .typeError('Data inválida'),
  cep: Yup.string()
    .required('CEP obrigatório')
    .matches(
      /^\d{5}-\d{3}/g,
      'A formatação está incorreta. Digite o CEP novamente.'
    ),
  access: Yup.string().required('Nível de acesso obrigatório'),
});

export const editSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  username: Yup.string().required('Nome de usuário obrigatório'),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      'A formatação está incorreta. Digite o CPF novamente.'
    )
    .test('validate-cpf', 'CPF inválido', isValidCPF),

  password: Yup.string().test(
    'empty-check',
    'Senha deve ter no mínimo 8 caracteres',
    (password) => password.length >= 8 || password.length === 0
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('É necessário confirmar a nova senha')
          .oneOf([Yup.ref('password')], 'As senhas não são iguais')
      : field
  ),
  age: Yup.number()
    .integer('A idade deve ser um número inteiro')
    .required('Idade obrigatório')
    .typeError('Informe a idade'),
  phone: Yup.string()
    .required('Telefone obrigatório')
    .matches(
      /(\(\d{2}\)\s)(\d{5}-\d{4})/g,
      'A formatação está incorreta. Digite o telefone novamente.'
    ),
  address: Yup.string().required('Endereço obrigatório'),
  city: Yup.string().required('Cidade obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  gender: Yup.string().required('Gênero obrigatório'),
  birth_date: Yup.date()
    .required('Data de nascimento obrigatório')
    .typeError('Data inválida'),
  cep: Yup.string()
    .required('CEP obrigatório')
    .matches(
      /^\d{5}-\d{3}/g,
      'A formatação está incorreta. Digite o CEP novamente.'
    ),
  access: Yup.string().required('Nível de acesso obrigatório'),
});
