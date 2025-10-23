// src/components/Login.tsx
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">
              Email
            </label>
            <input
              type="string"
              id="email"
              placeholder="Digite seu email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="senha" className="block text-gray-400 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
          >
            Entrar
          </button>
        </form>
        <p className="text-gray-500 text-sm text-center mt-4">
          © 2025 Talys Dev
        </p>
      </div>
    </div>
  );
};

export default Login;
