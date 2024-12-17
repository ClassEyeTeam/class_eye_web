// src/routes/login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Loader2 } from "lucide-react";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login();
      // Redirect will be handled by Cognito
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <h1>hello word </h1>
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-semibold text-center">Welcome back</h2>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign in with Cognito
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>Secure login powered by AWS Cognito</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
