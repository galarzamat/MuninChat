package com.example.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Prefijo para destinos que el broker maneja hacia los clientes (subscripciones)
        registry.enableSimpleBroker("/topic", "/queue");
        // Prefijo para mensajes que van del cliente al servidor (@MessageMapping)
        registry.setApplicationDestinationPrefixes("/app");
        // Opcional: para mensajes dirigidos a un usuario específico
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // ajustar en producción
                .withSockJS(); // fallback para navegadores sin soporte nativo
    }
}
