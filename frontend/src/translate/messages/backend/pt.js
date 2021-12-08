const messages = {
  //? ------------- AUTH MESSAGES -------------- */
  ERR_INVALID_CREDENTIALS: "Erro de autenticação. Por favor, tente novamente.",
  ERR_SESSION_EXPIRED: "Sessão expirada. Por favor entre.",
  ERR_NO_PERMISSION: "Você não tem permissão para acessar este recurso.",

  //? ------------- USER MESSAGES -------------- */
  //! ------------- USER VALIDATOR MESSAGES ---- */
  ERR_VALIDATE_USER: "Erro ao validar dados do usuário",
  NAME_IS_REQUIRED: "É preciso informar um nome.", 
  MIN_CARACHTERS_NAME: "O nome deve conter no mínimo 6 caracteres.",
  MAX_CARACHTERS_NAME: "O nome não deve exceder 30 caracteres.",
  NAME_ALREADY_REGISTERED: "Este nome já está sendo utilizado por outro usuário.",

  INVALID_EMAIL: "Informe um e-mail válido.",
  EMAIL_IS_REQUIRED: "É preciso informar um e-mail.",
  EMAIL_ALREADY_REGISTERED: "Este email já está sendo utilizado por outro usuário.",

  PASSW_IS_REQUIRED: "É preciso informar uma senha.",
  MIN_CARACHTERS_PASSW: "A senha deve conter no mínimo 6 caracteres.",
  MAX_CARACHTERS_PASSW: "A senha não deve exceder 30 caracteres.",

  //* ------------- USER CONTROLLER MESSAGES ---- */
  ERR_NO_USER_FOUND: "Nenhum usuário encontrado com este ID.", 
  ERR_USER_CREATION_DISABLED:
    "A criação do usuário foi desabilitada pelo administrador.",

  //? ------------- WHATSAPP MESSAGES -------------- */
  ERR_NO_OTHER_WHATSAPP: "Deve haver ao menos um WhatsApp padrão.",
  ERR_NO_DEF_WAPP_FOUND:
    "Nenhum WhatsApp padrão encontrado. Verifique a página de conexões.",
  ERR_WAPP_NOT_INITIALIZED:
    "Esta sessão do WhatsApp não foi inicializada. Verifique a página de conexões.",
  ERR_WAPP_CHECK_CONTACT:
    "Não foi possível verificar o contato do WhatsApp. Verifique a página de conexões",
  ERR_WAPP_INVALID_CONTACT: "Este não é um número de Whatsapp válido.",
  ERR_WAPP_DOWNLOAD_MEDIA:
    "Não foi possível baixar mídia do WhatsApp. Verifique a página de conexões.",
  ERR_SENDING_WAPP_MSG:
    "Erro ao enviar mensagem do WhatsApp. Verifique a página de conexões.",
  ERR_DELETE_WAPP_MSG: "Não foi possível excluir a mensagem do WhatsApp.",
  ERR_FETCH_WAPP_MSG:
    "Erro ao buscar a mensagem no WhtasApp, talvez ela seja muito antiga.",
  ERR_WAPP_GREETING_REQUIRED:
    "A mensagem de saudação é obrigatório quando há mais de uma fila.",
  ERR_NO_WAPP_FOUND: "Nenhum WhatsApp encontrado com este ID.",

  //* ------------- CONTACT VALIDATOR MESSAGES -------------- */
  ERR_DUPLICATED_CONTACT: "Já existe um contato com este número.",
  ERR_NO_CONTACT_FOUND: "Nenhum contato encontrado com este ID.",

  //* ------------- TICKET VALIDATOR MESSAGES -------------- */
  ERR_NO_TICKET_FOUND: "Nenhum tíquete encontrado com este ID.",
  ERR_OTHER_OPEN_TICKET: "Já existe um tíquete aberto para este contato.",
  ERR_CREATING_TICKET: "Erro ao criar tíquete no banco de dados.",

  //* ------------- MESSAGE VALIDATOR MESSAGES -------------- */
  ERR_CREATING_MESSAGE: "Erro ao criar mensagem no banco de dados.",

  //* ------------- QUEUE VALIDATOR MESSAGES -------------- */
  ERR_QUEUE_COLOR_ALREADY_EXISTS: "Esta cor já está em uso, escolha outra."
};

export { messages };
