// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { Input, Button, Typography, notification } from "antd";
import { loginUsuario } from "../../../services/authService";

const { Link } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      notification.warning({
        message: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        placement: "bottom",
      });
      return;
    }

    setLoading(true);
    try {
      await loginUsuario(email, senha);
      notification.success({
        message: "Sucesso",
        description: "Login realizado com sucesso!",
        placement: "bottom",
      });
      // TODO: Redirecionar para o painel ou home
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Erro ao fazer login. Verifique suas credenciais.",
        placement: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <div className="w-80 space-y-4">
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded"
        />
        <Input.Password
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="rounded"
        />
        <Link href="/auth/recuperar-senha" className="text-red-500 block text-right">
          Esqueceu sua senha?
        </Link>
        <Button
          type="primary"
          className="w-full bg-red-600 hover:bg-red-500"
          onClick={handleLogin}
          loading={loading} // Adiciona o estado de carregamento
        >
          Entrar
        </Button>
      </div>
      <p className="mt-4">
        Ainda não possui uma conta?{' '}
        <Link href="/auth/cadastro" className="text-red-500">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
};

export default Login;