import axios from "axios";

export const CDN_URL = "http://nbyfbt.hospedagemelastica.com.br";

const cdnService = axios.create({
  baseURL: CDN_URL,
});

export { cdnService };
