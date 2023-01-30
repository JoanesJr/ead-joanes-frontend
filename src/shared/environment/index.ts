export const Environment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  LIMITE_DE_LINHAS: 10,
  /**
   * Placeholder exibido nas inputs
   */
  INPUT_DE_BUSCA: "Pesquisar...",
  /**
   * Texto exibido quando nenhum registro é encontrado em uma listagem
   */
  LISTAGEM_VAZIA: "Nenhum registro encontrado.",
  /**
   * Url base de consultado dos dados dessa aplicação
   */
  URL_BASE: "http://localhost:4000",
  // URL_BASE: "https://api-ead-joanes.herokuapp.com",

  // Routes - ADMIN
  ADMIN_USUARIOS: "/admin/usuarios",
  ADMIN_USUARIOS_DETALHE: "/admin/usuarios/detalhe/:id",
  ADMIN_CURSOS: "/admin/cursos",
  ADMIN_CURSOS_DETALHE: "/admin/cursos/detalhe/:id",
  ADMIN_SESSOES: "/admin/cursos/sessoes",
  ADMIN_SESSOES_DETALHE: "/admin/cursos/sessoes/detalhe/:id",
  ADMIN_AULAS: "/admin/cursos/sessoes/aulas",
  ADMIN_AULAS_DETALHE: "/admin/cursos/sessoes/aulas/detalhe/:id",

  //ROUTES USER
  USER_HOMEPAGE: "/cursos",
  USER_COURSE_PAGE: "/cursos/:id",
  USER_CLASS: "/cursos/:id/aula"

};
