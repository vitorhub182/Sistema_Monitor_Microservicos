"use client"
import { toast } from '@/components/ui/use-toast';
import { DescricaoUsuarioDTO } from '@/dto/usuarios';
import { descricaoUsuario } from '@/services/usuariosService';
import React from 'react';


export default function UsuarioPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = React.useState<DescricaoUsuarioDTO>();
  const hasFetchedData = React.useRef(false); 
  React.useEffect(() => {
    async function fetchData() {
      if (hasFetchedData.current) return; 
      hasFetchedData.current = true; 
      try {
        const usuario = await descricaoUsuario(id);
        setData(usuario);
        return (toast({
          variant: 'default',
          title: 'Descrição de usuario consultada com sucesso!'
        }))
      } catch (error) {
        console.error("Falha conexão com a API: ", error);
        return (toast({
          variant: 'destructive',
          title: 'Falha ao se conectar com a API para carregar a descrição!'
        }))
        
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {data?.nome_completo}
      </h3>
      <p>
        Situação atual da inscrição: {data?.email}
      </p>
    </div>
  );
}
