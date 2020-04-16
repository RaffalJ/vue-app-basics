import { instance as axios } from './axios-instance';

const urls = {
  rooms: '/rooms',
};

export default {
  fetchRooms: () => axios.get(urls.rooms),
};
