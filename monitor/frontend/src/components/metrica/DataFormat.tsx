export function DataGrafico (data: string) {
    const dia = data.slice(8, 10);       
    const mes = parseInt(data.slice(5, 7)); 
    const ano = parseInt(data.slice(1,4));
    const hora = data.slice(11, 16);
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${ano}/${dia}/${meses[mes - 1]} ${hora}`;   
}