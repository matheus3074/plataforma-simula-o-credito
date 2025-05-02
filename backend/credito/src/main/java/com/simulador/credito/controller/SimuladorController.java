package com.simulador.credito.controller;

import com.simulador.credito.model.AnaliseRequest;
import com.simulador.credito.model.Oferta;
import com.simulador.credito.model.ContratacaoRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SimuladorController {
    @PostMapping("/analise")
    public ResponseEntity<String> analise(@RequestBody AnaliseRequest request) {
        // Simula uma análise automática
        return ResponseEntity.ok("PRE_APROVADO");
    }

    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> getOfertas() {
        // Simula retorno de ofertas disponíveis
        List<Oferta> ofertas = List.of(
                new Oferta("Banco XP", 5000, 12, 1.5),
                new Oferta("Banco YZ", 7000, 24, 1.8),
                new Oferta("Banco ABC", 3000, 6, 1.2)
        );
        return ResponseEntity.ok(ofertas);
    }

    @PostMapping("/contratar")
    public ResponseEntity<String> contratar(@RequestBody ContratacaoRequest request) {
        // Simula contratação com sucesso
    return ResponseEntity.ok("CONTRATO_REALIZADO");
    }
}
