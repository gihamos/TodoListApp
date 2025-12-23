import { Navigate } from "react-router-dom";

export class ApiService {
  constructor(baseUrl, accessToken) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  async updateAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async post(endpoint, data = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
      Navigate("/signin", { replace: true });
      window.location.reload();
    }

    return retValue;
  }

  async patch(endpoint, data = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");

    }

    return retValue;
  }

  async delete(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const retValue = await response.json();

    if ([401, 403].includes(retValue.statusCode)) {
      this.accessToken = "";
      localStorage.removeItem("token");
    }

    return retValue;
  }

  auth = {
    signUp: async ({first_name,last_name, adresse,
      email, password }) => {
      return await this.post("/auth/sign-up",  ({first_name,last_name, adresse,email, password }));
    },
    signIn: async ({ email, password }) => {
      return await this.post("/auth/sign-in", { email, password });
    },
  };

  user = {
    getUser: async () => {
      return await this.get("/user");
    },
    updateUser: async (data) => {
      return await this.patch("/user", data);
    }
  };

  taskList = {
    create: async ({ label, description, expireAt }) => {
        return await this.post("/tasklist", { label, description, expireAt });
    },
    getAllTaskOfListTask: async (id) => {
        return await this.get(`/tasklist/tasks/${id}`);
    },
     getSync: async (id) => {
     return await this.get(`/tasklist/sync/${id}`);
    },
    getClose: async (id) => {
     return await this.get(`/tasklist/close/${id}`);
   },
    getAllTaskList: async () => {
        return await this.get(`/tasklist`);
    },
    update: async (id,data ) => {
      const { label,  description, expireAt,closed}=data;
      console.log(data);
        return await this.patch(`/tasklist/${id}`, { label:label, closed, description:description, expireAt:expireAt});
    },
    delete: async (id) => {
        return await this.delete(`/tasklist/${id}`);
    }
  };
  task={
     create: async ({list_id, label }) => {
       return await this.post("/task", {list_id, label });
    },
     checked: async ({ id,value,list_id }) => {
      const data=await this.post(`/task/checked/${id}/${value?1:0}`,{id:list_id});
      return data;
     },

      drop: async ({ id,list_id }) => {
         const data=await this.post(`/task/drop/${id}`,{id:list_id});
           return data;
         }


  };

}
