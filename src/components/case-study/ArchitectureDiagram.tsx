import { ArrowDown } from "lucide-react";
import type { ArchLayer } from "@/lib/case-study-types";

// Layered diagram: each layer is a row of components; arrows show the
// direction of requests/data between layers. Rendered as an ordered list
// so the structure is readable without the visual layout.
export default function ArchitectureDiagram({ layers, label }: { layers: ArchLayer[]; label: string }) {
  return (
    <ol aria-label={label} className="space-y-2">
      {layers.map((layer, i) => (
        <li key={layer.name}>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-faint mb-3">{layer.name}</p>
            <ul
              className={`grid gap-2.5 grid-cols-1 sm:grid-cols-2 ${
                layer.nodes.length >= 4 ? "lg:grid-cols-4" : layer.nodes.length === 3 ? "lg:grid-cols-3" : ""
              }`}
            >
              {layer.nodes.map((node) => (
                <li key={node.label} className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
                  <p className="text-sm font-semibold text-zinc-100">{node.label}</p>
                  <p className="text-xs text-fg-muted mt-1 leading-relaxed">{node.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1 text-zinc-600" aria-hidden="true">
              <ArrowDown className="w-4 h-4" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
