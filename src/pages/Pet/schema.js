import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  type: Yup.string().required('Tipo obrigatório'),
  sex: Yup.string().required('Sexo obrigatório'),
  breed: Yup.string().required('Raça obrigatória'),
});
