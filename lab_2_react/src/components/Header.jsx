import Shield from './Shield';

const link =
  'text-cyan-300 underline-offset-4 hover:text-emerald-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300';

function Header() {
  return (
    <header className="overflow-hidden rounded-2xl border border-emerald-400/40 bg-slate-900 shadow-2xl shadow-emerald-500/20">
      {/* рядок заголовка «термінала» */}
      <div className="flex items-center gap-2 border-b border-emerald-400/20 bg-slate-950 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-rose-500" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 font-mono text-xs text-slate-500">vitalii@lpnu:~/resume</span>
      </div>

      <div className="flex flex-col-reverse items-center gap-6 p-6 md:flex-row md:justify-between md:p-8">
        <div className="w-full font-mono">
          <p className="text-sm text-emerald-400">$ whoami</p>
          <h1 className="text-3xl font-bold tracking-wide text-white md:text-5xl">Юфим Віталій</h1>
          <p className="mt-3 text-sm text-emerald-400">$ cat role.txt</p>
          <p className="text-xl text-cyan-300">Веброзробник</p>

          <address className="mt-4 flex flex-col gap-1 text-sm not-italic">
            <span>
              <span className="text-slate-500">Email: </span>
              <a className={`font-semibold ${link}`} href="mailto:vitalii.yufym.kb.2025@lpnu.ua">
                vitalii.yufym.kb.2025@lpnu.ua
              </a>
            </span>
            <span>
              <span className="text-slate-500">Телефон: </span>
              <a className={`whitespace-nowrap ${link}`} href="tel:+380676496714">
                +380 67 649 67 14
              </a>
            </span>
            <span>
              <span className="text-slate-500">Місто: </span>Львів
            </span>
            <span>
              <span className="text-slate-500">GitHub: </span>
              <a className={link} href="https://github.com/vitaliyufym" target="_blank" rel="noreferrer">
                github.com/vitaliyufym ↗
              </a>
            </span>
          </address>
        </div>

        <Shield className="w-32 shrink-0 motion-safe:transition-transform motion-safe:duration-500 hover:scale-110 md:w-44" />
      </div>
    </header>
  );
}

export default Header;
