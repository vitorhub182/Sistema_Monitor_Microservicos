import { AtualizaUsuarioDTO,CriaUsuarioDTO, DescricaoUsuarioDTO, ListaUsuarioDTO } from "@/dto/usuarios";

export async function cadastroUsuario(dadosUsuario: CriaUsuarioDTO) {

  try{
    const response = await fetch('http://backend-monitor-rastros:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario),
    });
  
    if (response.status == 400 ) {
      const respostaAPI = await response.json();
      console.log(respostaAPI.message)
      return respostaAPI; 
      
    }else if (response.status == 201){
      const dados = await response.json();
      console.log(dados);
      return dados;
    }else {
      throw new Error('Falha ao registrar usuarios');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
  }
  
  export async function listaUsuarios() {
    const token = sessionStorage.getItem('access_token');
    if (!token){
      throw new Error('Token não encontrado!')
    }
    try{
      const response = await fetch('http://backend-monitor-rastros:3000/usuarios/', {
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
        const dados: ListaUsuarioDTO = await response.json();
        console.log(dados);
        return dados;
      }else {
        throw new Error('Falha ao listar usuarios');
      }
    } catch (error){
      console.log(error);
      throw new Error('Falha ao se conectar com a api');
    }
    }

    export async function descricaoUsuario(id : string) {
      const token = sessionStorage.getItem('access_token');
      if (!token){
        throw new Error('Token não encontrado!')
      }
      try{
        const response = await fetch(`http://backend-monitor-rastros:3000/usuarios/${id}`, {
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
          const dados: DescricaoUsuarioDTO = await response.json();
          console.log(dados);
          return dados;
        }else {
          throw new Error('Falha ao apresentar descrição de usuarios');
        }
      } catch (error){
        console.log(error);
        throw new Error('Falha ao se conectar com a api');
      }
      }

      export async function atualizaUsuario(dadosUsuario: AtualizaUsuarioDTO) {
        const identificador = dadosUsuario.id;
        const { id, ...dados } = dadosUsuario;
        
        const token = sessionStorage.getItem('access_token');
        try{
          if (!token){
            throw new Error('Token não encontrado!')
          }
          const response = await fetch(`http://backend-monitor-rastros:3000/usuarios/${identificador}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(dados),
          });
        
          if (response.status == 400 ) {
            const respostaAPI = await response.json();
            console.log(respostaAPI.message)
            return respostaAPI; 
            
          }else if (response.status == 201 || 200){
            const dados = await response.json();
            console.log(dados);
            return dados;
          }else {
            throw new Error('Falha ao atualizar usuario');
          }
        } catch (error){
          console.log(error);
          throw new Error('Falha ao se conectar com a api');
        }
        }