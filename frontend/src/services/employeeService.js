import api from './api';

export const employeeService = {
  /**
   * Fetch paginated and filtered list of employees
   */
  async getEmployees({ page = 0, size = 10, sortBy = 'joiningDate', direction = 'desc', search = '', departmentId = '', status = '' } = {}) {
    const params = { page, size, sortBy, direction };
    if (search && search.trim()) params.search = search.trim();
    if (departmentId) params.departmentId = departmentId;
    if (status) params.status = status;

    const response = await api.get('/employees', { params });
    return response.data;
  },

  /**
   * Fetch single employee by ID
   */
  async getEmployeeById(id) {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  /**
   * Create new employee
   */
  async createEmployee(employeeData) {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  /**
   * Update existing employee
   */
  async updateEmployee(id, employeeData) {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  /**
   * Delete employee by ID
   */
  async deleteEmployee(id) {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  }
};
