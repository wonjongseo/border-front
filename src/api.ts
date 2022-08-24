import { ICreateBorder } from "./screen/CreateBorder";
import { ILoginInfo } from "./screen/Login";
import axios from "axios";
import { IJoinInfo } from "./screen/Join";
export const BASE_URL = "http://localhost:8080";
// export const BASE_URL = "https://border-site.herokuapp.com";

export const postUserInfo = async (info: IJoinInfo): Promise<any> => {
  const url = BASE_URL + "/join";

  try {
    const res = await axios.post(url, info, { withCredentials: true });
    return res;
  } catch (error) {
    // console.log(error);

    throw error;
  }
};

export const postUserLogin = async (info: ILoginInfo): Promise<any> => {
  const url = BASE_URL + "/login";
  try {
    const res = await axios.post(url, info, { withCredentials: true });
    return res;
  } catch (error) {
    return error;
  }
};

// Post Border
export const postBorder = async (data: ICreateBorder): Promise<any> => {
  const url = BASE_URL + "/borders";

  try {
    const response = await axios.post(url, data, { withCredentials: true });
    console.log("post");

    console.log(response);
    return response.data;
  } catch (e) {
    console.log("accur error");

    console.log(e);
    return e;
  }
};

export const getBordersByKeyword = async (keyword: string) => {
  const url = BASE_URL + "/borders/search";
  console.log(url);

  try {
    const response = await axios.get(url, { params: { keyword: keyword } });
    console.log(response);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// Delete Border
export const deleteBorder = async (id: number) => {
  console.log(id);
  const url = BASE_URL + "/borders";

  try {
    const response = await axios.delete(url, {
      params: { id },
      withCredentials: true,
    });
    console.log("deleted");

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const updateBorder = async (data: ICreateBorder, id: number) => {
  const url = BASE_URL + "/borders";
  console.log("updated");

  try {
    const response = await axios.put(url, data, {
      params: { id },
      withCredentials: true,
    });

    console.log(response);

    return response.data;
  } catch (e) {}
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
