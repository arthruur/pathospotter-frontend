// Tipos para a API de Visitação Escolar

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
};

export type Token = {
  acess_token: string;
  token_type: string;
};

export type LoginArgs = { username: string; password: string };

export type AuthContextType = {
  /** Armazena o header completo: "Bearer <jwt>" */
  authToken: string | null;
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  handleLogin: (args: LoginArgs) => Promise<User>;
  handleLogout: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export interface PaperAPI {
  id?: number;
  author_name: string;
  email: string;
  phone: string;
  birthday_date?: string; // ISO-8601 (yyyy-mm-dd)
  cpf: string;
  pdf_url?: string; // endpoint de download
  paper_file_path?: string; // caminho interno no servidor
  created_at?: string;
  updated_at?: string;
}

export interface TicketAPI {
  id?: number;
  name: string;
  email: string;
  phone: string;
  birthday_date?: string; // ISO-8601 (yyyy-mm-dd)
  cpf: string;
  disability: boolean;
  disability_details?: string;
  created_at?: string;
  updated_at?: string;
}

export interface APIResponse<T = unknown> {
  ok?: boolean;
  message?: string;
  detail?: string;
  submissions?: T;
  errors?: string[];
}

/*
export interface FormData {
  // A. Identificação da Escola
  nomeEscola: string;
  enderecoCompleto: string;
  cidadeEstadoCep: string;
  telefoneInstitucional: string;
  emailContato: string;
  nomeResponsavel: string;
  cargoFuncao: string;
  telefoneCelular: string;

  // B. Informações da Visitação
  dataDesejada: string; // ISO (yyyy-mm-dd) recomendado
  horarioPreferencial: 'Manhã' | 'Tarde' | 'Noite' | '';
  numeroAlunos: string;
  numeroProfessores: string;
  faixaEtaria: string;
  anoEscolar: string;

  // C. Transporte
  tipoTransporte: 'onibus' | 'van' | 'outro' | '';
  outroTransporte: string;
  necessitaEstacionamento: 'sim' | 'nao' | '';

  // D. Acessibilidade
  alunosDeficiencia: 'sim' | 'nao' | '';
  especificarDeficiencia: string;

  // E. Autorização
  autorizacao: boolean;
}

export interface VisitationAPI {
  id?: number;
  school_name: string;
  address: string;
  city_state_cep: string;
  phone_inst: string;
  email: string;
  contact_name: string;
  contact_role: string;
  phone_mobile: string;
  visitation_date: string;        // ISO-8601
  preferred_day_times: string[];  // ['Manhã'] etc.
  // Totais e grupos de alunos/professores
  student_total?: number;
  instructor_total?: number;
  student_age_groups?: string[];
  student_grade_years?: string[];
  transport_used: string;         // 'onibus' | 'van' | 'outro'
  transport_other: string | null;
  parking: boolean;
  students_with_disabilities: boolean;
  disability_details: string | null;
  terms_accepted: boolean;
  created_at?: string;
  // Algumas APIs retornam 'modified_at' ao invés de 'updated_at'
  updated_at?: string;
  modified_at?: string;
}

export interface APIResponse<T = unknown> {
  ok?: boolean;
  message?: string;
  detail?: string;
  visitation?: T;
  links?: {
    self: string;
    update: string;
    delete: string;
  };
  errors?: string[];
}
*/
