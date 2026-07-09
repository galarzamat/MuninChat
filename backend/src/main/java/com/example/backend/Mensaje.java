package com.example.backend;

import java.time.LocalDateTime;

public class Mensaje {

    private String usuario;
    private String texto;
    private LocalDateTime fecha;

    // Constructor vacío (necesario para deserializar JSON)
    public Mensaje() {
    }

    public Mensaje(String usuario, String texto, LocalDateTime fecha) {
        this.usuario = usuario;
        this.texto = texto;
        this.fecha = fecha;
    }

    // Getters y setters
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
