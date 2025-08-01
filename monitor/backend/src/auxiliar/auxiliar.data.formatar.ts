type CamposTempo= 'ano' | 'mes' | 'dia' | 'hora' | 'minuto' | 'segundo'
type DataTempoParcial = {
  [K in CamposTempo]?: string | null ;
};

export function formatarTempo(estampa: string, agrupamento: string) {
  const horario: DataTempoParcial = {
    ano: null,
    mes: null,
    dia: null,
    hora: null,
    minuto: null,
    segundo: null,
  };


    horario.ano = estampa.substring(0, 4);

  if (agrupamento !== 'ano') {
    horario.mes = estampa.substring(5, 7);
  }
  if (agrupamento !== 'ano' && agrupamento !== 'mes') {
    horario.dia = estampa.substring(8, 10);
  }
  if (agrupamento === 'hora' || agrupamento === 'minuto' || agrupamento === 'segundo') {
    horario.hora = estampa.substring(11, 13);
  }
  if (agrupamento === 'minuto' || agrupamento === 'segundo') {
    horario.minuto = estampa.substring(14, 16);
  }
  if (agrupamento === 'segundo') {
    horario.segundo = estampa.substring(17, 19);
  }
  
  return (
     horario?.ano  +
    (horario?.mes ? "/" + horario?.mes : "") +
    (horario?.dia ? "/" + horario?.dia : "") +
    (horario?.hora ? " " + horario?.hora : "") + 
    (horario?.minuto ? ":" + horario?.minuto : "") +
    (horario?.segundo ? ":" + horario?.segundo : "")
  )
}