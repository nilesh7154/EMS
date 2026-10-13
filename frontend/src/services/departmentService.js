import api from './api';

export const departmentService = {
  /**
   * Fetch all departments with employee counts
   */
  async getAllDepartments() {
    const response = await api.get('/departments');
    return response.data;
  },

  /**
   * Fetch department by ID
   */
  async getDepartmentById(id) {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  /**
   * Create department
   */
  async createDepartment(data) {
    const response = await api.post('/departments', data);
    return response.data;
  },

  /**
   * Update department
   */
  async updateDepartment(id, data) {
    const response = await api.put(`/departments/${id}`, data);
    return response.data;
  },

  /**
   * Delete department
   */
  async deleteDepartment(id) {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  }
};
