"use client";

import { useState, useCallback } from "react";
import { Check, ChevronLeft, ChevronRight, Clock, Plus, X, Info } from "lucide-react";
import { servicios, categorias } from "@/data/servicios";
import { empleados } from "@/data/empleados";

// --- helpers ---
function parseMin(duracion: string): number {
  const m = duracion.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*(min|h)/i);
  if (!m) return 60;
  const n1 = Math.ceil(parseFloat(m[1]));
  const n2 = m[2] ? Math.ceil(parseFloat(m[2])) : n1;
  const u = m[3].toLowerCase();
  return u === "h" ? n2 * 60 : n2;
}

function fmtHoras(n: number): string {
  if (n < 1) return `${Math.round(n * 60)} min`;
  const h = Math.floor(n);
  const m = Math.round((n - h) * 60);
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function totalMin(ids: string[]): number {
  return ids.reduce((a, id) => {
    const s = servicios.find(x => x.id === id);
    return a + (s ? parseMin(s.duracion) : 0);
  }, 0);
}

function totalMinBuf(ids: string[], buf = 15): number {
  return ids.length < 2 ? totalMin(ids) : totalMin(ids) + (ids.length - 1) * buf;
}

function hrsDisp(empId: string, fecha: string): number {
  const e = empleados.find(x => x.id === empId);
  if (!e || !fecha) return 0;
  const d = new Date(fecha + "T12:00:00");
  const dias = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
  const h = e.horario?.[dias[d.getDay()]];
  if (!h) return 0;
  const [sh,sm]=h.inicio.split(":").map(Number);
  const [eh,em]=h.fin.split(":").map(Number);
  return (eh*60+em-sh*60-sm)/60;
}

const catToEsp: Record<string,string[]> = {
  "Cabello":["Corte","Color","Extensiones","Trenzas","Crochet","Peinados","Supervisión"],
  "Uñas":["Manicura","Pedicura","Supervisión"],
  "Pestañas y Cejas":["Pestañas","Supervisión"],
  "Faciales":["Faciales","Supervisión"],
  "Masajes y Cuerpo":["Masajes","Reducción Corporal","Reafirmante","Maderoterapia","Drenajes Linfáticos","Aparatología","Supervisión"],
  "Depilación":["Depilación","Supervisión"],
};

const diaN = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
const diaCap = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const steps = ["Servicios","Empleada","Fecha & Hora","Tus Datos","Pago"];

const upsells = [
  {id:"express-facial",nombre:"Facial Express 15min",precio:25,desc:"Limpieza rápida + hidratación"},
  {id:"masaje-cuello",nombre:"Masaje Cuello y Hombros 10min",precio:20,desc:"Relajación adicional"},
  {id:"brillo-labial",nombre:"Brillo Labial Profesional",precio:15,desc:"Hidratación y brillo natural"},
  {id:"exfoliacion-manos",nombre:"Exfoliación de Manos",precio:18,desc:"Suavidad y renovación"},
  {id:"mascarilla-capilar",nombre:"Mascarilla Capilar Express",precio:22,desc:"Hidratación intensiva"},
  {id:"aromatherapy",nombre:"Aromaterapia (Difusor + Aceite)",precio:12,desc:"Experiencia sensorial adicional"},
];

type FD = {
  servicios: string[];
  empleado: string;
  fecha: string;
  hora: string;
  nombre: string;
  telefono: string;
  email: string;
  metodoPago: "ath" | "tarjeta" | null;
  upsells: string[];
  comprobante: File | null;
};

export default function BookingWizard() {
  const [step,setStep] = useState(0);
  const [f,setF] = useState<FD>({servicios:[],empleado:"",fecha:"",hora:"",nombre:"",telefono:"",email:"",metodoPago:null,upsells:[],comprobante:null});
  const [confirmed,setConfirmed] = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [showSplit,setShowSplit] = useState(false);

  const selSvcs = servicios.filter(s => f.servicios.includes(s.id));
  const selEmp = empleados.find(e => e.id === f.empleado);
  const totMin = totalMinBuf(f.servicios,15);
  const totH = totMin / 60;

  // service toggle — also resets employee/date/time
  const toggleSvc = (id: string) => {
    setF(p => {
      const next = p.servicios.includes(id)
        ? p.servicios.filter(x => x !== id)
        : [...p.servicios, id];
      return { ...p, servicios: next, empleado: "", fecha: "", hora: "" };
    });
  };
  const removeSvc = (id: string) => {
    setF(p => {
      const next = p.servicios.filter(x => x !== id);
      return { ...p, servicios: next, empleado: "", fecha: "", hora: "" };
    });
  };

  // filtered employees (must match ALL categories)
  const empsFilt = f.servicios.length > 0
    ? empleados.filter(emp => {
        const cats = [...new Set(selSvcs.map(s => s.categoria))];
        return cats.every(c => (catToEsp[c]||[]).some(esp => emp.especialidades.includes(esp)));
      })
    : empleados;

  // days info
  const getDias = useCallback((eid: string) => {
    const emp = empleados.find(x => x.id === eid);
    if (!emp || totMin === 0) return [];
    const hoy = new Date();
    const r: {fs:string;dn:string;hd:number;ok:boolean}[] = [];
    for (let i = 1; i <= 30; i++) {
      const d = new Date(hoy);
      d.setDate(d.getDate() + i);
      const di = diaN[d.getDay()];
      const hh = emp.horario?.[di];
      if (!hh) continue;
      const [sh,sm]=hh.inicio.split(":").map(Number);
      const [eh,em]=hh.fin.split(":").map(Number);
      const hd = (eh*60+em-sh*60-sm)/60;
      r.push({
        fs: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,
        dn: diaCap[d.getDay()],
        hd: Math.round(hd*10)/10,
        ok: hd*60 >= totMin,
      });
    }
    return r;
  }, [totMin]);

  const diasInfo = f.empleado ? getDias(f.empleado) : [];

  // slots
  const getSlots = useCallback((eid: string, fecha: string) => {
    const emp = empleados.find(x => x.id === eid);
    if (!emp || !fecha || totMin === 0) return [];
    const d = new Date(fecha+"T12:00:00");
    const di = diaN[d.getDay()];
    const hh = emp.horario?.[di];
    if (!hh) return [];
    const [sh,sm]=hh.inicio.split(":").map(Number);
    const [eh,em]=hh.fin.split(":").map(Number);
    const start = sh*60+sm, end = eh*60+em;
    const sl: string[] = [];
    for (let m = start; m+totMin <= end; m += 30) {
      const h = Math.floor(m/60), mn = m%60;
      const ap = h>=12?"PM":"AM";
      const h12 = h>12?h-12:(h===0?12:h);
      sl.push(`${h12}:${mn===0?"00":String(mn)} ${ap}`);
    }
    return sl;
  }, [totMin]);

  const upd = (field: keyof FD, val: string|string[]) => setF(p => ({...p,[field]:val}));
  const toggleUp = (id: string) => setF(p => ({...p, upsells: p.upsells.includes(id) ? p.upsells.filter(x=>x!==id) : [...p.upsells,id]}));

  const selUp = upsells.filter(u => f.upsells.includes(u.id));
  const upTotal = selUp.reduce((a,u)=>a+u.precio,0);
  const svcTotal = selSvcs.reduce((a,s)=>a+s.precioDesde,0);
  const grandTotal = svcTotal + upTotal;

  const next = () => setStep(s => Math.min(s+1,steps.length-1));
  const prev = () => setStep(s => Math.max(s-1,0));
  const canGo = () => {
    switch(step) {
      case 0: return f.servicios.length > 0;
      case 1: return !!f.empleado;
      case 2: return !!f.fecha && !!f.hora;
      case 3: return !!f.nombre && !!f.telefono && !!f.email;
      case 4: return !!f.metodoPago;
      default: return false;
    }
  };

  const confirm = async () => {
    setSubmitting(true);
    try {
      const r = await fetch("/api/reservar", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          servicios: selSvcs.map(s=>s.nombre),
          servicioIds: f.servicios,
          empleado: selEmp?.nombre,
          empleadoId: f.empleado,
          fecha: f.fecha,
          hora: f.hora,
          duracionTotal: totH,
          nombre: f.nombre,
          telefono: f.telefono,
          email: f.email,
          metodoPago: f.metodoPago,
          upsells: selUp.map(u=>u.nombre),
          total: grandTotal,
          categorias: [...new Set(selSvcs.map(s=>s.categoria))],
        }),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.error || "Error");
      setConfirmed(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      alert(msg ? `Error: ${msg}` : "Error al procesar tu reserva. Llámanos al (787) 907-8229.");
    } finally { setSubmitting(false); }
  };

  const hoy = new Date().toISOString().split("T")[0];

  // ===================== CONFIRMED VIEW =====================
  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">¡Reserva Confirmada!</h2>
        <p className="text-gray-500 mb-4">Te hemos enviado un resumen a <strong>{f.email}</strong>.</p>
        <p className="text-gray-400 text-sm mb-8">{selEmp?.nombre} ha sido notificada y te estará esperando.</p>
        <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-400">Servicios</span><span className="font-medium">{selSvcs.map(s=>s.nombre).join(", ")}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Especialista</span><span className="font-medium">{selEmp?.nombre}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Duración</span><span className="font-medium">{fmtHoras(totH)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Fecha</span><span className="font-medium">{f.fecha} — {f.hora}</span></div>
            {selUp.length>0 && <div className="flex justify-between text-sm"><span className="text-gray-400">Extras</span><span className="font-medium">+${upTotal}</span></div>}
            <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span className="text-[#C9A96E]">${grandTotal}</span></div>
          </div>
        </div>
        <a href="/" className="text-[#C9A96E] hover:text-[#B8955A] text-sm font-semibold">Volver al inicio</a>
      </div>
    );
  }

  // ===================== WIZARD =====================
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          {steps.map((s,i)=>(
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i<=step?"bg-[#C9A96E] text-white":"bg-gray-200 text-gray-400"}`}>
                {i<step?<Check size={14}/>:i+1}
              </div>
              {i<steps.length-1 && <div className={`w-12 sm:w-20 h-0.5 mx-1 sm:mx-2 transition-all ${i<step?"bg-[#C9A96E]":"bg-gray-200"}`}/>}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 font-medium">{steps[step]}</p>
      </div>

      {/* ======================= STEP 0: SERVICES ======================= */}
      {step===0 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2 text-center">Elige tus servicios</h3>
          <p className="text-center text-sm text-gray-400 mb-6">Puedes seleccionar varios servicios. El tiempo total se calculará automáticamente.</p>

          {f.servicios.length>0 && (
            <div className="bg-[#FFF8F0] rounded-xl p-4 mb-6 border border-[#C9A96E]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1A1A1A]">Seleccionados ({f.servicios.length})</span>
                <span className="text-sm font-bold text-[#C9A96E]">${svcTotal}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selSvcs.map(s=>(
                  <span key={s.id} className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
                    {s.nombre}
                    <button onClick={()=>removeSvc(s.id)} className="text-gray-300 hover:text-red-400"><X size={12}/></button>
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400">
                <span className="font-medium text-gray-500">Tiempo total:</span> {fmtHoras(totH)} {f.servicios.length>1 && "(con 15 min entre servicios)"}
              </div>
            </div>
          )}

          <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2">
            {categorias.map(cat=>{
              const cs = servicios.filter(s=>s.categoria===cat);
              return (
                <div key={cat}>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{cat}</h4>
                  <div className="space-y-2">
                    {cs.map(s=>{
                      const sel = f.servicios.includes(s.id);
                      return (
                        <button key={s.id} onClick={()=>toggleSvc(s.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${sel?"border-[#C9A96E] bg-[#FFF8F0]":"border-gray-200 hover:border-gray-300"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${sel?"border-[#C9A96E] bg-[#C9A96E]":"border-gray-300"}`}>
                              {sel && <Check size={12} className="text-white"/>}
                            </div>
                            <div>
                              <div className="font-medium text-sm text-[#1A1A1A]">{s.nombre}</div>
                              <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={12}/> {s.duracion}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#C9A96E]">${s.precioDesde}</div>
                            {s.depositoPorcentaje>0 && <div className="text-xs text-gray-400">dep. ${Math.round(s.precioDesde*s.depositoPorcentaje/100)}</div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= STEP 1: EMPLOYEE ======================= */}
      {step===1 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2 text-center">Elige tu especialista</h3>
          <p className="text-center text-sm text-gray-400 mb-6">Tiempo total: <strong>{fmtHoras(totH)}</strong></p>
          {selSvcs.length>0 && (
            <div className="bg-[#FFF8F0] p-3 rounded-xl mb-4 text-sm text-center text-gray-600">
              Servicios: <strong>{selSvcs.map(s=>s.nombre).join(", ")}</strong>
            </div>
          )}
          <div className="grid gap-4">
            {empsFilt.length===0 && <p className="text-center text-gray-400 py-8">No hay especialistas para esta combinación de servicios.</p>}
            {empsFilt.map(emp=>(
              <button key={emp.id} onClick={() => setF(p=>({...p,empleado:emp.id,fecha:"",hora:""}))}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${f.empleado===emp.id?"border-[#C9A96E] bg-[#FFF8F0]":"border-gray-200 hover:border-gray-300"}`}>
                <div className="w-14 h-14 rounded-full gradient-dark overflow-hidden shrink-0">
                  <img src={emp.foto} alt={emp.nombre} className="w-full h-full object-cover"
                    onError={e=>{
                      const t=e.target as HTMLElement;t.style.display="none";
                      const p=t.parentElement;if(p){const sp=document.createElement("span");sp.className="font-playfair text-lg text-[#C9A96E] font-bold flex items-center justify-center w-full h-full";sp.textContent=`${emp.nombre.split(" ")[0][0]}${emp.nombre.split(" ")[1][0]}`;p.appendChild(sp);}
                    }}/>
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-sm text-[#1A1A1A]">{emp.nombre}</div>
                  <div className="text-xs text-gray-400">{emp.rol}</div>
                  <div className="flex flex-wrap gap-1 mt-1">{emp.especialidades.slice(0,4).map(e=><span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{e}</span>)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ======================= STEP 2: DATE & TIME ======================= */}
      {step===2 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2 text-center">Elige fecha y hora</h3>
          <p className="text-center text-sm text-gray-400 mb-6">
            Tiempo necesario: <strong>{fmtHoras(totH)}</strong>
            {selEmp && ` — ${selEmp.nombre}`}
          </p>

          {f.empleado && f.servicios.length>0 && (
            <div className="mb-6">
              {(()=>{
                const okDias = diasInfo.filter(d=>d.ok);
                if (okDias.length===0) {
                  return (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                      <div className="flex gap-2">
                        <Info size={18} className="shrink-0 mt-0.5"/>
                        <div>
                          <p className="font-semibold mb-1">Sin días con suficientes horas</p>
                          <p className="text-xs text-amber-600">No hay días en los próximos 30 días con {fmtHoras(totH)} disponibles para {selEmp?.nombre}. Puedes separar los servicios en diferentes días o llamarnos al <strong>(787) 907-8229</strong>.</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <>
                    <div className="bg-[#FFF8F0] border border-[#C9A96E]/30 rounded-xl p-4 mb-4">
                      <div className="flex gap-2 mb-3">
                        <Info size={18} className="text-[#C9A96E] shrink-0 mt-0.5"/>
                        <div>
                          <p className="text-sm font-semibold text-[#1A1A1A]">Días con {fmtHoras(totH)} disponibles</p>
                          <p className="text-xs text-gray-400">Solo se muestran días con tiempo completo para todos tus servicios.</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {okDias.slice(0,7).map(d=>{
                          const dd = new Date(d.fs+"T12:00:00");
                          return (
                            <button key={d.fs} onClick={()=>setF(p=>({...p,fecha:d.fs,hora:""}))}
                              className={`flex flex-col items-center px-3 py-2 rounded-xl border transition-all ${f.fecha===d.fs?"border-[#C9A96E] bg-white text-[#C9A96E]":"border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
                              <span className="text-[10px] uppercase">{dd.toLocaleDateString("es",{month:"short"})}</span>
                              <span className="text-lg font-bold">{dd.getDate()}</span>
                              <span className="text-[10px]">{d.dn.slice(0,3)}</span>
                              <span className="text-[10px] text-gray-400">{Math.round(d.hd)}h</span>
                            </button>
                          );
                        })}
                      </div>
                      {okDias.length>7 && <p className="text-xs text-gray-400 mt-2">+{okDias.length-7} días más (elige en el calendario)</p>}
                    </div>

                    {/* Day without enough hours warning */}
                    {!showSplit && f.fecha && !diasInfo.find(d=>d.fs===f.fecha)?.ok && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm">
                        <div className="flex gap-2">
                          <Info size={18} className="text-amber-500 shrink-0 mt-0.5"/>
                          <div>
                            <p className="font-semibold text-amber-700 mb-1">Tiempo insuficiente este día</p>
                            <p className="text-xs text-amber-600 mb-2">
                              Este día solo hay <strong>{hrsDisp(f.empleado,f.fecha).toFixed(1)}h</strong> disponibles, pero necesitas {fmtHoras(totH)}.
                            </p>
                            <button onClick={()=>setShowSplit(true)} className="text-xs text-amber-700 underline">¿Quieres agendar los servicios en diferentes días?</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showSplit && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-sm">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-blue-700">Servicios en diferentes días</p>
                          <button onClick={()=>setShowSplit(false)} className="text-blue-400"><X size={16}/></button>
                        </div>
                        <p className="text-xs text-blue-600 mb-2">
                          Si prefieres dividir los servicios, llámanos al <strong>(787) 907-8229</strong> para coordinar fechas personalizadas.
                        </p>
                        <p className="text-xs text-blue-500">O elige uno de los días sugeridos arriba ☝️ que tenga suficiente tiempo.</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">Fecha</label>
              <input type="date" min={hoy} value={f.fecha}
                onChange={e=>setF(p=>({...p,fecha:e.target.value,hora:""}))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none"/>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">Hora disponible</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(()=>{
                  const slots = f.empleado && f.fecha ? getSlots(f.empleado,f.fecha) : [];
                  if (slots.length===0 && f.fecha) {
                    return <p className="col-span-full text-center text-gray-400 py-4 text-sm">
                      {f.empleado ? "No hay suficiente tiempo este día. Elige una fecha sugerida arriba." : "Selecciona un especialista primero."}
                    </p>;
                  }
                  return slots.map(h=>(
                    <button key={h} onClick={()=>upd("hora",h)}
                      className={`py-2 rounded-xl text-sm border transition-all ${f.hora===h?"border-[#C9A96E] bg-[#FFF8F0] text-[#C9A96E] font-semibold":"border-gray-200 text-gray-600 hover:border-gray-300"}`}>{h}</button>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= STEP 3: DATA + UPSELLS ======================= */}
      {step===3 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">Tus datos</h3>
          <div className="space-y-4 mb-8">
            <input type="text" placeholder="Nombre completo" value={f.nombre} onChange={e=>upd("nombre",e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none text-sm"/>
            <input type="tel" placeholder="Teléfono" value={f.telefono} onChange={e=>upd("telefono",e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none text-sm"/>
            <input type="email" placeholder="Email" value={f.email} onChange={e=>upd("email",e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none text-sm"/>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Plus size={16} className="text-[#C9A96E]"/>
              <h4 className="font-semibold text-sm text-[#1A1A1A]">¿Algo extra?</h4>
            </div>
            <div className="grid gap-2">
              {upsells.map(u=>(
                <button key={u.id} onClick={()=>toggleUp(u.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${f.upsells.includes(u.id)?"border-[#C9A96E] bg-[#FFF8F0]":"border-gray-200 hover:border-gray-300"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${f.upsells.includes(u.id)?"border-[#C9A96E] bg-[#C9A96E]":"border-gray-300"}`}>
                      {f.upsells.includes(u.id) && <Check size={12} className="text-white"/>}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{u.nombre}</div>
                      <div className="text-xs text-gray-400">{u.desc}</div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#C9A96E]">+${u.precio}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= STEP 4: PAYMENT ======================= */}
      {step===4 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">Método de pago</h3>

          {selSvcs.length>0 && (
            <div className="bg-[#FFF8F0] p-4 rounded-xl mb-6">
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Servicios</span><span className="font-medium">{selSvcs.map(s=>s.nombre).join(", ")}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Especialista</span><span className="font-medium">{selEmp?.nombre}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Duración total</span><span className="font-medium">{fmtHoras(totH)}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Fecha</span><span className="font-medium">{f.fecha} — {f.hora}</span></div>
              {selUp.length>0 && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Extras ({selUp.length})</span><span className="font-medium text-[#C9A96E]">+${upTotal}</span></div>
                  <div className="text-xs text-gray-400 space-y-1">{selUp.map(u=><div key={u.id} className="flex justify-between pl-2"><span>{u.nombre}</span><span>${u.precio}</span></div>)}</div>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-sm font-bold"><span>Total</span><span className="text-[#C9A96E] text-lg">${grandTotal}</span></div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <button onClick={()=>upd("metodoPago","ath")}
              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${f.metodoPago==="ath"?"border-[#C9A96E] bg-[#FFF8F0]":"border-gray-200 hover:border-gray-300"}`}>
              <div>
                <div className="font-medium text-sm text-[#1A1A1A]">ATH Móvil Business</div>
                <div className="text-xs text-gray-400 mt-1">Paga con ATH Móvil y sube tu comprobante</div>
              </div>
              <div className="text-xs font-bold text-[#C9A96E]">RECOMENDADO</div>
            </button>

            {f.metodoPago==="ath" && (
              <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#C9A96E]/30 space-y-4">
                <div>
                  <p className="font-medium text-sm text-[#1A1A1A] mb-2">Paga con ATH Móvil Business</p>
                  <p className="text-xs text-gray-500 mb-1">Transfiere el total a este número:</p>
                  <p className="text-lg font-bold text-[#C9A96E]">(787) 907-8229</p>
                  <p className="text-xs text-gray-400 mt-1">AGLA'S SALÓN & BEAUTY SPA CLINIC</p>
                </div>
                <div className="border-t border-[#C9A96E]/20 pt-4">
                  <p className="font-medium text-sm text-[#1A1A1A] mb-2">Sube tu comprobante de pago</p>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#C9A96E] transition-colors bg-white">
                    {f.comprobante ? (
                      <div className="text-center p-2">
                        <Check size={24} className="text-green-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">{f.comprobante.name}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); setF(prev => ({...prev, comprobante: null})); }}
                          className="text-[10px] text-red-400 hover:text-red-600 mt-1">Quitar</button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Plus size={28} className="text-gray-300 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Toca para subir captura</p>
                        <p className="text-[10px] text-gray-300 mt-1">JPG, PNG</p>
                      </div>
                    )}
                    <input type="file" accept="image/jpeg,image/png" className="hidden"
                      onChange={e => { const file = e.target.files?.[0]; if (file) setF(prev => ({...prev, comprobante: file})); }} />
                  </label>
                </div>
              </div>
            )}

            <button onClick={() => upd("metodoPago", "tarjeta")}
              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${f.metodoPago==="tarjeta"?"border-[#C9A96E] bg-[#FFF8F0]":"border-gray-200 hover:border-gray-300"}`}>
              <div>
                <div className="font-medium text-sm text-[#1A1A1A]">Tarjeta de Crédito/Débito</div>
                <div className="text-xs text-gray-400 mt-1">Pago seguro con Stripe</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        {step>0 ? (
          <button onClick={prev} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1A1A1A] transition-colors">
            <ChevronLeft size={18}/> Atrás
          </button>
        ) : <div/>}

        {step<steps.length-1 ? (
          <button onClick={next} disabled={!canGo()}
            className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8955A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-sm font-semibold transition-all">
            Siguiente <ChevronRight size={18}/>
          </button>
        ) : (
          <button onClick={confirm} disabled={!canGo()||submitting}
            className="bg-[#C9A96E] hover:bg-[#B8955A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full text-sm font-semibold transition-all">
            {submitting ? "ENVIANDO..." : "CONFIRMAR RESERVA"}
          </button>
        )}
      </div>
    </div>
  );
}
