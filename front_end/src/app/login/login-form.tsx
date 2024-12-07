"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from '@/context/auth-context';
import { toast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const log = await login(email, password);
    if (log === false){
      return (toast({
        variant: 'destructive',
        title: 'Credências inválidas'
      }))
    } else if (log === true) {
      return (toast({
        variant: 'default',
        title: 'Login realizado com Sucesso!'
      }))
    }else {
      return (toast({
        variant: 'destructive',
        title: 'Falha ao se conectar com a API!'
      }))
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="align-items">Acesse</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" name="senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <CardFooter className="flex justify-between">
      <Button type="submit" className="p-4  text-white rounded-lg mt-4">Entrar</Button>
            <Link href={"/cadastro"} className={buttonVariants({ variant: 'link' })}>Cadastre-se
            </Link>
      </CardFooter>
          
          </form>
      </CardContent>
      
    </Card>
  );
}
