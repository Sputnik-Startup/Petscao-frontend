import useSWR from 'swr';
import api from '../services/api';

export default function useAxios(url) {
  const { data, error, mutate, revalidate } = useSWR(url, async (url) => {
    const tk = localStorage.getItem('PC_TOKEN');
    const response = await api({
      method: 'get',
      url,
      headers: { authorization: `Bearer ${tk}` },
    });
    console.log(response);
    return response.data;
  });

  return { data, error, mutate, revalidate };
}
