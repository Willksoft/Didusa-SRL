
import React, { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-dark mb-2">Panel Administrativo</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Ingresa con tus credenciales de Supabase</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <div className="relative">
                <input 
                id="email"
                name="email"
                autoComplete="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                placeholder="admin@didusa.com"
                required
                />
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
                <input 
                id="password"
                name="password"
                autoComplete="current-password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                placeholder="••••••"
                required
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded text-center border border-red-100">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};
