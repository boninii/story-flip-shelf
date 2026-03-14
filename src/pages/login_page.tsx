import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { BookOpen, Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/auth_context";

const LoginPage: React.FC = () => {
  const [email, set_email] = useState("");

  const [password, set_password] = useState("");

  const [is_loading, set_is_loading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();

    set_is_loading(true);

    const success = await login(email, password);

    set_is_loading(false);

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-primary" />

          <h1 className="mt-4 font-display text-3xl font-bold text-foreground">
            Bem-vindo de volta
          </h1>

          <p className="mt-2 text-muted-foreground">
            Entre para acessar sua estante
          </p>
        </div>

        <form onSubmit={handle_submit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              E-mail
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => set_email(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Senha
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => set_password(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={is_loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {is_loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Não tem conta?{" "}

          <Link to="/register" className="font-medium text-primary hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
