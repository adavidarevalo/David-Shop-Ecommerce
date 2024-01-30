class ActionProvider {
  constructor(createChatBotMessage: any, setStateFunc: any) {
    (this as any).createChatBotMessage = createChatBotMessage;
    (this as any).setState = setStateFunc;
  }

  confirmarCancelacion() {
    const message = (this as any).createChatBotMessage(
      'Para realizarr una devolucion por favor envie un mensaje a tecnostore@gmail.com'
    );
    (this as any).setState((prev: any) => {
      return { ...prev, messages: [...prev.messages, message] };
    });
  }

  pedirEscribirElNumeroDeRastreoDelPedido() {
    const message = (this as any).createChatBotMessage(
      'Por favor escriba el numero de rastreo del pedido'
    );
    (this as any).setState((prev: any) => {
      return { ...prev, messages: [...prev.messages, message] };
    });
  }
  handleDefaultMessage() {
    const message = (this as any).createChatBotMessage('Lo siento no entedimos');

    (this as any).setState((prev: any) => {
      return { ...prev, messages: [...prev.messages, message] };
    });
    return message;
  }
}

export default ActionProvider;
