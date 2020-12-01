import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('Título obrigatório'),
  content: Yup.string().required('Conteúdo obrigatório'),
  sendTo: Yup.string().required('Selecione quem desejas notificar'),
  midia: Yup.string(),
});
