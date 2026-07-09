import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible desde cualquier componente
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;
  private readonly URL_BACKEND = 'ws://localhost:8080/chat-room'; // La IP local de tu compañero cuando levante Spring Boot

  constructor() {}

  /**
   * Conecta al WebSocket del servidor
   */
  conectar(): Observable<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({
        url: this.URL_BACKEND,
        // Al usar STOMP en Spring Boot, a veces se requieren configuraciones extra, 
        // pero con esta base RxJS ya dejamos el canal abierto.
      });
      console.log(' Intento de conexión WebSocket establecido hacia:', this.URL_BACKEND);
    }
    return this.socket$.asObservable();
  }

  /**
   * Envía un mensaje a través del canal de WebSocket
   * @param mensaje Objeto con la información (en el futuro irá cifrado)
   */
  enviarMensaje(mensaje: any): void {
    if (this.socket$) {
      this.socket$.next(mensaje);
    } else {
      console.error(' No se puede enviar el mensaje: El socket no está conectado.');
    }
  }

  /**
   * Cierra la conexión de forma segura
   */
  desconectar(): void {
    if (this.socket$) {
      this.socket$.complete();
      console.log(' Conexión WebSocket cerrada de forma segura.');
    }
  }
}