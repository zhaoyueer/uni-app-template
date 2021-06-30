import request from '@/utils/request';
import Config from '@/config';

export const fetchData = (params: { id: string }) => {
  return request<{ id: string; name: string }>(
    {
      url: `${Config.API}/getInfo`,
      data: params,
    },
    {
      useHeaderAuth: true,
    },
  );
};
