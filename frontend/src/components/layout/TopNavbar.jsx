import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';

export default function TopNavbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Determine current page title & breadcrumbs based on pathname
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/') return { title: 'Dashboard', crumb: 'Overview' };
    if (path === '/employees') return { title: 'Employees', crumb: 'Directory' };
    if (path === '/employees/new') return { title: 'Add Employee', crumb: 'Employees / New' };
    if (path.startsWith('/employees/') && path.endsWith('/edit')) return { title: 'Edit Employee', crumb: 'Employees / Edit' };
    if (path === '/departments') return { title: 'Departments', crumb: 'Organization' };
    if (path === '/settings') return { title: 'Settings', crumb: 'System' };
    return { title: 'PeopleDesk', crumb: 'Home' };
  };

  const { title, crumb } = getPageInfo();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/employees?search=${encodeURIComponent(globalSearch.trim())}`);
      setGlobalSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Left: Mobile hamburger & Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Link to="/" className="hover:text-indigo-600 transition-colors">PeopleDesk</Link>
            <span>/</span>
            <span className="text-slate-600">{crumb}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Controls: Search bar, Notification, User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Search shortcut (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search employees or ID..."
            className="w-56 lg:w-64 pl-9 pr-3 py-1.5 text-xs rounded-full bg-slate-100 text-slate-800 placeholder-slate-400 border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </form>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white animate-pulse" />
          </button>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-xs shadow-xs">
              AD
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-none">
                Admin User
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-none mt-1">
                HR Director
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 z-40 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">Admin User</p>
                  <p className="text-[11px] text-slate-500 truncate">admin@peopledesk.io</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                    <span>System Settings</span>
                  </Link>
                  <div className="flex items-center gap-2 px-3.5 py-2 text-slate-400 cursor-not-allowed">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Role: SuperAdmin</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
