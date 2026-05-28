export const schema = {
  title: 'Componente Share',
  description: 'Componente de Compartilhar na pagina de produto',
  type: 'object',
  properties: {
    emailAssunto: {
      title: 'Assunto do Email',
      description: '',
      type: 'string',
      default: 'Estou compartilhando esse produto de Planeta do Bebê',
    },
    emailMensagem: {
      title: 'Mensagem do Email antes do link do produto',
      description: '',
      type: 'string',
      default: 'Aqui está o link para ter acesso direto ao produto que eu estou compartilhando:',
    },
    whatsappText: {
      title: 'Mensagem do Whatspp antes do link do produto',
      description: '',
      type: 'string',
      default: '',
    }
  }
}
