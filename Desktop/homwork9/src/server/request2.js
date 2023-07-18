import axios from "axios";

import {ENDPOINTSTUDEN} from "../const/products"

export const request2 = axios.create({
  baseURL: ENDPOINTSTUDEN,
  timeout: 10000,
});
