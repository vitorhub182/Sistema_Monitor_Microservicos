export interface ObjGen {
    label: string,
    value: string,
}

export interface SelecaoGenericaInterface {
    onSubmit: (info: ObjGen) => void;
    lista: ObjGen[] | null | undefined;
  }

  