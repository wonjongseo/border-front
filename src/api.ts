import { ILoginInfo } from "./screen/Login";
import axios from "axios";
import { IJoinInfo } from "./screen/Join";
export const BASE_URL = "http://localhost:8080";
// export const BASE_URL = "";

export const postUserInfo = async (info: IJoinInfo): Promise<any> => {
  const url = BASE_URL + "/join";

  try {
    return axios.post(url, info, { withCredentials: true });
  } catch (error) {
    return error;
  }
};

export const postUserLogin = async (info: ILoginInfo): Promise<any> => {
  const url = BASE_URL + "/login";
  try {
    return axios.post(url, info, { withCredentials: true });
  } catch (error) {
    return error;
  }
};

// Post Border
export const postBorder = async (info: any): Promise<any> => {
  const url = BASE_URL + "/borders";

  try {
    const response = await axios.post(url, info, { withCredentials: true });

    return response.data;
  } catch (e) {
    console.log("accur error");

    console.log(e);
    return e;
  }
};

// Delete Border
export const deleteBorder = async (id: number) => {
  console.log(id);
  const url = BASE_URL + "/borders";

  try {
    const response = await axios.delete(url, { params: { id } });
  } catch (e) {
    console.log(e);
  }
};

export const getAllBorders = async (path: string) => {
  const url = BASE_URL + "/borders/" + path;
  console.log(url);

  try {
    const response = await axios.get(url, { withCredentials: true });
    console.log(response);

    return response.data;
  } catch (e) {
    console.log("accur error");

    console.log(e);
    return e;
  }
};
