
import { Component, OnInit, OnDestroy } from '@angular/core'; // Agregamos los ciclos de vida
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../services/websocket'; // Importamos tu servicio
import { Subscription } from 'rxjs';

interface Mensaje {
  texto: string;
  esMio: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html', // Tu ruta simplificada
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  nuevoMensaje: string = '';
  listaMensajes: Mensaje[] = [
    { texto: '¡Bienvenido a MunninChat!', esMio: false }
  ];
  
  private socketSubscription!: Subscription;

  // Inyectamos el servicio en el constructor
  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    // Cuando la pantalla se carga, nos conectamos automáticamente al servidor
    this.socketSubscription = this.wsService.conectar().subscribe({
      next: (mensajeRecibido) => {
        // Esta función se ejecutará CADA VEZ que tu compañero mande un mensaje desde Spring Boot
        this.listaMensajes.push({
          texto: mensajeRecibido.texto, // Asumiendo la estructura del objeto
          esMio: false // Viene del otro usuario
        });
      },
      error: (err) => console.error('Error en la conexión del socket:', err),
      complete: () => console.log('Conexión del socket finalizada.')
    });
  }

  enviarMensajeReal() {
    if (this.nuevoMensaje.trim() === '') return;

    const payload = {
      texto: this.nuevoMensaje,
      remitente: 'MiUsuario' // Estructura básica temporal
    };

    // 1. Enviamos el mensaje al servidor a través del servicio
    this.wsService.enviarMensaje(payload);

    // 2. Lo agregamos a nuestra pantalla local
    this.listaMensajes.push({
      texto: this.nuevoMensaje,
      esMio: true
    });

    this.nuevoMensaje = '';
  }

  ngOnDestroy(): void {
    // Si el usuario se va del chat, destruimos la suscripción para evitar fugas de memoria
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    this.wsService.desconectar();
  }
}