
export async function authenticate(email: string, senha: string): Promise<any> {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;
  try { 
      const response = await fetch(`${backend}:${port}/login/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
    console.log(response);
  
 // Mock para teste
 //let response = { "status": 200, "access_token": "abc" , "id" : "12345" , "username": "teste", "role": "admin", "apelido": "Dev"}
    if (response.status == 200) {
      const data = await response.json();
      //let data = response;
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('username', data.apelido);
      sessionStorage.setItem('role', data.role);
      return { 
        auth: true,
        isAdmin: (data.role === 'admin' ? true : false),
      };  
    }else {
      return { 
        auth: false,
        isAdmin: false,
      };
    }
  } catch (error){
    console.log("Falha ao se conectar com a api:", error)
    return { 
      auth: false,
      isAdmin: false,
    };
  }

}