package com.example.backend;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")       // el cliente publica a /app/chat.send
    @SendTo("/topic/messages")          // se retransmite a los suscriptos a /topic/messages
    public Mensaje enviar(Mensaje mensaje) {
        return mensaje;
    }
}
