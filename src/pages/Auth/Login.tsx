
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { Navigate, Link } from "react-router-dom";
import { MailIcon, LockIcon } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const { login, loading, error, user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Если пользователь уже авторизован, перенаправляем на главную
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">CaloriX</CardTitle>
          <p className="text-muted-foreground mt-2">Вход в аккаунт</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
            
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Зарегистрироваться
                </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
