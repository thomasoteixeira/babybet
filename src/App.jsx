import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

function App() {
  const [form, setForm] = useState({ name: "", email: "", relation: "", sex: "", weight: "", height: "", eyeColor: "", hairColor: "", amount: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [babyData, setBabyData] = useState({ sex: "", weight: "", height: "", eyeColor: "", hairColor: "", prizeSplit: { parents: 20, winners: 80 } });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateScore(form);
    localStorage.setItem(`babybet-${form.email}`, JSON.stringify({ ...form, score }));
    setSubmitted(true);
  };

  const calculateScore = (data) => {
    let score = 0;
    if (data.sex) score += 10;
    if (data.weight) score += 5;
    if (data.height) score += 5;
    if (data.eyeColor) score += 3;
    if (data.hairColor) score += 3;
    return score;
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("baby-data", JSON.stringify(babyData));
    alert("Dados do bebê salvos com sucesso.");
  };

  if (isAdmin) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold">Administração - Dados do Bebê</h1>
        <form onSubmit={handleAdminSubmit} className="space-y-3">
          <input name="sex" value={babyData.sex} onChange={e => setBabyData({ ...babyData, sex: e.target.value })} placeholder="Sexo" />
          <input name="weight" value={babyData.weight} onChange={e => setBabyData({ ...babyData, weight: e.target.value })} placeholder="Peso (g)" />
          <input name="height" value={babyData.height} onChange={e => setBabyData({ ...babyData, height: e.target.value })} placeholder="Altura (cm)" />
          <input name="eyeColor" value={babyData.eyeColor} onChange={e => setBabyData({ ...babyData, eyeColor: e.target.value })} placeholder="Cor dos olhos" />
          <input name="hairColor" value={babyData.hairColor} onChange={e => setBabyData({ ...babyData, hairColor: e.target.value })} placeholder="Cor do cabelo" />
          <input type="number" value={babyData.prizeSplit.parents} onChange={e => setBabyData({ ...babyData, prizeSplit: { ...babyData.prizeSplit, parents: parseInt(e.target.value) } })} placeholder="Pais (%)" />
          <input type="number" value={babyData.prizeSplit.winners} onChange={e => setBabyData({ ...babyData, prizeSplit: { ...babyData.prizeSplit, winners: parseInt(e.target.value) } })} placeholder="Vencedores (%)" />
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }

  if (submitted) {
    return <div className="max-w-md mx-auto p-4 text-center"><h2>Aposta registrada com sucesso!</h2><p>Obrigado por participar.</p></div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <GoogleLogin onSuccess={() => setIsAdmin(true)} onError={() => alert("Erro no login")} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="relation" value={form.relation} onChange={handleChange} placeholder="Relação com o bebê" />
        <select name="sex" value={form.sex} onChange={handleChange} required>
          <option value="">Sexo</option>
          <option value="Menino">Menino</option>
          <option value="Menina">Menina</option>
        </select>
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Peso (g)" />
        <input name="height" value={form.height} onChange={handleChange} placeholder="Altura (cm)" />
        <input name="eyeColor" value={form.eyeColor} onChange={handleChange} placeholder="Cor dos olhos" />
        <input name="hairColor" value={form.hairColor} onChange={handleChange} placeholder="Cor do cabelo" />
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Valor (R$)" required />
        <button type="submit">Enviar aposta</button>
      </form>
    </div>
  );
}

export default App;