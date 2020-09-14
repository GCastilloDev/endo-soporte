import axios from 'axios';

let baseURL = 'https://back.endomorelia.app/api/';

if (location.host != 'soporte.endomorelia.app')
  baseURL = 'https://endoback.prbs.li/api/';

export default axios.create({
  baseURL,
});
