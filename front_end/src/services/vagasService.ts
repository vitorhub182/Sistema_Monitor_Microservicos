import { AtualizaVagaDTO, CriaVagaDTO, DescricaoVagaDTO, ListaVagasDTO } from "@/dto/vagas";

export async function listaVagas() {
  const token = sessionStorage.getItem('access_token');
  if (!token){
    throw new Error('Token não encontrado!')
  }
  try{
    const response = await fetch('http://localhost:3002/vagas/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    if (response.status == 401 ) {
      
      const dados: any  = [];
      return dados; 

    }else if (response.status == 200){
      const dados: ListaVagasDTO = await response.json();
      return dados;
    }else {
      throw new Error('Falha ao listar vaga');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
  }

  export async function descricaoVaga(id : string) {
    const token = sessionStorage.getItem('access_token');
    if (!token){
      throw new Error('Token não encontrado!')
    }
    try{
      const response = await fetch(`http://localhost:3002/vagas/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    
      if (response.status == 401 ) {
        
        const dados: any  = [];
        return dados; 
  
      }else if (response.status == 200){
        const dados: DescricaoVagaDTO = await response.json();
        return dados;
      }else {
        throw new Error('Falha ao apresentar descrição de vagas');
      }
    } catch (error){
      console.log(error);
      throw new Error('Falha ao se conectar com a api');
    }
    }

    export async function cadastroVaga(dadosVaga: CriaVagaDTO) {
      const token = sessionStorage.getItem('access_token');
      if (!token){
        throw new Error('Token não encontrado!')
      }
      try{
        const response = await fetch('http://localhost:3002/vagas/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosVaga),
        });
      
        if (response.status == 400  ) {
          const respostaAPI = await response.json();

          return respostaAPI; 
          
        }else if (response.status == 201){
          const dados = await response.json();

          return dados;
        }else {
          throw new Error('Falha ao registrar vaga');
        }
      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
      }

      export async function atualizarVaga(dadosVaga: AtualizaVagaDTO) {

        const identificador = dadosVaga.id;
        const { id, ...dados } = dadosVaga;

        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }
        try{
          const response = await fetch(`http://localhost:3002/vagas/${identificador}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados),
          });
        
          if (response.status == 400  ) {
            const respostaAPI = await response.json();
  
            return respostaAPI; 
            
          }else if (response.status == 201 || 200){
            const dados = await response.json();
  
            return dados;
          }else {
            throw new Error('Falha ao atualizar vaga');
          }
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }

      export async function deletarVaga(id: string) {
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }
        try{
          const response = await fetch(`http://localhost:3002/vagas/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
        
          if (response.status == 404  ) {
            const respostaAPI = await response.json();
            return respostaAPI; 
            
          }else if (response.status == 200 ){
            const dados = await response.json();
            return dados;
          }else {
            throw new Error('Falha ao deletar vaga');
          }
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }