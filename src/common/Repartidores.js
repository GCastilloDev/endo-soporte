import service from './Axios.config';

export default {
  async getAll(token) {
    return await service.get(`users_rep/soporte`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
