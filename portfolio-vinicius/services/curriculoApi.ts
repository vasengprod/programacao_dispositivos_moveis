const API_URL = "https://curriculo-express-api-two.vercel.app";

export type Pessoa = {
  id: number;
  nome: string;
  slug: string;
  cargo: string;
  resumo: string;
  email: string;
  cidade: string;
  estado: string;
  pais: string;
};

export type ExperienciaAcademica = {
  id: number;
  pessoa_id: number;
  curso: string;
  instituicao: string;
  periodo: string;
  status: string;
  descricao: string;
};

export type ExperienciaProfissional = {
  id: number;
  pessoa_id: number;
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
  impacto: string;
};

export type Projeto = {
  id: number;
  pessoa_id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  url: string;
};

export type Tecnologia = {
  id: number;
  pessoa_id: number;
  nome: string;
  categoria: string;
};

export type Link = {
  id: number;
  pessoa_id: number;
  tipo: string;
  url: string;
};

export type CurriculoResponse = {
  pessoa: Pessoa;
  experiencias_academicas: ExperienciaAcademica[];
  experiencias_profissionais: ExperienciaProfissional[];
  projetos: Projeto[];
  tecnologias: Tecnologia[];
  links: Link[];
};

export async function buscarCurriculo(): Promise<CurriculoResponse> {
  const response = await fetch(`${API_URL}/curriculos/vinicius-almeida`);

  if (!response.ok) {
    throw new Error("Erro ao buscar currículo na API");
  }

  return response.json();
}