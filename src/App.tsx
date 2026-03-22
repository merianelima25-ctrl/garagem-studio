import { useState } from "react";

export default function App() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState("");

  const adicionar = () => {
    if (!nome || !telefone || !valor || !vencimento) return;

    setClientes([
      ...clientes,
      {
        id: Date.now(),
        nome,
        telefone,
        valor,
        vencimento,
        status: "Pendente",
      },
    ]);

    setNome("");
    setTelefone("");
    setValor("");
    setVencimento("");
  };

  const pagar = (id: number) => {
    setClientes(
      clientes.map((c) => (c.id === id ? { ...c, status: "Pago" } : c))
    );
  };

  const cobrar = (c: any) => {
    const msg = `Olá ${c.nome}, sua mensalidade da Garagem Studio está pendente. Valor: R$${c.valor}`;

    window.open(
      `https://wa.me/55${c.telefone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        padding: 20,
        background: "#0B0B0B",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#FF6A00" }}>Garagem Studio</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <input
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          type="date"
          value={vencimento}
          onChange={(e) => setVencimento(e.target.value)}
        />
        <button onClick={adicionar}>Adicionar</button>
      </div>

      {clientes.map((c) => (
        <div
          key={c.id}
          style={{ border: "1px solid #333", marginBottom: 10, padding: 10 }}
        >
          <p>
            <strong>{c.nome}</strong>
          </p>
          <p>R$ {c.valor}</p>
          <p>Status: {c.status}</p>

          <button onClick={() => pagar(c.id)}>Pago</button>
          <button onClick={() => cobrar(c)}>Cobrar</button>
        </div>
      ))}
    </div>
  );
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
