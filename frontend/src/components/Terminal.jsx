import { useEffect, useState } from 'react';

const FLAMES = [
  String.raw`
 [C++] → [JAVA] → [PY] → [RUST] → [GO]
 ======================================
          ( . )  .  )  . ( . )
           ) ( / (   ( ) / (
          (.-' '-. ) ( .-' '-.
 ======================================`,
  String.raw`
 [GO] → [C++] → [JAVA] → [PY] → [RUST]
 ======================================
          . ( . )  . ( . )
         ( . ) ( ) ( . ) (
          (.-' '-. ) ( .-' '-.
 ======================================`,
  String.raw`
 [RUST] → [GO] → [C++] → [JAVA] → [PY]
 ======================================
           ) . ( . ) . ( )
         ( ) . ) ( . ) (
          (.-' '-. ) ( .-' '-.
 ======================================`,
  String.raw`
 [PY] → [RUST] → [GO] → [C++] → [JAVA]
 ======================================
          ( . )  .  )  . ( . )
           ) ( / (   ( ) / (
          (.-' '-. ) ( .-' '-.
 ======================================`,
  String.raw`
 [JAVA] → [PY] → [RUST] → [GO] → [C++]
 ======================================
          . ( . )  . ( . )
         ( . ) ( ) ( . ) (
          (.-' '-. ) ( .-' '-.
 ======================================`
];

const TABS = [
  { id: 'ascii', label: 'ASCII' },
  { id: 'code', label: 'CODE' },
];

export default function Terminal() {
  const [tab, setTab] = useState('ascii');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (tab !== 'ascii' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setFrame((f) => (f + 1) % FLAMES.length), 350);
    return () => clearInterval(id);
  }, [tab]);

  return (
    <div className="bg-card border border-line shadow-2xl relative">
      <div className="bg-panel border-b border-line px-4 py-2.5 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="w-2.5 h-2.5 bg-line inline-block" />
          <span className="w-2.5 h-2.5 bg-line inline-block" />
          <span className="w-2.5 h-2.5 bg-line inline-block" />
          <span className="text-fg-3 ml-2">forge_core.py</span>
        </div>
        <div role="tablist" aria-label="Terminal view" className="text-fg-3 flex items-center gap-2">
          {TABS.map((t, i) => (
            <span key={t.id} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">|</span>}
              <button
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={tab === t.id ? 'text-forge underline' : 'hover:text-fg'}
              >
                {t.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto min-h-[300px] flex flex-col justify-between">
        {tab === 'ascii' ? (
          <div role="tabpanel">
            <div className="text-fg-3 mb-2">{'// AlgoForge Engine v2.4 — Pixel ASCII Renderer'}</div>
            <pre className="text-forge leading-none font-mono text-[11px] select-none" aria-hidden="true">{FLAMES[frame]}</pre>
            <div className="mt-4 pt-3 border-t border-line text-fg-2">
              <span className="text-forge">&gt;</span> STATUS: <span className="text-hl-str">FORGING_ENG_MINDSET</span><br />
              <span className="text-forge">&gt;</span> TARGET: <span className="text-fg">PRINCIPAL_ENGINEER</span><br />
              <span className="text-forge">&gt;</span> PROGRESS: [<span className="text-forge">████████████████░░░░</span>] 80%
            </div>
          </div>
        ) : (
          <pre role="tabpanel" className="text-fg font-mono whitespace-pre">
            <span className="text-fg-3">{'// Standard Optimal Solution Example'}</span>{'\n'}
            <span className="text-forge">class</span> <span className="text-hl-num">AlgoForge</span> {'{'}{'\n'}
            {'  '}<span className="text-forge">public static void</span> <span className="text-hl-fn">main</span>(String[] args) {'{'}{'\n'}
            {'    '}System.out.println(<span className="text-hl-str">&quot;Build. Solve. Engineer.&quot;</span>);{'\n'}
            {'    '}ForgeEngine.optimize(SkillSet.ALL);{'\n'}
            {'  }\n}'}
          </pre>
        )}

        <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-fg-3">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-forge">algoforge@core:~$</span>
            <span className="text-fg">exec --track dsa</span>
            <span className="w-2 h-4 bg-forge inline-block animate-blink" aria-hidden="true" />
          </div>
          <span className="text-[10px]">UTF-8</span>
        </div>
      </div>
    </div>
  );
}
