import { Bell, Check, ChevronRight, Coffee, Edit3, Flame, ImagePlus, Minus, Plus, ReceiptText, Search, ShieldAlert, Store, UploadCloud, X } from "lucide-react";

const lanes = [
  {
    title: "Pending Evidence",
    count: 5,
    tone: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    orders: [
      { id: "#D-4187", name: "Maya R.", time: "4m", total: "$28.40", items: ["6 Maple Old Fashioned", "2 Ube Glaze"], note: "Awaiting receipt photo", alert: true },
      { id: "#D-4189", name: "J. Patel", time: "8m", total: "$16.20", items: ["Boston Cream box"], note: "Cash proof requested" },
    ],
  },
  {
    title: "Processing",
    count: 8,
    tone: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    orders: [
      { id: "#D-4183", name: "North Office", time: "12m", total: "$94.00", items: ["24 Assorted", "Cold brew traveler"], note: "Driver: Lena" },
      { id: "#D-4184", name: "Sam C.", time: "18m", total: "$12.75", items: ["3 Churro Rings", "1 Espresso"], note: "No cinnamon dust" },
    ],
  },
  {
    title: "Ready",
    count: 3,
    tone: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    orders: [
      { id: "#D-4178", name: "Ari L.", time: "Ready 2m", total: "$36.50", items: ["Dozen Classic", "2 Strawberry Milk"], note: "Pickup shelf B" },
      { id: "#D-4179", name: "Hotel Vale", time: "Ready 7m", total: "$72.80", items: ["18 Vegan Glaze", "6 Cruffins"], note: "Courier waiting" },
    ],
  },
  {
    title: "Canceled",
    count: 2,
    tone: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    orders: [
      { id: "#D-4169", name: "Guest", time: "22m", total: "$8.50", items: ["2 Chocolate Dip"], note: "Duplicate payment" },
      { id: "#D-4164", name: "E. Wong", time: "35m", total: "$21.00", items: ["Mini dozen"], note: "Customer canceled" },
    ],
  },
];

const donuts = [
  { name: "Black Sesame Halo", price: "$4.80", enabled: true, out: false, img: "BS" },
  { name: "Vanilla Bean Cloud", price: "$3.90", enabled: true, out: false, img: "VB" },
  { name: "Salted Yuzu Cruller", price: "$5.20", enabled: true, out: true, img: "YZ" },
  { name: "Cacao Nib Brioche", price: "$4.60", enabled: false, out: false, img: "CN" },
];

const posItems = ["Glazed", "Chocolate Dip", "Matcha", "Cruller", "Jelly", "Old Fashioned", "Coffee", "Milk"];

function Toggle({ on, danger = false }: { on: boolean; danger?: boolean }) {
  return <span className={`relative inline-flex h-6 w-11 rounded-full border transition ${on ? (danger ? "border-rose-300/40 bg-rose-400" : "border-emerald-300/40 bg-emerald-400") : "border-white/10 bg-zinc-800"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${on ? "left-5" : "left-0.5"}`} /></span>;
}

function OrderCard({ order }: { order: any }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div><p className="font-mono text-xs text-zinc-500">{order.id}</p><h4 className="mt-1 text-base text-zinc-100">{order.name}</h4></div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-300">{order.time}</span>
      </div>
      <div className="mt-4 space-y-1.5 text-sm text-zinc-300">{order.items.map((item: string) => <p key={item} className="flex gap-2"><span className="text-zinc-600">•</span>{item}</p>)}</div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3"><span className={`text-xs ${order.alert ? "text-amber-200" : "text-zinc-500"}`}>{order.note}</span><strong className="font-mono text-sm text-zinc-100">{order.total}</strong></div>
    </article>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground [font-family:Instrument_Sans,sans-serif]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,146,60,0.13),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(244,114,182,0.08),transparent_28%)]" />
      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-border bg-zinc-950/80 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-2xl bg-orange-300 text-zinc-950"><Coffee size={22} /></div><div><h1 className="text-lg font-semibold">Night Oven</h1><p className="font-mono text-xs text-zinc-500">MANAGER CONSOLE</p></div></div>
          <nav className="mt-10 space-y-2 text-sm">
            {["Order Queue", "Menu Management", "Store Operations", "Manual POS"].map((item, i) => <div key={item} className={`flex items-center justify-between rounded-2xl px-4 py-3 ${i === 0 ? "bg-white text-zinc-950" : "text-zinc-400 hover:bg-white/5"}`}><span>{item}</span>{i === 0 && <ChevronRight size={16} />}</div>)}
          </nav>
          <div className="mt-10 rounded-3xl border border-orange-300/20 bg-orange-300/10 p-4"><div className="flex items-center gap-2 text-orange-200"><Flame size={17} /><span className="text-sm font-semibold">Rush forecast</span></div><p className="mt-3 text-sm leading-6 text-zinc-400">Expected spike from 5:30–6:15 PM. Keep two dozen classics staged.</p></div>
        </aside>

        <section className="p-5 md:p-8">
          <header className="flex flex-col justify-between gap-5 border-b border-border pb-6 xl:flex-row xl:items-end">
            <div><p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-200">Friday shift · 4:42 PM</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-zinc-50 md:text-6xl">Donut shop command center</h2></div>
            <div className="flex flex-wrap gap-3"><button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200"><Search className="mr-2 inline" size={16}/>Search orders</button><button className="rounded-full bg-orange-300 px-5 py-2 text-sm font-semibold text-zinc-950"><Bell className="mr-2 inline" size={16}/>3 urgent edits</button></div>
          </header>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <section className="rounded-[2rem] border border-border bg-card/80 p-5 shadow-2xl shadow-black/30"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-2xl font-semibold tracking-[-0.03em]">Order Queue</h3><p className="text-sm text-muted-foreground">Drag-ready Kanban workflow with evidence checkpoints.</p></div><span className="font-mono text-xs text-zinc-500">18 LIVE</span></div><div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">{lanes.map((lane) => <div key={lane.title} className="rounded-3xl border border-white/10 bg-zinc-900/50 p-3"><div className={`mb-3 flex items-center justify-between rounded-2xl border px-3 py-2 ${lane.tone}`}><span className="text-sm font-semibold">{lane.title}</span><span className="font-mono text-xs">{lane.count}</span></div><div className="space-y-3">{lane.orders.map((order) => <OrderCard key={order.id} order={order} />)}</div></div>)}</div></section>

              <section className="rounded-[2rem] border border-border bg-card/80 p-5"><div className="mb-5 flex items-center justify-between"><h3 className="text-2xl font-semibold tracking-[-0.03em]">Menu Management</h3><button className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"><Plus size={16} className="mr-2 inline"/>Add donut</button></div><div className="space-y-3">{donuts.map((donut) => <div key={donut.name} className="grid items-center gap-4 rounded-3xl border border-white/10 bg-zinc-950/60 p-3 md:grid-cols-[1.4fr_.8fr_.8fr_.8fr_1fr]"><div className="flex items-center gap-3"><div className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-orange-200/30 bg-orange-200/10 font-mono text-xs text-orange-100">{donut.img}</div><div><p className="font-medium text-zinc-100">{donut.name}</p><button className="mt-1 flex items-center gap-1 text-xs text-zinc-500"><UploadCloud size={13}/>Upload image</button></div></div><label className="text-xs text-zinc-500">Price<input value={donut.price} readOnly className="mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100" /></label><div className="flex items-center justify-between gap-3 text-sm text-zinc-300">Out of Stock <Toggle on={donut.out} danger /></div><div className="flex items-center justify-between gap-3 text-sm text-zinc-300">Enable <Toggle on={donut.enabled} /></div><button className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-300"><ImagePlus className="mr-2 inline" size={15}/>Replace photo</button></div>)}</div></section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[2rem] border border-border bg-card/80 p-5"><div className="flex items-center gap-3"><Store className="text-orange-200"/><h3 className="text-2xl font-semibold tracking-[-0.03em]">Store Operations</h3></div><div className="mt-5 space-y-3"><div className="flex items-center justify-between rounded-2xl bg-zinc-950/70 p-4"><div><p className="text-zinc-100">Store hours</p><p className="text-xs text-zinc-500">Open until 9:00 PM</p></div><Toggle on /></div><div className="flex items-center justify-between rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4"><div><p className="text-rose-100">Force-close store</p><p className="text-xs text-rose-200/60">Pauses checkout instantly</p></div><Toggle on={false} danger /></div><div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4"><div className="flex items-center gap-2 text-amber-100"><ShieldAlert size={17}/><p>Urgent customer edits</p></div><p className="mt-2 text-sm text-zinc-400">3 orders need address or allergy changes before processing.</p><button className="mt-4 w-full rounded-2xl bg-amber-200 px-4 py-3 text-sm font-semibold text-zinc-950"><Edit3 size={16} className="mr-2 inline"/>Review requests</button></div></div></section>

              <section className="rounded-[2rem] border border-border bg-card/80 p-5"><div className="flex items-center justify-between"><div><h3 className="text-2xl font-semibold tracking-[-0.03em]">Manual Order Entry</h3><p className="text-sm text-muted-foreground">Admin POS for walk-ins.</p></div><ReceiptText className="text-zinc-500"/></div><div className="mt-5 grid grid-cols-2 gap-2">{posItems.map((item, i) => <button key={item} className={`rounded-2xl border p-4 text-left text-sm ${i < 4 ? "border-orange-300/20 bg-orange-300/10 text-orange-100" : "border-white/10 bg-zinc-950 text-zinc-300"}`}><Plus size={15}/><span className="mt-3 block">{item}</span></button>)}</div><div className="mt-5 rounded-3xl bg-zinc-950 p-4"><div className="flex items-center justify-between text-sm"><span>Current ticket</span><span className="font-mono text-zinc-500">WALK-IN</span></div><div className="mt-4 space-y-2 text-sm text-zinc-300"><p className="flex justify-between"><span>2 × Glazed</span><span>$7.80</span></p><p className="flex justify-between"><span>1 × Coffee</span><span>$3.50</span></p></div><div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-zinc-500">Total</span><strong className="font-mono text-2xl text-zinc-50">$11.30</strong></div><div className="mt-4 grid grid-cols-3 gap-2"><button className="rounded-xl bg-zinc-800 p-3"><Minus size={16} className="mx-auto"/></button><button className="rounded-xl bg-emerald-300 p-3 text-zinc-950"><Check size={16} className="mx-auto"/></button><button className="rounded-xl bg-rose-400 p-3 text-white"><X size={16} className="mx-auto"/></button></div></div></section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
