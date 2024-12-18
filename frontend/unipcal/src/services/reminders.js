import axios from "axios";
const BASE_URL = `http://localhost:10000`;


const handleApiError = (error) => {
  // Função para tratar erros da API e retornar mensagens mais amigáveis
  if (error.response) {
    console.error('Erro na resposta da API:', error.response.data);
    console.error('Status do erro:', error.response.status);
    return { error: `Erro na requisição. Status: ${error.response.status}` };
  } else if (error.request) {
    console.error('Erro na requisição:', error.request);
    return { error: 'Erro na requisição. Nenhuma resposta do servidor.' };
  } else {
    console.error('Erro desconhecido:', error.message);
    return { error: `Erro desconhecido: ${error.message}` };
  }
};


/**
 * Definicao dos servicos de lembrete
 */

export const remindersService = {
  
  deleteReminder: async (id, index) => {
    try{
      const response = await axios.delete(
        `${BASE_URL}/eventos/${id}/${index}`
      );
      return response;
    }catch (error) {
      return handleApiError(error);
    }    
  },

  fetchReminders: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list-reminders`);
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },

  addReminder: async (value, field, day) => {
    try {
      const response = await axios.post(`${BASE_URL}/eventos`, {value, field, day,});
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getAiComment: async (reminders) => {
    try {
      const response = await axios.post(`${BASE_URL}/get-ai-comment`, {reminders,});
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default remindersService;
