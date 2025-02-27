// import axios from "axios";
import axios from "axios";
import http from "./http";
//----------------------------------

export const login = async (payload: any) => {
  const { data } = await http.post(`/auth/login`, payload);

  return data;
};
export const getWidgetSettings = async (user: any) => {
  // console.log("user : ", user);
  if (!user) {
    return;
  }
  const { data } = await http.get(`/settings/script/${user._id}`);
  console.log("gettingdata", data);
  // console.log("🚀 ~ file: index.ts:16 ~ getWidgetSettings ~ data:", data);
  return data;
};

export const getMySelf = async () => {
  const { data } = await http.get(`/user/myself`);
  console.log("gettingdata", data);

  return data;
};

export const getWidgetSettingsById = async (id: string) => {
  console.log("id", id);
  const { data } = await http.get(`/settings/script/${id}`);
  return data;
};
export const updateWidgetSettings = async ({ domain, ...payload }: any) => {
  // if (!user || !user._id) {
  //   throw new Error("User ID is required to update widget settings");
  // }
  console.log("payload", payload);
  console.log("domain", domain);

  const { data } = await http.put(
    `/settings/script/${payload.domainId._id}`,
    payload
  );
  return data;
};

export const createContactFormSettings = async (payload: any) => {
  const { data } = await http.post(`/contactformsetting`, payload);
  return data;
};

export const updateContactFormSettings = async (payload: any) => {
  const { data } = await http.put(
    `/contactformsetting/${payload._id}`,
    payload
  );
  return data;
};

export const getContacts = async (id: string, page: string) => {
  const { data } = await http.get(`/contactform/${id}?page=${page}`);
  return data;
};
export const getWidgetData = async (token: string) => {
  const { data } = await http.get(`/agents/myself`);
  return data;
};
export const saveWidgetSettings = async ({ widget_type, ...payload }: any) => {
  const { data } = await http.post(`/settings/${widget_type}`, payload);
  // console.log("payload, data", payload, data);
  return data;
};

export const changeScriptStatus = async ({
  id,
  widgetType,
  disable,
  settingsId,
}: any) => {
  const data = await http.put(
    `/settings/wix/change-script-status/${id}/${settingsId}/${widgetType}`,
    { disable }
  );
  // console.log("response : ", data);
  return data;
};
export const getUsers = async () => {
  const { data } = await http.get('/user');
  return data;
};

// Create new user
export const createUser = async (payload: {
  email: string;
  password: string;
  role: "admin" | "user";
}) => {
  const { data } = await http.post('/user', payload);
  return data;
};

// Update user
export const updateUser = async (id: string, payload: {
  email: string;
  password?: string;
  role: "admin" | "user";
}) => {
  const { data } = await http.put(`/user/${id}`, payload);
  return data;
};

// Delete user
export const deleteUser = async (id: string) => {
  const { data } = await http.delete(`/user/${id}`);
  return data;
};


// export const renameEmail = async ({ widget_type, email, token }: any) => {
//   console.log("🚀 ~ renameEmail ~ widget_type:", widget_type);
//   const data = await axios.put(
//     `${process.env.BASE_URL}/api/agents/renameEmail/${widget_type}`,
//     { email },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return data;
// };
