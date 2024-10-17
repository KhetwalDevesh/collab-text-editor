import { CONFIG } from "@/config";
import axios from "axios";

export const axiosBridged = axios.create({
  baseURL: CONFIG?.baseApiUrl,
});
