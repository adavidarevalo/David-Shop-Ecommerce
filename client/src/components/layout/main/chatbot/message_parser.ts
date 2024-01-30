class MessageParser {
  constructor(actionProvider: any, state: any) {
    (this as any).actionProvider = actionProvider;
    (this as any).state = state;
  }

  parse(message: string) {
    const messageParsed = message.trim().toLowerCase().split(' ');

    const devolucion = [
      'devolucion',
      'devoluciones',
      'devolucionada',
      'devolucionadas',
      'regreso',
      'devolver',
      'regresar',
    ];

    const esDevolucionSelecionado = messageParsed.some((item) => devolucion.includes(item));

    console.log('messageParsed[0] ', messageParsed[0]);

    if (esDevolucionSelecionado) {
      (this as any).actionProvider.confirmarCancelacion();
      return;
    }

    if (messageParsed[0] === 'si') {
      (this as any).actionProvider.pedirEscribirElNumeroDeRastreoDelPedido();
      return;
    }

    if (esUUID(message)) {
      console.log('Paso un uuid');
    }

    (this as any).actionProvider.handleDefaultMessage();
  }
}

export default MessageParser;

function esUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
}
