import axios from "axios";

export const CDN_URL = "http://cdn.imobiliaria7setembro.com.br/";

const cdnService = axios.create({
  baseURL: CDN_URL,
});

export { cdnService };
