import * as Yup from 'yup';

export const schema = Yup.object().shape({
  descount: Yup.string().required('Por favor, preencha este campo.'),
  price: Yup.string().required('Por favor, preencha este campo.'),
  total_price: Yup.string().required('Por favor, preencha este campo.'),
});
