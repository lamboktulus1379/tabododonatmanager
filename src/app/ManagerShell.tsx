import { ChevronRight, Coffee, CupSoda, Flame, ReceiptText, ShoppingBag } from "lucide-react";
import { NavLink, Outlet } from "react-router";

const links = [
  { to: "/dashboard", label: "Order Queue", icon: ReceiptText, end: true },
  { to: "/menu", label: "Menu Management", icon: ShoppingBag },
  { to: "/operations", label: "Store Operations", icon: Flame },
  { to: "/pos", label: "Manual POS", icon: CupSoda },
];

export function ManagerShell() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_-5%,rgba(220,150,60,0.10),transparent_30%)]" />
      <div className="relative grid min-h-screen lg:grid-cols-[272px_minmax(0,1fr)]">
        <aside className="flex min-h-full flex-col border-r border-white/[0.09] bg-[#101010]/95 px-5 py-6">
          <NavLink to="/dashboard" className="flex items-center gap-3 px-2">
            <span className="grid size-11 place-items-center rounded-2xl border border-[#e8a949]/35 bg-[#2e2115] text-[#f3b657]">
              <Coffee size={21} />
            </span>
            <span>
              <strong className="block text-[18px] tracking-[-0.02em]">Night Oven</strong>
              <small className="font-mono text-[10px] tracking-[0.16em] text-stone-500">MANAGER CONSOLE</small>
            </span>
          </NavLink>

          <nav className="mt-12 space-y-1.5" aria-label="Manager navigation">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition ${
                    isActive
                      ? "border-[#e0a74e]/30 bg-[#2e2418] text-[#f5c77d]"
                      : "border-transparent text-stone-400 hover:bg-white/[0.035] hover:text-stone-200"
                  }`
                }
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                <ChevronRight size={15} />
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-[#a55c22]/30 bg-[linear-gradient(145deg,rgba(95,49,23,0.52),rgba(39,27,18,0.92))] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[#f2bd73]">
                <Flame size={14} fill="currentColor" />
                Rush forecast
              </span>
              <span className="font-mono text-[10px] text-[#f2bd73]">6–8 PM</span>
            </div>
            <p className="mt-3 text-sm leading-5 text-stone-300">
              Evening lift expected.
              <br />
              <span className="text-stone-500">Prep an extra 18 classics.</span>
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/35">
              <div className="h-full w-[74%] rounded-full bg-[#e8a949]" />
            </div>
          </div>
        </aside>

        <Outlet />
      </div>
    </main>
  );
}
