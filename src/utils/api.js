import axios from 'axios';
import apiClient from './apiClient';

const API_URL = import.meta.env.VITE_APP_API_URL;

// Create an Axios instance with global configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userSignup = async (userData) => {
  try {
    const response = await api.post(`/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const userLogin = async (userData) => {
  try {
    const response = await api.post(`/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};




// ------------------------------PROJECT APIS-------------------------------------------
export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post(`/projects`, projectData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const fetchProject = async (projectData) => {
  try {
    const response = await apiClient.get(`/projects`, projectData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ------------------------------------------LIST APIS-------------------------------------
export const createList = async (formData) => {
  try {
    const response = await apiClient.post('/list', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in API call:", error.response?.data || error.message);
    throw error;
  }
};

export const getList = async () => {
  try {
    const response = await apiClient.get(`/list`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const getListById = async (id) => {
  try {
    const response = await apiClient.get(`/list/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteList = async (listId) => {
  try {
    const response = await apiClient.delete(`/list/${listId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ------------------------ Mapping API-----------------------------------


export const createMapping = async (formData) => {
  try {
    const response = await apiClient.post('/mapping', formData);
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error.response?.data || error.message);
    throw error;
  }
};







// -----------------------------Template API----------------------------

export const createTemplate = async (listData) => {
  try {
    const response = await apiClient.post(`/mails`,listData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getTemplate = async () => {
  try {
    const response = await apiClient.get(`/mails`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const getTemplateById = async (id) => {
  try {
    const response = await apiClient.get(`/mails/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ----------------------------------Create WAIT APIS---------------------------


export const createWait = async (WaitData) => {
  try {
    const response = await apiClient.post(`/wait`,WaitData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getWaitById = async (id) => {
  try {
    const response = await apiClient.get(`/wait/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// -----------------------------SAVE SEQUENCE----------------------------

export const saveSequence = async (id ,sequenceData) => {
  try {
    const response = await apiClient.put(`/sequence/${id}`,sequenceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getProjectById = async (id ) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const startProject = async (id ) => {
  try {
    const response = await apiClient.post(`/project/start/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};