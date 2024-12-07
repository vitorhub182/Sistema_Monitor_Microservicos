"use client";
import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { atualizaUsuario, descricaoUsuario } from "@/services/usuariosService";
import { FalhaRegistroDTO } from "@/dto/falha";


const FormSchema = z.object({
  id: z.string().min(36, 'id não coincide com o tipo UUID'),
  nome_completo: z.string().min(1, "Campo Nome não pode ser nulo."),
  email: z.string().email({ message: "Digite um e-mail válido." }).min(1, "Campo e-mail não pode ser nulo."),
  senha: z.string().optional(),
  confirmarSenha: z.string().optional(),
  role: z.string().min(1, "Campo Ativo não pode ser nulo."),
  apelido: z.string().min(1, "Campo Apelido não pode ser nulo."),
}).refine(({ senha, confirmarSenha }) => senha === confirmarSenha, {
  message: "Senhas não são iguais.",
  path: ["confirmarSenha"]
});

type DataProps = z.infer<typeof FormSchema>;

export default function AtualizaUsuarioForm() {
  const hasFetchedData = React.useRef(false); 
  const [defaultValues, setDefaultValues] = React.useState<DataProps>(
    {
      id:'',
      nome_completo: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      role: '',
      apelido: ''
    });

  const [shouldFetchData, setShouldFetchData] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchData() {
      if (!shouldFetchData) return;
      try {
        const usuarioId = sessionStorage.getItem('id');
        if (usuarioId) {
          const usuariosData = await descricaoUsuario(usuarioId);
          setDefaultValues({
            id:usuariosData.id || '',
            nome_completo: usuariosData.nome_completo || '',
            email: usuariosData.email || '',
            senha:'',
            confirmarSenha:'',
            role: usuariosData.role || '',
            apelido: usuariosData.apelido || ''
          });
          toast({
            variant: 'default',
            title: 'Usuário consultado com sucesso!'
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Usuário não encontrado no banco de dados!'
          });
        }
        setShouldFetchData(false);
      } catch (error) {
        console.error("Falha conexão com a API: ", error);
        toast({
          variant: 'destructive',
          title: 'Falha ao se conectar com a API para carregar a lista!'
        });
      }
    }

    fetchData();
  }, [shouldFetchData]);

  const form = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function onSubmit(data:DataProps) {
    const { confirmarSenha, ...formData } = data;
    let formDataPass: typeof formData;
    
    if (formData.senha == "") { 
      const { senha, ...formDataWithoutPass } = formData;
       formDataPass = formDataWithoutPass; 
    }else {
    formDataPass = formData;
    }

    try {      
      const resposta = await atualizaUsuario(formDataPass);

      if ('id' in resposta){
        form.reset();
        setShouldFetchData(true);
        return (toast({
          title: "Usuário atualizado com sucesso!"
        })
        );
      } else {
        const falha: FalhaRegistroDTO = resposta;
        
        return (toast({
          variant: "destructive",
          title: "Usuário não atualizado, corrija:",
          error: falha
        }));
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return(
      toast({
        title: "Erro ao atualizar usuário.",
        description: "Ocorreu um erro ao tentar atualizar o usuário. Tente novamente."
      }))
    }
  };

  return (
    <Card className="w-[900px] flex-col">
      <CardHeader>
        <CardTitle>Atualize seus dados de registro</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="nome_completo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmarSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apelido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="p-4  text-white rounded-lg mt-4">Atualizar</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
