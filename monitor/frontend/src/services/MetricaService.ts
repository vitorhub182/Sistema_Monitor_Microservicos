import { EntradaMetricaDTO, MetricaQuantDTO } from "@/dto/metrica";
import { ObjGen } from "@/dto/objetoGenerico";

function verifToken(token: string | null){
    // MODIFICADO PARA TESTE
    // if(token){
    if(!token){
      return true;
    }
    throw new Error('Token não encontrado!');
  }
export async function getListaQuantMetrica(rotaServico: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem('access_token');
  verifToken(token);
  try{
    const response = await fetch(`${backend}:${port}/metricas/getMetrQuantReq/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rotaServico),
    });
  
    if (response.status == 401 ) {
      
      const dados: any  = [];
      return dados; 

    }else if (response.status == 201){
      const dados: MetricaQuantDTO[] = await response.json();
      console.log(dados);
      return dados;
    }else {
      throw new Error('Falha ao consultar as Metrica de quantidade de requisicoes!');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
}

export async function getListaMSMetrica(rotaServico: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem('access_token');
  verifToken(token);
  try{
    const response = await fetch(`${backend}:${port}/metricas/getMetrMSReq/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rotaServico),
    });
  
    if (response.status == 401 ) {
      
      const dados: any  = [];
      return dados; 

    }else if (response.status == 201){
      const dados: MetricaQuantDTO[] = await response.json();
      console.log(dados);
      return dados;
    }else {
      throw new Error('Falha ao consultar as Metrica de quantidade de requisicoes!');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
}

export async function getListaServico() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrCallListService`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: [] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}


export async function getMetricaCall1(parametros: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrCall?servico=${parametros.servico}&tipo=${parametros.tipo}&agrupamento=${parametros.agrupamento}&periodo=${parametros.periodo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: MetricaQuantDTO[] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}

export async function getMetricaCallKind(parametros: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrCallKind?servico=${parametros.servico}&tipo=${parametros.tipo}&agrupamento=${parametros.agrupamento}&periodo=${parametros.periodo}&modo=${parametros.nomeTipo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: ObjGen[] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}

export async function getMetricaCallCpuRecentUtil(parametros: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrCpu/RecentUtilization?servico=${parametros.servico}&tipo=${parametros.tipo}&agrupamento=${parametros.agrupamento}&periodo=${parametros.periodo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: ObjGen[] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}




export async function getMetricaMemoriaUso(parametros: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrMemoria/uso?servico=${parametros.servico}&tipo=${parametros.tipo}&agrupamento=${parametros.agrupamento}&periodo=${parametros.periodo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: ObjGen[] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}



export async function getMetricaMemoriaJVM(parametros: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrMemoria/tipos?servico=${parametros.servico}&tipo=${parametros.tipo}&agrupamento=${parametros.agrupamento}&periodo=${parametros.periodo}&modo=${parametros.nomeTipo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: ObjGen[] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}


export async function getMetricaCpuThread(parametros: EntradaMetricaDTO) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;

  const token = sessionStorage.getItem("access_token");
  verifToken(token);

  try {
    const response = await fetch(
      `${backend}:${port}/metricas/getMetrCpu/thread?servico=${parametros.servico}&tipo=${parametros.tipo}&agrupamento=${parametros.agrupamento}&periodo=${parametros.periodo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 401) {
      const dados: any = [];
      return dados;
    } else if (response.status == 201) {
      const dados: ObjGen[] = await response.json();
      return dados;
    } else {
      throw new Error("Falha ao consultar os dados");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao se conectar com a api");
  }
}