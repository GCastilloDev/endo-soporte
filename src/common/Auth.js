import service from './Axios.config';

export default {
  async login(user) {
    return await service.post(`login/soporte`, user);
  },
};
