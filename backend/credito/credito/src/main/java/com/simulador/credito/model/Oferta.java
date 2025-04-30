package com.simulador.credito.model;

public class Oferta {
    public String banco;
    public double valor;
    public int parcelas;
    public double jurosMensal;

    public Oferta(String banco, double valor, int parcelas, double jurosMensal) {
        this.banco = banco;
        this.valor = valor;
        this.parcelas = parcelas;
        this.jurosMensal = jurosMensal;
    }
}
