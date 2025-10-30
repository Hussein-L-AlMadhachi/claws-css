# Contributor Guide

When you first look at the source code, you might be a little confused:

> *“This is a CSS framework—why does it have a ‘backend’ and ‘frontend’?”*

That’s because **ClawsCSS isn’t just a styling library—it’s a static CSS compiler**. And like all serious compilers (think GCC, LLVM, or TypeScript), it’s split into clear, purpose-driven layers to keep the system maintainable, testable, and extensible.

Compilers typically divide their work into two main parts:

1. **A frontend** — responsible for parsing the code users write and transforming it into a structured, normalized form called an **Intermediate Representation (IR)**.
2. **A backend** — responsible for taking that IR and **emitting the final output** (in our case: clean, static CSS).

In ClawsCSS, this translates directly to our directory structure:

---

## 🌐 `src/frontend/` → The Authoring Layer (Compiler Frontend)

This is the **developer-facing API**—what users actually import and write code with to have basic functionality without builtin plugins. It includes:

- **`s-template.ts`**: Implements the `s` template tag. It parses virtual CSS properties (like `flex`, `p`, `bg`) and delegates their expansion to plugins.
- **`component.ts`**: The `Component` class lets users group styles by selector and breakpoint. It validates inputs and prepares data for IR emission.
- **`keyframe.ts`**: Handles animation definitions and integrates them into the compilation pipeline.
- **`plugin.ts`**: Exposes the plugin registry (`ClawsPluginRegistry`) so the frontend can resolve virtual properties at authoring time.

> 💡 **Think of this as the “language parser”**—it turns high-level, ergonomic syntax into structured data the compiler can reason about.

---

### ⚙️ `src/plugins/` → The Semantic Passes

These are **compiler passes** that define the meaning of ClawsCSS’s virtual CSS properties:

Plugins use `frontend/plugin.ts` to register built-in plugins to create those virtual CSS properties

- `flex.ts`, `grid.ts` → transform layout abstractions into real CSS
- `shortcuts.ts` → expands utilities like `p`, `m`, `radius`, `fg`, etc.
- `transition.ts`, `animation.ts` → handle interactive and dynamic styles

Each plugin is a pure function:  
`input → { "real-css-prop": "value" }`.

> 🔌 **Plugins extend the frontend language**—they’re how ClawsCSS stays expressive without bloating the core.

---

### 🧱 `src/backend/snippets.ts` → The Intermediate Representation (IR)

This is the **heart of the compiler**.

- **`ClawsSnippet`** is our IR unit: a normalized, plugin-expanded style block tied to a selector and screen size.
- **`SnippetsRegistry`** acts as the global IR module—collecting all snippets during authoring.

The IR Objects (Snippets):

- Is **Breakpoint-aware** (`all`, `sm`, `md`, etc.)
- Is **Animation-aware** (keyframes vs. static styles)
- Is **Declarative and side-effect-free**
- Track all snippets submitted by the frontend
- Partially transforms a part of the IR to raw CSS before compiled fully into static CSS in `compiler.ts`.

> 📦 **This is what the backend consumes**—it knows nothing about `s` templates or plugins, only snippets.

---

### 🏗️ `src/backend/compiler.ts` → The Emitter (Compiler Backend)

This is the **codegen phase**:

- Listens for `process.on('beforeExit')` (disabled when compilation is invoked manually)
- Pulls all snippets from the IR registry
- Groups them by screen size
- Wraps non-`all` styles in `@media (min-width: ...)` queries
- Writes the final, human-readable CSS to a `.css` file next to your script

> 🎯 **Its only job: turn IR into valid, optimized CSS**—no magic, no runtime, no bundler required.

---

### 🧰 Supporting Modules

- **`src/helpers/`**:  
  - `scale.ts` → generates design-system scales (spacing, typography)  
  - `func.ts` → utility helpers like `calc()`  
  These are **pure, framework-agnostic utilities** used by both users and plugins.

- **`src/util/base32.ts`**:  
  Low-level utility for future features like scoped selectors or deterministic hashing.

- **`src/claws.ts`**:  
  The public entrypoint—re-exports everything users need: `s`, `Component`, `Scale`, `calc`, etc.

---

### 🧪 How to Contribute

| Want to… | Work in… |
|--------|--------|
| Add a new utility (e.g., `shadow`, `typo`) | `src/plugins/` + register in `claws.ts` |
| Fix responsive behavior | `src/backend/compiler.ts` + `snippets.ts` |
| Improve the framework itself (no virtual properties) | `src/frontend/` |
| Add design system helpers and extra functions for the user to use | `src/helpers/` |
| Change how objects in `frontend` get compiled and extend the limitation of the compiler backend | `src/backend/snippets.ts` + `compiler.ts` (IR transformations) |

> ✅ **Rule of thumb**:  
> If it changes **what users write beyond making more virtual CSS properties**, touch the **frontend**.  
> If it changes **what CSS is output**, touch the **backend or IR**.  
> If it adds **new styling capabilities through virtual CSS properties**, write a **plugin** and `helper` functions.

---

### 🧠 Final Note

ClawsCSS is built on a simple philosophy:  
> **“Let developers write expressive, maintainable styles in TypeScript—and compile them to clean, static CSS with zero runtime.”**

Every layer exists to serve that goal. Keep it focused, and the rest will follow.

Welcome to the project! 🦅
