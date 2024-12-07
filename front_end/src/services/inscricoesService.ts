import { AtualizaInscricaoDTO, CriaInscricaoDTO, DescricaoInscricaoDTO, ListaInscricoesDTO } from "@/dto/inscricoes";

export async function listaInscricoes() {
  const token = sessionStorage.getItem('access_token');
  if (!token){
    throw new Error('Token não encontrado!')
  }
  try{
    const response = await fetch('http://localhost:3002/inscricoes/', {
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
      const dados: ListaInscricoesDTO = await response.json();
      //console.log(dados);
      return dados;
    }else {
      throw new Error('Falha ao listar inscrições');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
  }

  export async function descricaoInscricao(id : string) {
    const token = sessionStorage.getItem('access_token');
    if (!token){
      throw new Error('Token não encontrado!')
    }
    try{
      const response = await fetch(`http://localhost:3002/inscricoes/${id}`, {
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
        const dados: DescricaoInscricaoDTO = await response.json();
        console.log(dados);
        return dados;
      }else {
        throw new Error('Falha ao apresentar descrição de inscrição');
      }
    } catch (error){
      console.log(error);
      throw new Error('Falha ao se conectar com a api');
    }
    }

    export async function cadastroInscricao(dadosInscricao: CriaInscricaoDTO) {
      const token = sessionStorage.getItem('access_token');
      if (!token){
        throw new Error('Token não encontrado!')
      }
      try{
        const response = await fetch('http://localhost:3002/inscricoes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosInscricao),
        });
      
        if (response.status == 400) {
          const respostaAPI = await response.json();
          //console.log(respostaAPI.message)
          return respostaAPI; 
          
        }else if (response.status == 201){
          const dados = await response.json();
          //console.log(dados);
          return dados;
        }else {
          throw new Error('Falha ao registrar inscricao');
        }
      } catch (error){
        //console.log(dadosInscricao);
        //console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
      }


      export async function atualizaInscricao(id : string, atualizaInscricao: AtualizaInscricaoDTO ) {
        const token = sessionStorage.getItem('access_token');
        if (!token){
          throw new Error('Token não encontrado!')
        }
        try{
          const response = await fetch(`http://localhost:3002/inscricoes/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(atualizaInscricao),
          });
        
          if (response.status == 401 ) {
            
            const dados: any  = [];
            return dados; 
      
          }else if (response.status == 200){
            const dados: DescricaoInscricaoDTO = await response.json();
            console.log(dados);
            return dados;
          }else {
            throw new Error('Falha ao apresentar descrição de inscrição');
          }
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }