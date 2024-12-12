import axios from "axios";

export const remindersService = {
  deleteReminder: async (id, index) => {
    const response = await axios.delete(
      `http://localhost:10000/eventos/${id}/${index}`
    );
    return response;
  },
  fetchReminders: async () => {
    const response = await axios.get(`http://localhost:10000/list-reminders`);
    return response;
  },
  addReminder: async (value, field, day) => {
    const response = await axios.post(`http://localhost:10000/eventos`, {
      value,
      field,
      day,
    });
    return response;
  },
  getAiComment: async (reminders) => {
    const response = await axios.post(`http://localhost:10000/get-ai-comment`, {
      reminders,
    });
    return response;
  },
};

export default remindersService;
