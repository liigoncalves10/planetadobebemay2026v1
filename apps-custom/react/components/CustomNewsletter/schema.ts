export const schema = {
    title: 'Newsletter Opções',
    description: '',
    type: 'object',
    properties: {
      sucessMensage: {
        title: 'Mensagem de sucesso',
        description: '',
        type: 'string',
        default: '',
      },
      options: {
        type: "array",
        title: "Opções do Select",
        items: {
          type: "object",
          title: "Opções do Select",
          properties: {
            name: {
              title: "Opção do Select",
              type: "string",
              default: ""
            }
          }
        }
      }
    }
  }
  