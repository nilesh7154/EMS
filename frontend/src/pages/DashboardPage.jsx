import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../services/dashboardService';
import { getErrorMessage } from '../services/api';
import StatCard from '../components/dashboard/StatCard';
import DepartmentDistributionChart from '../components/dashboard/DepartmentDistributionChart';
import JoiningTrendsChart from '../components/dashboard/JoiningTrendsChart';
import RecentEmployeesList from '../components/dashboard/RecentEmployeesList';
import Button from '../components/common/Button';
import ErrorState from '../components/common/ErrorState';
import { Users, UserCheck, Building2, UserPlus, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departmentsCount: 0,
    recentlyJoinedEmployees: 0
  });
  const [distribution, setDistribution] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, distData, trendData, recentData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getDepartmentDistribution(),
        dashboardService.getJoiningTrends(),
        dashboardService.getRecentEmployees()
      ]);

      setStats(statsData);
      setDistribution(distData);
      setTrends(trendData);
      setRecentEmployees(recentData);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error('Failed to load dashboard metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (error && !stats.totalEmployees) {
    return (
      <ErrorState
        title="Dashboard Unavailable"
        message={error}
        onRetry={fetchDashboardData}
        isRetrying={isLoading}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Actions Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-xs border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PeopleDesk Workforce Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, Administrator
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time workforce metrics, departmental distribution, and talent acquisition analytics connected to PostgreSQL.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="primary"
              icon={UserPlus}
              onClick={() => navigate('/employees/new')}
              className="bg-indigo-500 hover:bg-indigo-600 shadow-md"
            >
              Add Employee
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/employees')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              View Directory
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/departments')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Manage Departments
            </Button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Workforce"
          value={stats.totalEmployees}
          subtext="Registered personnel in system"
          icon={Users}
          colorScheme="indigo"
          isLoading={isLoading}
        />
        <StatCard
          title="Active Employees"
          value={stats.activeEmployees}
          subtext={`${stats.totalEmployees > 0 ? Math.round((stats.activeEmployees / stats.totalEmployees) * 100) : 0}% active engagement rate`}
          icon={UserCheck}
          colorScheme="emerald"
          isLoading={isLoading}
        />
        <StatCard
          title="Departments"
          value={stats.departmentsCount}
          subtext="Operational business divisions"
          icon={Building2}
          colorScheme="blue"
          isLoading={isLoading}
        />
        <StatCard
          title="Recent Onboardings"
          value={stats.recentlyJoinedEmployees}
          subtext="Joined in last 90 days"
          icon={UserPlus}
          colorScheme="amber"
          isLoading={isLoading}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JoiningTrendsChart data={trends} isLoading={isLoading} />
        <DepartmentDistributionChart data={distribution} isLoading={isLoading} />
      </div>

      {/* Recent Employees Table */}
      <RecentEmployeesList employees={recentEmployees} isLoading={isLoading} />
    </div>
  );
}
