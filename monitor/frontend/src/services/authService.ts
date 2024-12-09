import { useState } from "react";

export async function authenticate(email: string, senha: string): Promise<any> {

  try { 
    console.log("teste");
    const response = await fetch('http://backend-monitor-rastros:3000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
    console.log(response);
  
    if (response.status == 200) {
      const data = await response.json();
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
    console.log("Falha ao se conectar com a api:", error )
    return { 
      auth: false,
      isAdmin: false,
    };
  }

}