import { useState } from "react";

// ─── FORNECEDORES ────────────────────────────────────────────────────────────
// logo: URL pública da logo da empresa (null = profissional autônomo, usa avatar com iniciais)
const PROVIDERS = {
  murilowolf:    { name: "Murilo Wolf",         email: "murillowolf@hotmail.com",          phone: "(12) 98298-9266",  specialty: "Guia de trilha & avistamento de aves",  logo: null },
  patysharon:    { name: "Paty Sharon",          email: "pat.sharon@hotmail.com",            phone: "(16) 99291-2747",  specialty: "Aulas de yoga & vivências",               logo: null },
  gabrieletoth:  { name: "Gabriele Toth",        email: null,                                phone: "(11) 98502-2499",  specialty: "Aulas de Iyengar Yoga",                   logo: null },
  sergiobond:    { name: "Sérgio Bondioli",      email: "kaxorrolokopasseios@gmail.com",    phone: "(12) 99104-4986",  specialty: "Passeios de Jeep 4x4",                    logo: null },
  maremar:       { name: "MareMar Turismo",      email: "reservasmaremar@gmail.com",         phone: "(12) 3896-3679",   specialty: "Pioneiros em turismo receptivo desde 1991", logo: "https://cdn.paytour.com.br/assets/images/logos/logo-940915a33607b2f5d886d2cafac1f18326029821.png" },
  yabu:          { name: "Yabu Passeios",        email: "contato.yabu@gmail.com",            phone: "(12) 99228-5184",  specialty: "Aluguel de lancha",                       logo: null },
  scalea:        { name: "Scalea Lanchas",       email: "scalealanchas@gmail.com",           phone: "(12) 99771-6826",  specialty: "Aluguel de lancha premium",               logo: null },
  tatianeunic:   { name: "Tatiane Unic",         email: "tati.unic@hotmail.com",             phone: "(12) 98239-0324",  specialty: "Massagem terapêutica & relaxante",        logo: null },
  fernandalessa: { name: "Fernanda Lessa",       email: "fernandalessa1982@uol.com.br",      phone: "(11) 99423-2799",  specialty: "Massagem terapêutica & relaxante",        logo: null },
  aquaticos:     { name: "Aquáticos Ilhabela",   email: "aquaticos.ilhabela@gmail.com",      phone: "(12) 99645-3616",  specialty: "Melhor operadora de mergulho de Ilhabela", logo: "https://cdn.paytour.com.br/assets/images/logos/logo-4559b490a615c0321fbc67322320c1a74c9ef256.png" },
  augusto:       { name: "Augusto — AquaLango",  email: "aqualangoanjosdiver@gmail.com",     phone: "(12) 98216-7346",  specialty: "Mergulho guiado",                         logo: null },
  beatriztumoli: { name: "Beatriz Tumoli",       email: "beatriztumoli@gmail.com",           phone: "(12) 99164-9154",  specialty: "Personal Chef",                           logo: null },
  paddle:        { name: "Paddle Ilhabela",      email: null,                                phone: "(12) 99634-6419",  specialty: "Aluguel de caiaque & stand up",            logo: null },
};

// ─── SERVIÇOS ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1, category: "Bem-estar", color: "#C9A96E",
    img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Massagem & Bem-Estar",
    description: "Relaxe sem sair do seu espaço. Massagem relaxante, terapêutica ou drenagem linfática diretamente no imóvel, com total privacidade. Atendimento individual ou para casais.",
    highlight: ["Relaxante", "Terapêutica", "Drenagem linfática", "Individual ou casal"],
    priceLabel: "A partir de R$ 260,00",
    slots: ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00"],
    providers: ["tatianeunic","fernandalessa"],
  },
  {
    id: 2, category: "Gastronomia", color: "#E07A5F",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Personal Chef",
    description: "Uma experiência gastronômica exclusiva no conforto da sua hospedagem. O chef cuida de tudo: menu, ingredientes, preparo e organização da cozinha. Perfeito para jantares especiais e celebrações.",
    highlight: ["Planejamento do menu", "Compra de ingredientes", "Preparo no local", "Organização após o serviço"],
    priceLabel: "A partir de R$ 585,00",
    slots: ["12:00","13:00","19:00","20:00","21:00"],
    providers: ["beatriztumoli"],
  },
  {
    id: 3, category: "Aventura", color: "#3D8B6F",
    img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Passeio de Jeep",
    description: "Explore trilhas e paisagens incríveis em um jeep 4x4 com guia experiente. Roteiros personalizados pela região.",
    highlight: ["Guia local", "Roteiros personalizados", "Off-road"],
    priceLabel: "A partir de R$ 156,00",
    slots: ["07:00","08:00","13:00","14:00"],
    providers: ["sergiobond"],
  },
  {
    id: 4, category: "Mar", color: "#2B7FBF",
    img: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Passeio de Barco",
    description: "Explore o melhor do litoral com exclusividade. Passeios privativos com roteiros personalizados, paradas para mergulho livre e praias isoladas. Meio período ou dia completo.",
    highlight: ["Passeio privativo", "Roteiro personalizado", "Paradas para mergulho", "Meio ou dia completo"],
    priceLabel: "A partir de R$ 290,00",
    slots: ["08:00","09:00","13:00","14:00"],
    providers: ["maremar"],
  },
  {
    id: 5, category: "Mar", color: "#1A5FA8",
    img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Aluguel de Lancha",
    description: "Lancha exclusiva para passeios privativos. Explore as ilhas e praias mais belas da região com liberdade total e sofisticação.",
    highlight: ["Uso privativo", "Roteiro livre", "Ilhas e praias exclusivas"],
    priceLabel: "A partir de R$ 2.000,00",
    slots: ["08:00","09:00","10:00","13:00","14:00"],
    providers: ["yabu","scalea"],
  },
  {
    id: 6, category: "Mar", color: "#1B6FA8",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Mergulho com Snorkel ou Cilindro",
    description: "Descubra um novo mundo sob as águas cristalinas do litoral. Snorkel para iniciantes ou mergulho com cilindro (batismo ou avançado), com instrutores certificados e equipamentos inclusos.",
    highlight: ["Snorkel para iniciantes", "Cilindro avançado", "Instrutores certificados", "Equipamentos inclusos"],
    priceLabel: "A partir de R$ 450,00",
    slots: ["08:00","09:00","10:00","13:00","14:00","15:00"],
    providers: ["aquaticos","augusto"],
  },
  {
    id: 7, category: "Aventura", color: "#7B9E3E",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Passeios com Guia Local",
    description: "Explore trilhas, praias, cachoeiras e pontos culturais com guias experientes. Roteiros personalizados para além dos tradicionais, com acesso a lugares especiais e histórias únicas da região.",
    highlight: ["Guias locais experientes", "Trilhas & cachoeiras", "Avistamento de aves", "Roteiros exclusivos"],
    priceLabel: "A partir de R$ 390,00 o casal",
    slots: ["06:00","07:00","08:00","15:00","16:00"],
    providers: ["murilowolf"],
  },
  {
    id: 8, category: "Bem-estar", color: "#9B7FBF",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Aulas de Yoga",
    description: "Equilíbrio, conexão e bem-estar durante a estadia. Aulas personalizadas para todos os níveis, individuais ou em grupo, no imóvel ou ao ar livre. Inclui Yoga, Iyengar Yoga e vivências.",
    highlight: ["Todos os níveis", "Individual ou grupo", "No imóvel ou ao ar livre", "Yoga & Iyengar Yoga"],
    priceLabel: "A partir de R$ 195,00",
    slots: ["07:00","08:00","09:00","16:00","17:00","18:00"],
    providers: ["patysharon","gabrieletoth"],
  },
  {
    id: 9, category: "Mar", color: "#5B8FB9",
    img: "https://images.unsplash.com/photo-1501949997128-2fdb9f6428f1?w=800&h=500&fit=crop&auto=format&q=90",
    name: "Caiaque & Stand Up Paddle",
    description: "Conexão com a natureza em um ritmo tranquilo. Explore o mar e praias de caiaque ou SUP. Aulas para iniciantes, aluguel de equipamentos e passeios guiados disponíveis.",
    highlight: ["Aulas para iniciantes", "Aluguel de equipamentos", "Passeios guiados"],
    priceLabel: "R$ 65,00",
    slots: ["08:00","09:00","10:00","14:00","15:00","16:00"],
    providers: ["paddle"],
  },
];

const CATEGORIES = ["Todos", ...Array.from(new Set(SERVICES.map(s => s.category)))];
const TODAY = new Date();
function getNext7Days() {
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(TODAY); d.setDate(TODAY.getDate() + i); return d; });
}
function fmtDate(d) { return d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }); }
function initials(name) { return name.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase(); }

// ─── MERCADO PAGO ─────────────────────────────────────────────────────────────
const MP_PUBLIC_KEY_DEFAULT = "TEST-XXXXXXXXXXXXXXXXXXXX";
async function criarPreferencia({ service, guestName, provider }) {
  await new Promise(r => setTimeout(r, 1400));
  return `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=DEMO_${Date.now()}`;
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --sand: #F5EFE4; --sand2: #EDE3D0; --bark: #7A5C3E; --bark2: #5A3E28;
    --gold: #C9A96E; --gold2: #A8803A; --leaf: #3D8B6F;
    --ink: #2A1F14; --muted: #9E8A72; --white: #FFFDF9;
    --mp: #009EE3; --mp2: #007BBD; --mp-bg: #EAF6FF; --mp-border: #B3E0F7;
    --radius: 16px; --shadow: 0 4px 24px rgba(42,31,20,0.10); --shadow-lg: 0 12px 40px rgba(42,31,20,0.16);
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--sand); color: var(--ink); }
  .app { min-height: 100vh; }

  .banner { background: #FEF9E7; border-bottom: 2px solid #F0C040; padding: 9px 20px; font-size: 13px; color: #7A5A00; text-align: center; }
  .banner strong { font-weight: 600; }
  .banner code { background: rgba(0,0,0,0.07); padding: 1px 6px; border-radius: 4px; font-family: monospace; font-size: 12px; }

  .nav { background: var(--ink); padding: 0 20px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 100; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--gold); font-weight: 500; letter-spacing: 1px; }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab { background: none; border: none; cursor: pointer; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 6px 14px; border-radius: 20px; transition: all .2s; }
  .nav-tab.active { background: var(--gold); color: var(--ink); font-weight: 500; }
  .nav-tab:hover:not(.active) { color: var(--white); }

  /* HERO */
  .guest-hero { background: linear-gradient(160deg, var(--ink) 0%, #3D2B18 100%); padding: 56px 24px 48px; text-align: center; position: relative; overflow: hidden; }
  .guest-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.18) 0%, transparent 70%); }
  .hero-brand { font-size: 11px; letter-spacing: 4px; color: var(--gold); text-transform: uppercase; margin-bottom: 14px; position: relative; opacity: 0.9; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: 42px; color: var(--white); font-weight: 300; line-height: 1.1; margin-bottom: 14px; position: relative; }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 14px; color: #BFB09A; max-width: 340px; margin: 0 auto 20px; line-height: 1.7; position: relative; }
  .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(0,158,227,0.15); border: 1px solid rgba(0,158,227,0.3); border-radius: 20px; padding: 5px 14px; font-size: 12px; color: #7ED5F5; position: relative; }

  /* ABOUT SECTION */
  .about-section { background: var(--white); margin: 24px 20px 0; border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
  .about-inner { padding: 28px 24px; }
  .about-pretitle { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold2); margin-bottom: 8px; font-weight: 500; }
  .about-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 500; color: var(--ink); margin-bottom: 12px; line-height: 1.2; }
  .about-text { font-size: 13px; color: var(--muted); line-height: 1.8; margin-bottom: 20px; }
  .about-pillars { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
  .pillar { background: var(--sand); border-radius: 12px; padding: 16px; text-align: center; }
  .pillar-icon { width: 48px; height: 48px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; box-shadow: 0 2px 8px rgba(42,31,20,0.10); }
  .pillar-label { font-size: 13px; font-weight: 600; color: var(--bark); }
  .pillar-sub { font-size: 11px; color: var(--muted); margin-top: 3px; line-height: 1.4; }

  /* MODAL IMAGE */
  .modal-img-wrap { position: relative; height: 160px; overflow: hidden; }
  .modal-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .modal-img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 20%, rgba(42,31,20,0.7) 100%); }
  .modal-img-title { position: absolute; bottom: 16px; left: 20px; right: 20px; font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 500; color: white; line-height: 1.2; text-shadow: 0 1px 6px rgba(0,0,0,0.4); }
  .modal-img-price { position: absolute; bottom: 16px; right: 20px; background: rgba(42,31,20,0.7); border-radius: 8px; padding: 3px 10px; font-size: 13px; font-weight: 600; color: var(--gold); font-family: 'Cormorant Garamond', serif; }
  .about-divider { height: 3px; background: linear-gradient(90deg, var(--gold) 0%, var(--bark) 100%); }

  /* FILTERS */
  .filter-bar { display: flex; gap: 8px; padding: 20px 20px 4px; overflow-x: auto; scrollbar-width: none; }
  .filter-bar::-webkit-scrollbar { display: none; }
  .filter-btn { white-space: nowrap; border: 1.5px solid var(--sand2); background: var(--white); border-radius: 20px; padding: 6px 16px; font-size: 13px; cursor: pointer; color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .filter-btn.active { background: var(--bark); border-color: var(--bark); color: var(--white); }
  .filter-btn:hover:not(.active) { border-color: var(--gold); color: var(--bark); }

  /* GRID */
  .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; padding: 20px; }

  /* CARD */
  .service-card { background: var(--white); border-radius: var(--radius); overflow: hidden; transition: transform .2s, box-shadow .2s; box-shadow: var(--shadow); display: flex; flex-direction: column; }
  .service-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }

  /* CARD IMAGE COVER */
  .card-img-wrap { position: relative; height: 190px; overflow: hidden; flex-shrink: 0; }
  .card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
  .service-card:hover .card-img { transform: scale(1.06); }
  .card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(42,31,20,0.05) 30%, rgba(42,31,20,0.60) 100%); }
  .card-img-badge { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.93); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--bark); backdrop-filter: blur(6px); }
  .card-img-name { position: absolute; bottom: 14px; left: 14px; right: 14px; font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: white; line-height: 1.2; text-shadow: 0 1px 8px rgba(0,0,0,0.4); }

  .card-body { padding: 16px 20px 0; flex: 1; }
  .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }

  /* PROVIDERS INSIDE CARD */
  .card-providers { border-top: 1px solid var(--sand2); padding-top: 14px; margin-bottom: 14px; }
  .card-providers-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin-bottom: 10px; font-weight: 500; }
  .provider-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--sand2); }
  .provider-row:last-child { border-bottom: none; }
  .provider-avatar { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; overflow: hidden; }
  .provider-avatar img { width: 100%; height: 100%; object-fit: contain; background: white; padding: 4px; }
  .provider-avatar.has-logo { background: white; border: 1.5px solid var(--sand2); }
  .provider-info { flex: 1; min-width: 0; }
  .provider-name { font-size: 13px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .provider-specialty { font-size: 11px; color: var(--muted); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .provider-contacts { display: flex; gap: 6px; flex-shrink: 0; }
  .contact-btn { width: 28px; height: 28px; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: opacity .2s; text-decoration: none; }
  .contact-btn:hover { opacity: 0.75; }
  .contact-wa { background: #25D366; }
  .contact-mail { background: var(--sand2); }

  /* CARD FOOTER */
  .card-footer { padding: 0 20px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .card-price { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: var(--bark2); line-height: 1.2; }
  .btn-book { background: var(--ink); color: var(--white); border: none; border-radius: 10px; padding: 10px 18px; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: background .2s; white-space: nowrap; }
  .btn-book:hover { background: var(--bark2); }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(42,31,20,0.65); z-index: 200; display: flex; align-items: flex-end; justify-content: center; backdrop-filter: blur(4px); animation: fadeIn .2s ease; }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .modal { background: var(--white); border-radius: 24px 24px 0 0; width: 100%; max-width: 600px; max-height: 92vh; overflow-y: auto; animation: slideUp .3s ease; padding-bottom: 110px; }
  @keyframes slideUp { from { transform: translateY(60px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  .modal-handle { width: 40px; height: 4px; background: var(--sand2); border-radius: 2px; margin: 14px auto 0; }
  .modal-header { padding: 20px 24px 0; }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; }
  .modal-sub { font-size: 13px; color: var(--muted); margin-top: 4px; }
  .modal-section { padding: 20px 24px 0; }
  .section-label { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 12px; font-weight: 500; }

  /* PROVIDER SELECT IN MODAL */
  .provider-select-list { display: flex; flex-direction: column; gap: 8px; }
  .provider-select-item { border: 1.5px solid var(--sand2); border-radius: 12px; padding: 12px 14px; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 12px; }
  .provider-select-item:hover { border-color: var(--gold); }
  .provider-select-item.active { border-color: var(--bark); background: #FAF4EC; }
  .provider-select-item .ps-avatar { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; overflow: hidden; }
  .provider-select-item .ps-avatar img { width: 100%; height: 100%; object-fit: contain; background: white; padding: 4px; }
  .provider-select-item .ps-avatar.has-logo { background: white; border: 1.5px solid var(--sand2); }
  .provider-select-item .ps-info { flex: 1; }
  .provider-select-item .ps-name { font-size: 14px; font-weight: 600; color: var(--ink); }
  .provider-select-item .ps-spec { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .provider-select-item .ps-contact { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .check-circle { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--sand2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all .2s; }
  .provider-select-item.active .check-circle { background: var(--bark); border-color: var(--bark); color: white; font-size: 11px; }

  /* DAYS / SLOTS */
  .days-scroll { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
  .days-scroll::-webkit-scrollbar { display: none; }
  .day-btn { flex-shrink: 0; background: var(--white); border: 1.5px solid var(--sand2); border-radius: 12px; padding: 10px 14px; text-align: center; cursor: pointer; transition: all .2s; min-width: 72px; }
  .day-name { font-size: 11px; text-transform: capitalize; color: var(--muted); }
  .day-num { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--ink); }
  .day-btn.active { background: var(--bark); border-color: var(--bark); }
  .day-btn.active .day-name, .day-btn.active .day-num { color: var(--white); }
  .slots-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .slot-btn { background: var(--white); border: 1.5px solid var(--sand2); border-radius: 8px; padding: 8px 16px; font-size: 13px; cursor: pointer; color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .slot-btn.active { background: var(--gold); border-color: var(--gold); color: var(--ink); font-weight: 500; }
  .slot-btn:hover:not(.active) { border-color: var(--gold2); color: var(--bark); }

  .name-input { width: 100%; border: 1.5px solid var(--sand2); border-radius: 10px; padding: 12px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--ink); background: var(--white); outline: none; transition: border .2s; }
  .name-input:focus { border-color: var(--gold); }

  /* MP BOX */
  .mp-box { background: var(--mp-bg); border: 1.5px solid var(--mp-border); border-radius: 14px; padding: 16px; }
  .mp-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .mp-pill { background: var(--mp); color: white; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 4px 10px; border-radius: 6px; }
  .mp-row-text { font-size: 13px; color: #005F8E; font-weight: 500; }
  .mp-methods { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
  .mp-method { display: flex; align-items: center; gap: 5px; background: white; border: 1px solid var(--mp-border); border-radius: 8px; padding: 5px 11px; font-size: 12px; color: #005F8E; }
  .mp-note { font-size: 11px; color: #4A8CA8; line-height: 1.5; }

  /* LOADING */
  .loading-overlay { position: fixed; inset: 0; background: rgba(42,31,20,0.75); z-index: 300; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
  .spinner { width: 46px; height: 46px; border: 3px solid rgba(255,255,255,0.2); border-top-color: var(--mp); border-radius: 50%; animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { color: white; font-size: 14px; font-weight: 500; }

  /* CONFIRM BAR */
  .confirm-bar { position: sticky; bottom: 0; background: var(--white); padding: 14px 24px; border-top: 1px solid var(--sand2); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .confirm-total { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--bark2); white-space: nowrap; line-height: 1.2; }
  .confirm-total small { display: block; font-size: 12px; font-weight: 400; color: var(--muted); font-family: 'DM Sans', sans-serif; }
  .btn-pay { flex: 1; background: var(--mp); color: white; border: none; border-radius: 12px; padding: 14px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: background .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .btn-pay:hover:not(:disabled) { background: var(--mp2); }
  .btn-pay:disabled { background: var(--muted); cursor: not-allowed; }
  .btn-pay .sec { background: rgba(255,255,255,0.22); border-radius: 4px; font-size: 10px; padding: 2px 6px; }

  /* SUCCESS */
  .success-screen { text-align: center; padding: 48px 24px; }
  .success-icon { font-size: 64px; margin-bottom: 16px; }
  .success-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: var(--bark2); margin-bottom: 8px; }
  .success-sub { font-size: 14px; color: var(--muted); line-height: 1.8; }
  .btn-back { margin-top: 24px; background: var(--ink); color: var(--white); border: none; border-radius: 12px; padding: 14px 32px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; }

  /* ADMIN */
  .admin-wrap { padding: 24px; max-width: 900px; margin: 0 auto; }
  .admin-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 500; }
  .admin-sub { font-size: 14px; color: var(--muted); margin-top: 4px; margin-bottom: 24px; }
  .stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; margin-bottom: 28px; }
  .stat-card { background: var(--white); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin-bottom: 8px; }
  .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: var(--ink); }
  .stat-value.green { color: var(--leaf); }
  .stat-value.gold { color: var(--gold2); }
  .stat-value.blue { color: var(--mp2); }
  .stat-value.orange { color: #C05000; }
  .admin-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .admin-tab { background: none; border: 1.5px solid var(--sand2); border-radius: 10px; padding: 8px 18px; font-size: 13px; cursor: pointer; color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .admin-tab.active { background: var(--ink); border-color: var(--ink); color: var(--white); }
  .orders-list { display: flex; flex-direction: column; gap: 12px; }
  .order-card { background: var(--white); border-radius: var(--radius); padding: 18px 20px; box-shadow: var(--shadow); display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .order-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .order-service { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500; }
  .order-detail { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .order-info { flex: 1; min-width: 160px; }
  .order-price { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--bark2); }
  .badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; }
  .badge-pending { background: #FEF3C7; color: #92400E; }
  .badge-confirmed { background: #D1FAE5; color: #065F46; }
  .badge-done { background: #E0E7FF; color: #3730A3; }
  .badge-paid { background: #DBEAFE; color: #1D4ED8; }
  .empty-state { text-align: center; padding: 48px; color: var(--muted); font-size: 14px; }

  /* PROVIDERS ADMIN LIST */
  .provider-admin-card { background: var(--white); border-radius: var(--radius); padding: 18px 20px; box-shadow: var(--shadow); display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .pa-avatar { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: white; flex-shrink: 0; overflow: hidden; }
  .pa-avatar img { width: 100%; height: 100%; object-fit: contain; background: white; padding: 5px; }
  .pa-avatar.has-logo { background: white; border: 1.5px solid var(--sand2); }
  .pa-info { flex: 1; min-width: 160px; }
  .pa-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500; }
  .pa-specialty { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .pa-contacts { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
  .pa-contact { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; }

  /* CONFIG */
  .setup-card { background: var(--white); border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); margin-bottom: 18px; }
  .setup-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; margin-bottom: 6px; }
  .setup-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .lbl { font-size: 12px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 6px; }
  .setup-input { width: 100%; border: 1.5px solid var(--sand2); border-radius: 10px; padding: 12px 14px; font-size: 13px; font-family: monospace; color: var(--ink); background: var(--sand); outline: none; transition: border .2s; }
  .setup-input:focus { border-color: var(--mp); }
  .btn-save { background: var(--mp); color: white; border: none; border-radius: 10px; padding: 10px 22px; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; margin-top: 10px; transition: background .2s; }
  .btn-save:hover { background: var(--mp2); }
  .steps { list-style: none; counter-reset: steps; }
  .steps li { counter-increment: steps; display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--sand2); font-size: 13px; color: var(--muted); line-height: 1.5; }
  .steps li::before { content: counter(steps); background: var(--mp); color: white; border-radius: 50%; width: 22px; height: 22px; min-width: 22px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; margin-top: 1px; }
  .steps li a { color: var(--mp); text-decoration: none; }

  /* CARD HIGHLIGHTS */
  .card-highlights { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
  .highlight-tag { background: var(--sand); border-radius: 6px; padding: 3px 9px; font-size: 11px; color: var(--bark); font-weight: 500; }

  /* FOOTER */
  .company-footer { background: var(--ink); padding: 36px 24px; text-align: center; margin-top: 8px; }
  .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 26px; color: var(--gold); font-weight: 400; letter-spacing: 1px; margin-bottom: 8px; }
  .footer-tagline { font-size: 13px; color: #BFB09A; line-height: 1.6; max-width: 320px; margin: 0 auto 20px; }
  .footer-divider { width: 48px; height: 2px; background: var(--gold); margin: 16px auto; border-radius: 1px; }
  .footer-copy { font-size: 11px; color: var(--muted); letter-spacing: 1px; }
`;

// ─── CORES DOS AVATARES ───────────────────────────────────────────────────────
const AVATAR_COLORS = ["#7A5C3E","#2B7FBF","#3D8B6F","#C9A96E","#D4788A","#9B7FBF","#E07A5F","#1B6FA8","#7B9E3E","#5B8FB9","#A8803A","#3D8B6F","#C9A96E"];
function avatarColor(key) { let h = 0; for (let c of key) h = (h * 31 + c.charCodeAt(0)) % AVATAR_COLORS.length; return AVATAR_COLORS[h]; }

// ─── MOCK ORDERS ──────────────────────────────────────────────────────────────
const INIT_ORDERS = [
  { id: 1, service: "Massagem", guest: "Ana Lima", provider: "Tatiane Unic", date: "16/04", time: "15:00", price: 260, status: "paid", icon: "🧖", color: "#C9A96E" },
  { id: 2, service: "Personal Chef", guest: "Carlos Mendes", provider: "Beatriz Tumoli", date: "16/04", time: "20:00", price: 585, status: "pending", icon: "👨‍🍳", color: "#E07A5F" },
  { id: 3, service: "Passeio de Lanchinha", guest: "Fernanda Costa", provider: "MareMar", date: "17/04", time: "09:00", price: 290, status: "confirmed", icon: "⛵", color: "#2B7FBF" },
  { id: 4, service: "Mergulho", guest: "Rafael Souza", provider: "Aquáticos Ilhabela", date: "17/04", time: "08:00", price: 450, status: "paid", icon: "🤿", color: "#1B6FA8" },
];

const STATUS_LABELS = { pending: "Pendente", confirmed: "Confirmado", done: "Concluído", paid: "Pago ✓" };
const STATUS_CLASS  = { pending: "badge-pending", confirmed: "badge-confirmed", done: "badge-done", paid: "badge-paid" };

// ─── GUEST VIEW ───────────────────────────────────────────────────────────────
function GuestView({ onBook }) {
  const [cat, setCat] = useState("Todos");
  const filtered = cat === "Todos" ? SERVICES : SERVICES.filter(s => s.category === cat);

  return (
    <div>
      <div className="guest-hero">
        <div className="hero-brand">BNB Experiences</div>
        <div className="hero-title">Experiências <em>Exclusivas</em><br />para Hóspedes</div>
        <div className="hero-sub">Viajar vai muito além de se hospedar. Escolha seu serviço, o profissional e agende com conforto, praticidade e sofisticação.</div>
        <div className="hero-badge">🔒 Pagamento seguro · PIX · Crédito · Débito</div>
      </div>

      <div className="about-section">
        <div className="about-divider" />
        <div className="about-inner">
          <div className="about-pretitle">Quem somos</div>
          <div className="about-title">Transformamos estadias em momentos únicos</div>
          <div className="about-text">
            Na BNB Experiences, cada detalhe é pensado para que você aproveite ao máximo seu tempo. Oferecemos serviços personalizados — de massagens e personal chef a passeios e aulas — tudo com conforto e exclusividade, diretamente na sua hospedagem. Nosso compromisso é proporcionar experiências que realmente marcam.
          </div>
          <div className="about-pillars">
            {[
              {
                svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A5C3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
                label: "Exclusividade", sub: "Serviços personalizados para você"
              },
              {
                svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A5C3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                label: "Segurança", sub: "Profissionais verificados"
              },
              {
                svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A5C3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                label: "Comodidade", sub: "Tudo no seu espaço"
              },
              {
                svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A5C3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
                label: "Sofisticação", sub: "Experiências que marcam"
              },
            ].map(p => (
              <div key={p.label} className="pillar">
                <div className="pillar-icon">{p.svg}</div>
                <div className="pillar-label">{p.label}</div>
                <div className="pillar-sub">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-bar">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="services-grid">
        {filtered.map(s => {
          const provs = s.providers.map(k => ({ key: k, ...PROVIDERS[k] }));
          return (
            <div key={s.id} className="service-card">
              {/* IMAGEM DE CAPA */}
              <div className="card-img-wrap">
                <img className="card-img" src={s.img} alt={s.name} loading="lazy" />
                <div className="card-img-overlay" />
                <div className="card-img-badge">{s.category}</div>
                <div className="card-img-name">{s.name}</div>
              </div>
              <div className="card-body">
                <div className="card-desc">{s.description}</div>
                {s.highlight && (
                  <div className="card-highlights">
                    {s.highlight.map(h => <span key={h} className="highlight-tag">✓ {h}</span>)}
                  </div>
                )}

                {/* FORNECEDORES */}
                <div className="card-providers">
                  <div className="card-providers-label">
                    {provs.length === 1 ? "Profissional" : "Profissionais disponíveis"}
                  </div>
                  {provs.map(p => (
                    <div key={p.key} className="provider-row">
                      <div className={`provider-avatar${p.logo ? " has-logo" : ""}`} style={p.logo ? {} : { background: avatarColor(p.key) }}>
                        {p.logo ? <img src={p.logo} alt={p.name} /> : initials(p.name)}
                      </div>
                      <div className="provider-info">
                        <div className="provider-name">{p.name}</div>
                        <div className="provider-specialty">{p.specialty}</div>
                      </div>
                      <div className="provider-contacts">
                        <a
                          className="contact-btn contact-wa"
                          href={`https://wa.me/55${p.phone.replace(/\D/g,"")}`}
                          target="_blank"
                          title={`WhatsApp ${p.name}`}
                          onClick={e => e.stopPropagation()}
                        >📱</a>
                        {p.email && (
                          <a
                            className="contact-btn contact-mail"
                            href={`mailto:${p.email}`}
                            title={`E-mail ${p.name}`}
                            onClick={e => e.stopPropagation()}
                          >✉️</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer">
                <div className="card-price">{s.priceLabel}</div>
                <button className="btn-book" onClick={() => onBook(s)}>Agendar</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* RODAPÉ DA EMPRESA */}
      <div className="company-footer">
        <div className="footer-brand">BNB Experiences</div>
        <div className="footer-tagline">Viva mais do que uma estadia. Cada detalhe pensado para você aproveitar ao máximo seu tempo.</div>
        <div className="footer-divider" />
        <div className="footer-copy">© {new Date().getFullYear()} BNB Experiences · Todos os direitos reservados</div>
      </div>
    </div>
  );
}
function BookingModal({ service, onClose, onConfirm }) {
  const days = getNext7Days();
  const provs = service.providers.map(k => ({ key: k, ...PROVIDERS[k] }));
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(provs.length === 1 ? provs[0] : null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canPay = slot && guestName.trim() && selectedProvider;

  async function handlePay() {
    if (!canPay) return;
    setLoading(true);
    try {
      await criarPreferencia({ service, guestName, provider: selectedProvider });
      onConfirm({ service, day: days[day], slot, guestName, provider: selectedProvider });
      setSuccess(true);
    } catch {
      alert("Erro ao iniciar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="success-screen">
          <div className="success-icon">🎉</div>
          <div className="success-title">Agendado com sucesso!</div>
          <div className="success-sub">
            <strong>{service.name}</strong><br />
            Profissional: {selectedProvider.name}<br />
            {fmtDate(days[day])} às {slot}<br />
            Pagamento via Mercado Pago ✓<br /><br />
            Obrigado, {guestName.split(" ")[0]}!<br />
            Entraremos em contato em breve.
          </div>
          <button className="btn-back" onClick={onClose}>Voltar aos serviços</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <div className="loading-text">Preparando checkout seguro...</div>
        </div>
      )}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-handle" />
          {/* IMAGEM DO SERVIÇO */}
          {service.img && (
            <div className="modal-img-wrap">
              <img className="modal-img" src={service.img} alt={service.name} />
              <div className="modal-img-overlay" />
              <div className="modal-img-title">{service.name}</div>
            </div>
          )}
          <div className="modal-header" style={{ paddingTop: service.img ? 16 : 20 }}>
            <div className="modal-sub">{service.priceLabel}</div>
          </div>

          {/* ESCOLHA DO PROFISSIONAL */}
          {provs.length > 1 && (
            <div className="modal-section">
              <div className="section-label">Escolha o profissional</div>
              <div className="provider-select-list">
                {provs.map(p => (
                  <div
                    key={p.key}
                    className={`provider-select-item ${selectedProvider?.key === p.key ? "active" : ""}`}
                    onClick={() => setSelectedProvider(p)}
                  >
                    <div className={`ps-avatar${p.logo ? " has-logo" : ""}`} style={p.logo ? {} : { background: avatarColor(p.key) }}>
                        {p.logo ? <img src={p.logo} alt={p.name} /> : initials(p.name)}
                      </div>
                    <div className="ps-info">
                      <div className="ps-name">{p.name}</div>
                      <div className="ps-spec">{p.specialty}</div>
                      <div className="ps-contact">📱 {p.phone}{p.email ? ` · ✉️ ${p.email}` : ""}</div>
                    </div>
                    <div className="check-circle">{selectedProvider?.key === p.key ? "✓" : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {provs.length === 1 && (
            <div className="modal-section">
              <div className="section-label">Profissional</div>
              <div className="provider-select-item active" style={{ cursor: "default" }}>
                <div className={`ps-avatar${provs[0].logo ? " has-logo" : ""}`} style={provs[0].logo ? {} : { background: avatarColor(provs[0].key) }}>
                  {provs[0].logo ? <img src={provs[0].logo} alt={provs[0].name} /> : initials(provs[0].name)}
                </div>
                <div className="ps-info">
                  <div className="ps-name">{provs[0].name}</div>
                  <div className="ps-spec">{provs[0].specialty}</div>
                  <div className="ps-contact">📱 {provs[0].phone}{provs[0].email ? ` · ✉️ ${provs[0].email}` : ""}</div>
                </div>
                <div className="check-circle" style={{ background: "var(--bark)", borderColor: "var(--bark)", color: "white", fontSize: 11 }}>✓</div>
              </div>
            </div>
          )}

          <div className="modal-section">
            <div className="section-label">Seu nome</div>
            <input className="name-input" placeholder="Como prefere ser chamado?" value={guestName} onChange={e => setGuestName(e.target.value)} />
          </div>

          <div className="modal-section">
            <div className="section-label">Dia</div>
            <div className="days-scroll">
              {days.map((d, i) => (
                <div key={i} className={`day-btn ${day === i ? "active" : ""}`} onClick={() => { setDay(i); setSlot(null); }}>
                  <div className="day-name">{d.toLocaleDateString("pt-BR", { weekday: "short" })}</div>
                  <div className="day-num">{d.getDate()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="section-label">Horário</div>
            <div className="slots-grid">
              {service.slots.map(s => (
                <button key={s} className={`slot-btn ${slot === s ? "active" : ""}`} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="section-label">Pagamento</div>
            <div className="mp-box">
              <div className="mp-row">
                <span className="mp-pill">MP</span>
                <span className="mp-row-text">Mercado Pago — Ambiente 100% seguro</span>
              </div>
              <div className="mp-methods">
                <div className="mp-method">💸 PIX</div>
                <div className="mp-method">💳 Crédito</div>
                <div className="mp-method">🏦 Débito</div>
                <div className="mp-method">📱 App MP</div>
              </div>
              <div className="mp-note">Após confirmar, você será direcionado ao checkout seguro do Mercado Pago. O agendamento é confirmado automaticamente após o pagamento.</div>
            </div>
          </div>

          <div className="confirm-bar">
            <div className="confirm-total">
              {service.priceLabel}
              <small>por pessoa</small>
            </div>
            <button className="btn-pay" disabled={!canPay} onClick={handlePay}>
              {canPay
                ? <><span>Pagar com Mercado Pago</span><span className="sec">SEGURO</span></>
                : "Preencha os campos"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminView({ orders, setOrders, mpKey, setMpKey }) {
  const [tab, setTab] = useState("orders");
  const [keyInput, setKeyInput] = useState(mpKey);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    paid: orders.filter(o => o.status === "paid").length,
    revenue: orders.filter(o => o.status === "paid").reduce((a, o) => a + o.price, 0),
  };

  function changeStatus(id, s) { setOrders(p => p.map(o => o.id === id ? { ...o, status: s } : o)); }

  const allProviders = Object.entries(PROVIDERS).map(([key, p]) => ({ key, ...p }));

  return (
    <div className="admin-wrap">
      <div className="admin-title">Painel Administrativo</div>
      <div className="admin-sub">Gerencie agendamentos, fornecedores e configurações</div>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Total Pedidos</div><div className="stat-value">{stats.total}</div></div>
        <div className="stat-card"><div className="stat-label">Pendentes</div><div className="stat-value orange">{stats.pending}</div></div>
        <div className="stat-card"><div className="stat-label">Pagos</div><div className="stat-value blue">{stats.paid}</div></div>
        <div className="stat-card"><div className="stat-label">Receita</div><div className="stat-value gold">R$ {stats.revenue}</div></div>
        <div className="stat-card"><div className="stat-label">Fornecedores</div><div className="stat-value green">{allProviders.length}</div></div>
      </div>

      <div className="admin-tabs">
        {[["orders","Agendamentos"],["providers","Fornecedores"],["services","Serviços"],["config","⚙ Mercado Pago"]].map(([id, label]) => (
          <button key={id} className={`admin-tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="orders-list">
          {orders.length === 0 && <div className="empty-state">Nenhum agendamento ainda.</div>}
          {orders.map(o => (
            <div key={o.id} className="order-card">
              <div className="order-icon" style={{ background: o.color + "22" }}>{o.icon}</div>
              <div className="order-info">
                <div className="order-service">{o.service}</div>
                <div className="order-detail">👤 {o.guest} · 🧑‍💼 {o.provider} · 📅 {o.date} às {o.time}</div>
              </div>
              <div className="order-price">R$ {o.price}</div>
              <span className={`badge ${STATUS_CLASS[o.status]}`}>{STATUS_LABELS[o.status]}</span>
              {o.status === "pending" && <button className="btn-book" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => changeStatus(o.id, "confirmed")}>Confirmar</button>}
              {o.status === "confirmed" && <button className="btn-book" style={{ fontSize: 12, padding: "7px 14px", background: "var(--leaf)" }} onClick={() => changeStatus(o.id, "done")}>Concluir</button>}
            </div>
          ))}
        </div>
      )}

      {tab === "providers" && (
        <div className="orders-list">
          {allProviders.map(p => (
            <div key={p.key} className="provider-admin-card">
              <div className={`pa-avatar${p.logo ? " has-logo" : ""}`} style={p.logo ? {} : { background: avatarColor(p.key) }}>
                {p.logo ? <img src={p.logo} alt={p.name} /> : initials(p.name)}
              </div>
              <div className="pa-info">
                <div className="pa-name">{p.name}</div>
                <div className="pa-specialty">{p.specialty}</div>
                <div className="pa-contacts">
                  <span className="pa-contact">📱 {p.phone}</span>
                  {p.email && <span className="pa-contact">✉️ {p.email}</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a className="contact-btn contact-wa" href={`https://wa.me/55${p.phone.replace(/\D/g,"")}`} target="_blank" title="WhatsApp" style={{ width: 36, height: 36, borderRadius: 10, fontSize: 16 }}>📱</a>
                {p.email && <a className="contact-btn contact-mail" href={`mailto:${p.email}`} title="E-mail" style={{ width: 36, height: 36, borderRadius: 10, fontSize: 16 }}>✉️</a>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="orders-list">
          {SERVICES.map(s => (
            <div key={s.id} className="order-card">
              <div className="order-icon" style={{ background: s.color + "22" }}>{s.icon}</div>
              <div className="order-info">
                <div className="order-service">{s.name}</div>
                <div className="order-detail">📂 {s.category} · {s.providers.length} fornecedor(es) · {s.slots.length} horários</div>
              </div>
              <div className="order-price" style={{ fontSize: 14 }}>{s.priceLabel}</div>
              <span className="badge badge-confirmed">Ativo</span>
            </div>
          ))}
        </div>
      )}

      {tab === "config" && (
        <>
          <div className="setup-card">
            <div className="setup-title">🔑 Credenciais — Mercado Pago</div>
            <div className="setup-desc">Cole sua <strong>Public Key</strong> abaixo. A <strong>Access Token</strong> deve ficar somente no backend.</div>
            <label className="lbl">Public Key</label>
            <input className="setup-input" placeholder="TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={keyInput} onChange={e => setKeyInput(e.target.value)} />
            <button className="btn-save" onClick={() => setMpKey(keyInput)}>Salvar chave</button>
          </div>
          <div className="setup-card">
            <div className="setup-title">🚀 Como ativar pagamentos reais</div>
            <ul className="steps">
              <li>Acesse o <a href="https://www.mercadopago.com.br/developers/panel/app" target="_blank">Painel de Desenvolvedores</a> do MP e crie um app para obter as credenciais.</li>
              <li>No backend, instale o SDK: <code style={{fontFamily:"monospace",background:"#eee",padding:"1px 5px",borderRadius:3}}>npm install mercadopago</code> e crie um endpoint <code style={{fontFamily:"monospace",background:"#eee",padding:"1px 5px",borderRadius:3}}>POST /api/preferencia</code>.</li>
              <li>O endpoint deve receber os dados do serviço e retornar o <code style={{fontFamily:"monospace",background:"#eee",padding:"1px 5px",borderRadius:3}}>init_point</code> — a URL de checkout.</li>
              <li>No app, substitua <code style={{fontFamily:"monospace",background:"#eee",padding:"1px 5px",borderRadius:3}}>criarPreferencia()</code> para chamar seu backend e redirecionar com <code style={{fontFamily:"monospace",background:"#eee",padding:"1px 5px",borderRadius:3}}>window.location.href</code>.</li>
              <li>Configure <strong>Webhooks</strong> no painel do MP para receber confirmações de pagamento em tempo real.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("guest");
  const [booking, setBooking] = useState(null);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [mpKey, setMpKey] = useState(MP_PUBLIC_KEY_DEFAULT);

  const isConfigured = mpKey && !mpKey.startsWith("TEST-XXX");

  function handleConfirm({ service, day, slot, guestName, provider }) {
    setOrders(prev => [{
      id: Date.now(),
      service: service.name,
      guest: guestName,
      provider: provider.name,
      date: `${String(day.getDate()).padStart(2,"0")}/${String(day.getMonth()+1).padStart(2,"0")}`,
      time: slot,
      price: 0,
      status: "paid",
      icon: service.icon,
      color: service.color,
    }, ...prev]);
  }

  return (
    <div className="app">
      <style>{css}</style>
      {!isConfigured && (
        <div className="banner">
          ⚠️ <strong>Modo demo</strong> — Para pagamentos reais, vá em <strong>Admin → ⚙ Mercado Pago</strong> e insira sua <code>Public Key</code>.
        </div>
      )}
      <nav className="nav">
        <div className="nav-logo">SuíteServices</div>
        <div className="nav-tabs">
          <button className={`nav-tab ${view === "guest" ? "active" : ""}`} onClick={() => setView("guest")}>🏖 Hóspede</button>
          <button className={`nav-tab ${view === "admin" ? "active" : ""}`} onClick={() => setView("admin")}>⚙️ Admin</button>
        </div>
      </nav>

      {view === "guest" && <GuestView onBook={setBooking} />}
      {view === "admin" && <AdminView orders={orders} setOrders={setOrders} mpKey={mpKey} setMpKey={setMpKey} />}

      {booking && (
        <BookingModal
          service={booking}
          onClose={() => setBooking(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
