import api from './api';

export const dashboardService = {
  /**
   * Fetch overview summary stats
   */
  async getStats() {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  /**
   * Fetch department distribution breakdown
   */
  async getDepartmentDistribution() {
    const response = await api.get('/dashboard/department-distribution');
    return response.data;
  },

  /**
   * Fetch monthly employee joining trends
   */
  async getJoiningTrends() {
    const response = await api.get('/dashboard/joining-trends');
    return response.data;
  },

  /**
   * Fetch latest 5 employees
   */
  async getRecentEmployees() {
    const response = await api.get('/dashboard/recent-employees');
    return response.data;
  }
};
