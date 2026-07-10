import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Check,
  ChevronRight,
  Coffee,
  CupSoda,
  Flame,
  Minus,
  Plus,
  ReceiptText,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: "Classics" | "Premium" | "Beverages";
  description: string;
  donut: string;
  icing: string;
  crumb?: string;
};

type TicketItem = Product & { quantity: number };

const products: Product[] = [
  { id: "glazed", name: "Glazed", price: 3.9, category: "Classics", description: "Honey glaze · brioche", donut: "bg-[#d99a46]", icing: "bg-[#f6e2bf]" },
  { id: "chocolate", name: "Chocolate Dip", price: 4.5, category: "Classics", description: "Cacao glaze · sea salt", donut: "bg-[#b87036]", icing: "bg-[#4d2921]", crumb: "bg-[#ecc28b]" },
  { id: "matcha", name: "Matcha", price: 4.8, category: "Premium", description: "Ceremonial matcha · lime", donut: "bg-[#cc8a48]", icing: "bg-[#809655]", crumb: "bg-[#d7de9b]" },
  { id: "cruller", name: "Cruller", price: 4.2, category: "Classics", description: "French cruller · vanilla", donut: "bg-[#cc8c47]", icing: "bg-[#f4d9a3]" },
  { id: "strawberry", name: "Strawberry Milk", price: 4.6, category: "Premium", description: "Berry glaze · milk crumb", donut: "bg-[#cd844a]", icing: "bg-[#e79da3]", crumb: "bg-[#f5ced0]" },
  { id: "sesame", name: "Black Sesame", price: 5.2, category: "Premium", description: "Sesame cream · toasted", donut: "bg-[#b5753c]", icing: "bg-[#332d2c]", crumb: "bg-[#9f9b96]" },
  { id: "coldbrew", name: "Cold Brew", price: 4.4, category: "Beverages", description: "Oat milk · maple syrup", donut: "bg-[#674125]", icing: "bg-[#e6ceb1]" },
  { id: "espresso", name: "Espresso", price: 3.2, category: "Beverages", description: "Double shot · Night roast", donut: "bg-[#462719]", icing: "bg-[#d8a76b]" },
];

const money = (amount: number) => `$${amount.toFixed(2)}`;

function DonutArt({ product, large = false }: { product: Product; large?: boolean }) {
  if (product.category === "Beverages") {
    return (
      <div className={`relative flex items-center justify-center ${large ? "h-36" : "h-24"}`}>
        <div className="absolute h-20 w-16 rounded-b-[1.5rem] rounded-t-md border border-white/10 bg-[#2e2521]" />
        <div className={`absolute bottom-6 h-12 w-[3.3rem] rounded-b-[1.1rem] ${product.donut} opacity-90`} />
        <div className="absolute bottom-4 h-3 w-3 rounded-full bg-white/20" />
        <div className="absolute -right-2 top-7 h-9 w-6 rounded-r-full border-4 border-[#2e2521]" />
        <div className="absolute top-4 h-1 w-8 rounded-full bg-white/15" />
      </div>
    );
  }
  return (
    <div className={`relative flex items-center justify-center ${large ? "h-36" : "h-24"}`}>
      <div className={`absolute aspect-square ${large ? "w-28" : "w-20"} rounded-full ${product.donut} shadow-[inset_-9px_-10px_0_rgba(73,38,16,0.17),0_18px_30px_rgba(0,0,0,0.22)]`} />
      <div className={`absolute aspect-square ${large ? "w-[6.55rem]" : "w-[4.6rem]"} rounded-full ${product.icing} shadow-[inset_5px_5px_0_rgba(255,255,255,0.12)]`} />
      <div className="absolute aspect-square w-7 rounded-full bg-[#25160f]/80 shadow-[inset_2px_2px_0_rgba(0,0,0,0.3)]" />
      {product.crumb && <><i className={`absolute left-[39%] top-[30%] size-1.5 rounded-full ${product.crumb}`} /><i className={`absolute right-[35%] top-[43%] size-1 rounded-full ${product.crumb}`} /><i className={`absolute bottom-[30%] left-[33%] size-1 rounded-full ${product.crumb}`} /></>}
    </div>
  );
}

export function PosScreen() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [fulfillment, setFulfillment] = useState<"Walk-in" | "Pickup" | "Delivery">("Walk-in");
  const [payment, setPayment] = useState("Cash");
  const [deposit, setDeposit] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [sendReceipt, setSendReceipt] = useState(false);
  const [ticket, setTicket] = useState<TicketItem[]>([
    { ...products[0], quantity: 2 },
    { ...products[2], quantity: 1 },
  ]);

  const visibleProducts = useMemo(() => products.filter((product) =>
    (category === "All" || product.category === category) && product.name.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);
  const subtotal = ticket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (Number.parseFloat(deliveryFee) || 0);
  const itemCount = ticket.reduce((sum, item) => sum + item.quantity, 0);

  const changeQuantity = (product: Product, delta: number) => {
    setTicket((current) => {
      const found = current.find((item) => item.id === product.id);
      if (!found && delta > 0) return [...current, { ...product, quantity: 1 }];
      return current.flatMap((item) => {
        if (item.id !== product.id) return item;
        const quantity = item.quantity + delta;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      });
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background font-sans text-foreground selection:bg-[#e9ad55]/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_48%_-10%,rgba(214,143,59,0.10),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(61,147,113,0.07),transparent_34%)]" />
      <div className="relative grid min-h-screen lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_420px]">

        <section id="manual-pos" className="min-w-0 px-6 py-6 lg:px-8 xl:px-10">
          <header className="flex flex-col gap-5 border-b border-border pb-6 xl:flex-row xl:items-end xl:justify-between">
            <div><p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#e8ad59]">WALK-IN ORDERS</p><h1 className="mt-1 text-3xl font-semibold leading-none tracking-[-0.035em] text-stone-100">Manual Point of Sale</h1></div>
            <label className="group flex h-11 w-full items-center gap-2 rounded-xl border border-white/10 bg-[#171717] px-3.5 text-stone-500 transition focus-within:border-[#e0a74e]/70 focus-within:ring-2 focus-within:ring-[#e0a74e]/10 xl:w-72"><Search size={18} /><span className="sr-only">Search menu</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" className="min-w-0 flex-1 bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-600" /></label>
          </header>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu category">
            {["All", "Classics", "Premium", "Beverages"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm transition ${category === item ? "border-[#e5ad57]/35 bg-[#e5ad57] text-[#23180d]" : "border-white/10 bg-[#171717] text-stone-400 hover:border-white/20 hover:text-stone-200"}`}>{item}</button>)}
          </div>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {visibleProducts.map((product) => <article key={product.id} className="group rounded-2xl border border-white/[0.09] bg-[#171717] p-3.5 transition hover:-translate-y-0.5 hover:border-[#e0a74e]/35 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-black/20">
              <div className="rounded-xl border border-white/[0.05] bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.08),transparent_40%),#202020]"><DonutArt product={product} large /></div>
              <div className="px-1 pt-4"><div className="flex items-start justify-between gap-3"><div><h2 className="text-base font-semibold tracking-[-0.015em] text-stone-100">{product.name}</h2><p className="mt-1 text-xs text-stone-500">{product.description}</p></div><strong className="font-mono text-sm font-medium text-[#f2c178]">{money(product.price)}</strong></div><button onClick={() => changeQuantity(product, 1)} className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#e4aa51]/30 bg-[#332718] text-sm font-semibold text-[#f4c77e] transition hover:bg-[#e4aa51] hover:text-[#291a0c]"><Plus size={16} strokeWidth={2.4} />Add</button></div>
            </article>)}
          </div>
        </section>

        <aside className="flex min-h-full flex-col border-l border-border bg-[#101010]/95 p-5 lg:p-6">
          <header className="flex items-start justify-between border-b border-border pb-5"><div><p className="font-mono text-[10px] font-medium tracking-[0.14em] text-stone-500">ORDER #{String(4719).padStart(5, "0")}</p><h2 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-stone-100">Current ticket</h2></div><span className="rounded-lg border border-[#e5ac54]/25 bg-[#332616] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-[#efb964]">WALK-IN</span></header>
          <div className="flex-1 overflow-y-auto py-5">
            {ticket.length ? <div className="space-y-3">{ticket.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#181818] p-2.5"><div className="w-14 shrink-0 rounded-lg bg-[#232323]"><DonutArt product={item} /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="truncate text-sm font-medium text-stone-200">{item.name}</h3><span className="font-mono text-xs text-stone-300">{money(item.price * item.quantity)}</span></div><p className="mt-1 text-xs text-stone-500">{money(item.price)} each</p><div className="mt-2 flex items-center gap-2"><button aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item, -1)} className="grid size-6 place-items-center rounded-md border border-white/10 text-stone-400 hover:border-[#bb6b68]/50 hover:text-[#d88d88]"><Minus size={13} /></button><span className="w-4 text-center font-mono text-xs text-stone-200">{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item, 1)} className="grid size-6 place-items-center rounded-md border border-white/10 text-stone-400 hover:border-[#e1aa54]/50 hover:text-[#f2bd6a]"><Plus size={13} /></button></div></div></div>)}</div> : <div className="grid h-44 place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] text-center"><div><ShoppingBag className="mx-auto text-stone-600" size={24} /><p className="mt-3 text-sm text-stone-500">Your ticket is empty</p></div></div>}
            <section className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-stone-500">ORDER DETAILS</p>
              <div className="mt-3 grid grid-cols-3 rounded-xl border border-white/10 bg-[#181818] p-1">
                {(["Walk-in", "Pickup", "Delivery"] as const).map((method) => <button key={method} onClick={() => setFulfillment(method)} className={`rounded-lg py-2 text-xs font-medium transition ${fulfillment === method ? "bg-[#2d2d2d] text-stone-100 shadow" : "text-stone-500"}`}>{method}</button>)}
              </div>
              {fulfillment !== "Walk-in" && <div className="mt-3"><input type="datetime-local" aria-label="Pickup or delivery date and time" className="h-10 w-full rounded-xl border border-white/10 bg-[#181818] px-3 text-xs text-stone-300 outline-none focus:border-[#e0a74e]/70" /><p className="mt-2 flex items-center gap-1.5 text-[11px] leading-4 text-[#e7ad58]"><span className="size-1.5 rounded-full bg-[#e7ad58]" />Warning: High volume on this date. 85/100 capacity.</p></div>}
              <div className="mt-3 grid grid-cols-2 gap-3"><input placeholder="Customer name" className="h-10 min-w-0 rounded-xl border border-white/10 bg-[#181818] px-3 text-xs text-stone-200 outline-none placeholder:text-stone-600 focus:border-[#e0a74e]/70" /><input placeholder="WhatsApp" className="h-10 min-w-0 rounded-xl border border-white/10 bg-[#181818] px-3 text-xs text-stone-200 outline-none placeholder:text-stone-600 focus:border-[#e0a74e]/70" /></div>
              <textarea placeholder="Delivery Address" rows={3} className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-[#181818] px-3 py-2.5 text-xs text-stone-200 outline-none placeholder:text-stone-600 focus:border-[#e0a74e]/70" />
              <input placeholder="Order notes (optional)" className="mt-3 h-10 w-full rounded-xl border border-white/10 bg-[#181818] px-3 text-xs text-stone-200 outline-none placeholder:text-stone-600 focus:border-[#e0a74e]/70" />
            </section>
            <section className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-stone-500">PAYMENT METHOD</p>
              <div className="mt-3 grid grid-cols-3 gap-2">{["Cash", "Transfer", "COD"].map((method) => <button key={method} onClick={() => setPayment(method)} className={`flex h-10 items-center justify-center gap-1.5 rounded-xl border text-xs transition ${payment === method ? "border-[#e1ab56]/50 bg-[#2d251a] text-[#f2bd6a]" : "border-white/10 bg-[#181818] text-stone-500 hover:text-stone-300"}`}><span className={`size-2 rounded-full border ${payment === method ? "border-[#f0b85e] bg-[#f0b85e] ring-2 ring-[#f0b85e]/20" : "border-stone-600"}`} />{method}</button>)}</div>
              <label className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#181818] px-3 text-xs text-stone-400"><span className="whitespace-nowrap">Deposit Collected (DP)</span><span className="ml-auto font-mono text-stone-600">$</span><input value={deposit} onChange={(event) => setDeposit(event.target.value)} inputMode="decimal" placeholder="0.00" className="h-10 w-20 bg-transparent text-right font-mono text-xs text-stone-100 outline-none placeholder:text-stone-600" /></label>
            </section>
          </div>
          <footer className="border-t border-border pt-4">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3"><label className="text-xs text-stone-400">+ Delivery Fee</label><div className="flex h-8 w-24 items-center rounded-lg border border-white/10 bg-[#181818] px-2"><span className="font-mono text-xs text-stone-600">$</span><input value={deliveryFee} onChange={(event) => setDeliveryFee(event.target.value)} inputMode="decimal" placeholder="0.00" className="min-w-0 flex-1 bg-transparent pl-1 text-right font-mono text-xs text-stone-100 outline-none placeholder:text-stone-600" /></div></div>
            <div className="mt-4 flex items-end justify-between"><div><p className="text-xs text-stone-500">Total · {itemCount} {itemCount === 1 ? "item" : "items"}</p><p className="mt-1 font-mono text-[11px] text-stone-600">incl. sales tax</p></div><strong className="font-mono text-3xl font-semibold tracking-[-0.06em] text-stone-100">{money(total)}</strong></div>
            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-xs text-stone-400"><input checked={sendReceipt} onChange={(event) => setSendReceipt(event.target.checked)} type="checkbox" className="size-4 rounded border-white/20 bg-[#181818] accent-[#8dd2ae]" />Send digital receipt via WhatsApp</label>
            <button onClick={() => navigate("/invoice")} disabled={!ticket.length} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#8dd2ae] text-sm font-semibold text-[#10251c] transition hover:bg-[#a4e1bc] disabled:cursor-not-allowed disabled:opacity-40"><Check size={19} strokeWidth={2.7} />Checkout &amp; submit</button><button onClick={() => setTicket([])} disabled={!ticket.length} className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#ac625f]/35 bg-[#512d2e]/35 text-sm font-medium text-[#d7948f] transition hover:bg-[#632f31] disabled:cursor-not-allowed disabled:opacity-40"><X size={17} />Clear ticket</button>
          </footer>
        </aside>
      </div>
    </main>
  );
}
