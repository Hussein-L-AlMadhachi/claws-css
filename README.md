# 🐾 ClawsCSS

Build beautiful, responsive, scalable styles — **with pure TypeScript/JavaScript.**
No dependencies. Just you and the code.

ClawsCSS is a **next-gen CSS framework and compiler** that gives you the **power of Tailwind**, the **flexibility of CSS-in-JS**, and the
**simplicity of vanilla TypeScript/JavaScript** — all in one.

It’s fast, hackable, and completely yours.
No magic — just raw convenient control.

---

## ⚡ Why ClawsCSS?

* **🚀 Responsive by Design** – Define styles for every breakpoint right in `.style()` — mobile-first, automatically.
* **🧩 Plugin Powered** – Add or build plugins for `flex`, `grid`, `animation`, `shortcuts`, or anything you dream up.
* **🪶 Zero Dependencies** – 100% TypeScript. No PostCSS, no Vite, no build step.
* **🧠 Fully Typed** – Get autocomplete, validation, and type safety for every CSS property.
* **🎨 Design Systems Made Simple** – Create your own scales for color, spacing, and typography.
* **💨 Static Output** – Compiles down to clean, production-ready CSS — no runtime overhead.

---

ClawsCSS isn’t here to control your workflow — it’s here to **embrase it.**
It gives you the compiler, the tools, and the power — **you make the rules.**

It runs your JS/TS to compile it and generate static CSS optimised for small CSS footprint that can be minified separately

> 🦴 A hand-forged CSS compiler framework, dependency-free, modular by design, written in TS.

## Table of Contents

* [Installation](#installation)
* [Quick Start](#quick-start)
* [Core Concepts](#core-concepts)
* [API Reference](#api-reference)
  * [Scale System](#scale-system)
  * [Component](#component)
  * [Template Literal (s)](#template-literal-s)
  * [Plugin System](#plugin-system)
* [Built-in Plugins](#built-in-plugins)
  * [Animation Plugin](#animation-plugin)
  * [Utility Shortcuts](#utility-shortcuts)
  * [Flex Plugin](#flex-plugin)
  * [Flex Item Plugin](#flex-item-plugin)
  * [Grid Plugin](#grid-plugin)
  * [Grid Item Plugin](#grid-item-plugin)
* [Creating Custom Plugins](#creating-custom-plugins)
* [Responsive Design](#responsive-design)
* [Animation Support](#animation-support)
* [Best Practices](#best-practices)

---

## Installation

```bash
npm install claws-css
```

---

## Quick Start

```typescript
import { Scale, Component, s } from 'claws-css';

// Create a scale for consistent sizing
const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });

// Create a component
const navbar = new Component();

// Define a number of CSS selectors and map them to styles
navbar.style(".nav", {
  all: s`
    p${spacing.lg}
    flex${{ justify: "between", items: "center" }}
  `,
  sm: s`
    flex${{ dir: "col" }}
  `
});

navbar.style(".nav_item", {
  all: s`
    p${spacing.lg}
    flex-item${grow: 1 , align:"center"}
  `
});

// Apply styles (submit the component to the compiler for auto-compilation to CSS)
navbar.apply();
```

**That's it!** Your CSS is automatically written to a `.css` file when your script exits.

---

## Core Concepts

### Auto-Compilation

ClawsCSS automatically compiles your styles to CSS when your Node.js process exits. No manual build step needed!

```typescript
// Just define and apply your styles
navbar.apply();

// CSS is written to output.css automatically
// (based on your script filename)
```

### Plugin System

ClawsCSS uses a plugin architecture for extensibility. Virtual CSS properties like `flex` are plugins that expand to real CSS:

```typescript
s`flex${{ justify: "center" }}`
// Expands to: display: flex; justify-content: center;
```

### Template Literals

The `s` template tag parses your styles and applies plugins:

```typescript
s`
  property${value}
  another-property${"value"}
`
```

---

## API Reference

### Scale System

Create mathematical scales for consistent spacing, sizing, and typography.

#### Constructor

```typescript
new Scale({
  base: number,      // Base value
  unit: string,      // CSS unit (px, rem, em, etc.)
  scale: number      // Scale ratio (e.g., 1.2 for minor third)
})
```

#### Properties

The Scale generates 11 predefined sizes:

* `xxxxs` - Smallest (-5 steps)
* `xxxs` - Extra extra small (-4 steps)
* `xxs` - Extra small (-3 steps)
* `xs` - Small (-2 steps)
* `sm` - Small-medium (-1 step)
* `md` - Medium (base, 0 steps)
* `lg` - Large (+1 step)
* `xl` - Extra large (+2 steps)
* `xxl` - Extra extra large (+3 steps)
* `xxxl` - Triple extra large (+4 steps)
* `xxxxl` - Quadruple extra large (+5 steps)

#### Example

```typescript
const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });

console.log(spacing.xs);    // "12px"
console.log(spacing.md);    // "16px"
console.log(spacing.lg);    // "20px"
console.log(spacing.xl);    // "24px"

// Use in styles
s`p${spacing.md} m${spacing.lg}`
```

**Note:** Values are rounded to the nearest multiple of 4 for pixel-perfect alignment.

---

### Component

Components manage collections of styles with responsive breakpoints.

Components are created like so:

```typescript
import { Component } from "claws-css";

const component = new Component; // new component
```

#### Methods

##### `style(selector, styles)`

Define styles for a CSS selector with responsive breakpoints.

under the hood it looks like so

```typescript

component.style(selector: string, styles: {

  all?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,    // All screen sizes
  xs?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,     // ≤ 319px
  sm?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,     // ≤ 568px
  md?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,     // ≤ 768px
  lg?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,     // ≤ 1024px
  xl?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,     // ≤ 1280px
  xxl?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,    // ≤ 1920px
  xxxl?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`,   // ≤ 2560px
  xxxxl?: s`css-property-1${ "css-value" } css-property-2${ "css-value" } ...`   // ≤ 3840px

})
```

this `` s` css-property${ "css-value" }` `` maps CSS properties and enables all plugins which
create virtual CSS properties for you (weird properties that accept values other than strings or are not real CSS properties)
those ones are converted into the actual raw CSS (in the form `{ "raw-css-property":"raw-css-value" , ... }`).

**Example:**

```typescript
navbar.style(".nav", {
  all: s`p${spacing.md} bg${"#333"}`,
  sm: s`p${spacing.sm}`,
  lg: s`p${spacing.lg}`
});
```

##### `apply()`

Register the component's styles for compilation.

```typescript
component.apply()
```

##### `clone()`

Create a copy of the component with the same styles. then use style to extend and overwrite it

```typescript
const newComponent = component.clone()

newComponent.style( ".nav" {
    "all": s`flex${ {vertical:true} }`
})
```

---

### Template Literal (s)

The `s` template tag parses style definitions and applies plugins.

this `` s` css-property${ "css-value" }` `` maps CSS properties and enables all plugins which
create virtual CSS properties for you (weird properties that accept values other than strings or are not real CSS properties)
those ones are converted into the actual raw CSS (in the form `{ "raw-css-property":"raw-css-value" , ... }`).

#### Syntax

```typescript
s`property${value} another${value2}`
```

#### Example

```typescript
s`
  w${"100%"}
  h${scale.lg}
  flex${{ justify: "center", items: "center" }}
  bg${"#f0f0f0"}
`
```

---

### Plugin System

Plugins extend ClawsCSS with virtual CSS properties.

#### Registering a Plugin

```typescript
import { ClawsPluginRegistry } from 'claws-css';

ClawsPluginRegistry.register("pluginName", (input: any) => {
  return {
    "css-property": "value",
    "another-property": "value"
  };
});
```

#### Example: Simple Plugin

```typescript
ClawsPluginRegistry.register("shadow", (level: string) => {
  const shadows = {
    sm: "0 1px 2px rgba(0,0,0,0.1)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.2)"
  };
  return { "box-shadow": shadows[level] || level };
});

// Use it
s`shadow${"md"}`
// → box-shadow: 0 4px 6px rgba(0,0,0,0.1);
```

---

## Built-in Plugins

### Animation Plugin

Control CSS animations with a powerful, type-safe API.

#### Syntax

```typescript
import { Animation } from 'claws-css';

// Create animation (part of the core framework)
const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0}`,
  100: s`opacity${1}`
});

// Use animation plugin
animation${{
  keyframe: Animation,
  time?: string,
  func?: string,
  delay?: string,
  repeat?: number | "infinite",
  dir?: "normal" | "reverse" | "alternate",
  fillMode?: "none" | "forward" | "backward" | "both",
  playing?: boolean
}}
```

#### Properties

| Property | CSS Output | Description |
|----------|------------|-------------|
| `animation` | `animation-name` | Animation instance (required) |
| `time` | `animation-duration` | Duration (e.g., "300ms", "1s") |
| `func` | `animation-timing-function` | Timing function (e.g., "ease", "linear") |
| `delay` | `animation-delay` | Delay before start |
| `repeat` | `animation-iteration-count` | Number or "infinite" |
| `dir` | `animation-direction` | "normal", "reverse", or "alternate" |
| `fillMode` | `animation-fill-mode` | "none", "forward", "backward", "both" |
| `playing` | `animation-play-state` | `true` = running, `false` = paused |

#### Creating Animations

Use the `KeyFrame` class to define keyframes:

```typescript
import { Animation, s } from 'claws-css';

const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0}`,
  100: s`opacity${1}`
});

const slideUp = new KeyFrame("slideUp", {
  0: s`transform${"translateY(20px)"} opacity${0}`,
  100: s`transform${"translateY(0)"} opacity${1}`
});

const bounce = new KeyFrame("bounce", {
  0: s`transform${"translateY(0)"}`,
  50: s`transform${"translateY(-20px)"}`,
  100: s`transform${"translateY(0)"}`
});
```

#### Examples

**Basic Animations:**

```typescript
import { KeyFrame } from "claws-css";

const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0}`,
  100: s`opacity${1}`
});

new Component
Style(".element", {
  all: s`animation${{ keyframe: fadeIn, time: "300ms" }}`
});
// → animation-name: fadeIn;
// → animation-duration: 300ms;
```

**Complex Animations:**

```typescript
const slideIn = new KeyFrame("slideIn", {
  0: s`transform${"translateX(-100%)"} opacity${0}`,
  100: s`transform${"translateX(0)"} opacity${1}`
});

Style(".modal", {
  all: s`
    animation${{
      keyframe: slideIn,
      time: "500ms",
      func: cubicBezier(0.4, 0, 0.2, 1),
      delay: "100ms",
      fillMode: "both"
    }}
  `
});
// → animation-name: slideIn;
// → animation-duration: 500ms;
// → animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
// → animation-delay: 100ms;
// → animation-fill-mode: both;
```

**Infinite Loop:**

```typescript
const spin = new KeyFrame("spin", {
  0: s`transform${"rotate(0deg)"}`,
  100: s`transform${"rotate(360deg)"}`
});

Style(".loader", {
  all: s`
    animation${{
      keyframe: spin,
      time: "1s",
      func: "linear",
      repeat: "infinite"
    }}
  `
});
// → animation-iteration-count: infinite;
```

**Alternating Animations:**

```typescript
const pulse = new KeyFrame("pulse", {
  0: s`transform${"scale(1)"}`,
  50: s`transform${"scale(1.1)"}`,
  100: s`transform${"scale(1)"}`
});

Style(".button", {
  all: s`
    animation${{
      keyframe: pulse,
      time: "2s",
      repeat: "infinite",
      dir: "alternate"
    }}
  `
});
// → animation-direction: alternate;
```

**Paused Animation:**

```typescript
const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0}`,
  100: s`opacity${1}`
});

Style(".paused", {
  all: s`
    animation${{
      keyframe: fadeIn,
      time: "1s",
      playing: false
    }}
  `
});
// → animation-play-state: paused;

Style(".paused:hover", {
  all: s`
    animation${{
      keyframe: fadeIn,
      time: "1s",
      playing: true
    }}
  `
});
// → animation-play-state: running;
```

**Complex Multi-Stage Animation:**

```typescript
const complexEntry = new KeyFrame("complexEntry", {
  0: s`
    transform${"translateY(50px) scale(0.8)"}
    opacity${0}
  `,
  60: s`
    transform${"translateY(-10px) scale(1.05)"}
    opacity${1}
  `,
  80: s`
    transform${"translateY(5px) scale(0.95)"}
  `,
  100: s`
    transform${"translateY(0) scale(1)"}
  `
});

Style(".card", {
  all: s`
    animation${{
      keyframe: complexEntry,
      time: "800ms",
      func: "ease-out",
      fillMode: "both"
    }}
  `
});
```

#### Common Timing Functions

```typescript
// Predefined easing functions
func: "ease"           // Default
func: "linear"         // Constant speed
func: "ease-in"        // Slow start
func: "ease-out"       // Slow end
func: "ease-in-out"    // Slow start and end

// Custom cubic-bezier
func: "cubic-bezier(0.4, 0, 0.2, 1)"
```

#### Fill Mode Explained

| Mode | Description |
|------|-------------|
| `none` | No styles applied before/after animation |
| `forward` | Retain final keyframe styles after animation |
| `backward` | Apply first keyframe styles before animation |
| `both` | Apply both forward and backward rules |

**Example:**

```typescript
// Element stays faded in after animation
s`animation${{
  keyframe: fadeIn,
  time: "500ms",
  fillMode: "forward"
}}`
```

#### Animation Sequences

Create staggered animations:

```typescript
const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0} transform${"translateY(20px)"}`,
  100: s`opacity${1} transform${"translateY(0)"}`
});

Style(".item-1", {
  all: s`animation${{ keyframe: fadeIn, time: "500ms", delay: "0ms" }}`
});

Style(".item-2", {
  all: s`animation${{ keyframe: fadeIn, time: "500ms", delay: "100ms" }}`
});

Style(".item-3", {
  all: s`animation${{ keyframe: fadeIn, time: "500ms", delay: "200ms" }}`
});
```

#### Reusable Animations

Define animations once, use throughout your app:

```typescript
// animations.ts
export const animations = {
  fadeIn: new KeyFrame("fadeIn", {
    0: s`opacity${0}`,
    100: s`opacity${1}`
  }),
  
  slideUp: new KeyFrame("slideUp", {
    0: s`transform${"translateY(20px)"}`,
    100: s`transform${"translateY(0)"}`
  }),
  
  spin: new KeyFrame("spin", {
    0: s`transform${"rotate(0deg)"}`,
    100: s`transform${"rotate(360deg)"}`
  })
};

// Use anywhere
import { animations } from './animations';

Style(".loader", {
  all: s`animation${{ 
    keyframe: animations.spin, 
    time: "1s", 
    repeat: "infinite" 
  }}`
});
```

---

### Utility Shortcuts

ClawsCSS includes convenient shorthand plugins for common CSS properties.

#### Sizing

| Plugin | CSS Property | Example |
|--------|-------------|---------|
| `h` | `height` | `s\`h${"100px"}\`` |
| `max-h` | `max-height` | `s\`max-h${"500px"}\`` |
| `min-h` | `min-height` | `s\`min-h${"200px"}\`` |
| `w` | `width` | `s\`w${"100%"}\`` |
| `max-w` | `max-width` | `s\`max-w${"1200px"}\`` |
| `min-w` | `min-width` | `s\`min-w${"300px"}\`` |

**Examples:**

```typescript
// Full height container
s`h${"100vh"} w${"100%"}`

// Constrained card
s`max-w${"400px"} min-h${"200px"}`

// Responsive image
s`w${"100%"} h${"auto"} max-w${"800px"}`
```

#### Border Radius

| Plugin | CSS Property | Example |
|--------|-------------|---------|
| `radius` | `border-radius` | `s\`radius${"8px"}\`` |
| `radius-tl` | `border-top-left-radius` | `s\`radius-tl${"4px"}\`` |
| `radius-tr` | `border-top-right-radius` | `s\`radius-tr${"4px"}\`` |
| `radius-br` | `border-bottom-right-radius` | `s\`radius-br${"4px"}\`` |
| `radius-bl` | `border-bottom-left-radius` | `s\`radius-bl${"4px"}\`` |
| `radius-t` | Top corners | `s\`radius-t${"8px"}\`` |
| `radius-r` | Right corners | `s\`radius-r${"8px"}\`` |
| `radius-b` | Bottom corners | `s\`radius-b${"8px"}\`` |
| `radius-l` | Left corners | `s\`radius-l${"8px"}\`` |

**Examples:**

```typescript
// Fully rounded
s`radius${"9999px"}`

// Card with rounded top
s`radius-t${"12px"}`

// Custom corners
s`radius-tl${"20px"} radius-br${"20px"}`
```

#### Colors

| Plugin | CSS Property | Example |
|--------|-------------|---------|
| `fg` | `color` | `s\`fg${"#333"}\`` |
| `bg` | `background-color` | `s\`bg${"#f0f0f0"}\`` |
| `fill` | `fill` | `s\`fill${"currentColor"}\`` |

**Examples:**

```typescript
// Text and background
s`fg${"#333"} bg${"#fff"}`

// SVG fill
s`fill${"#ff6b6b"}`

// With transparency
s`bg${"rgba(0, 0, 0, 0.5)"}`
```

#### Typography

| Plugin | CSS Property | Example |
|--------|-------------|---------|
| `text` | `font-size` | `s\`text${"16px"}\`` |

**Examples:**

```typescript
// Heading sizes
s`text${"2rem"} fg${"#222"}`

// With scale
s`text${scale.lg}`
```

#### Spacing - Margin

| Plugin | CSS Property | Example |
|--------|-------------|---------|
| `m` | `margin` | `s\`m${"20px"}\`` |
| `mt` | `margin-top` | `s\`mt${"10px"}\`` |
| `mr` | `margin-right` | `s\`mr${"10px"}\`` |
| `mb` | `margin-bottom` | `s\`mb${"10px"}\`` |
| `ml` | `margin-left` | `s\`ml${"10px"}\`` |
| `mx` | `margin-left` + `margin-right` | `s\`mx${"20px"}\`` |
| `my` | `margin-top` + `margin-bottom` | `s\`my${"20px"}\`` |

**Examples:**

```typescript
// All sides
s`m${"20px"}`

// Specific sides
s`mt${"10px"} mb${"20px"}`

// Horizontal centering
s`mx${"auto"}`

// Vertical spacing
s`my${scale.lg}`
```

#### Spacing - Padding

| Plugin | CSS Property | Example |
|--------|-------------|---------|
| `p` | `padding` | `s\`p${"20px"}\`` |
| `pt` | `padding-top` | `s\`pt${"10px"}\`` |
| `pr` | `padding-right` | `s\`pr${"10px"}\`` |
| `pb` | `padding-bottom` | `s\`pb${"10px"}\`` |
| `pl` | `padding-left` | `s\`pl${"10px"}\`` |
| `px` | `padding-left` + `padding-right` | `s\`px${"20px"}\`` |
| `py` | `padding-top` + `padding-bottom` | `s\`py${"20px"}\`` |

**Examples:**

```typescript
// All sides
s`p${"20px"}`

// Specific sides
s`pt${"10px"} pb${"20px"}`

// Horizontal padding
s`px${scale.md}`

// Vertical padding
s`py${scale.lg}`
```

#### Combined Usage

```typescript
// Complete button styling
navbar.style(".button", {
  all: s`
    px${spacing.lg}
    py${spacing.md}
    bg${"#007bff"}
    fg${"#fff"}
    radius${"6px"}
    text${"14px"}
  `
});

// Card component
cards.style(".card", {
  all: s`
    p${spacing.lg}
    bg${"#fff"}
    radius${"12px"}
    max-w${"400px"}
    min-h${"200px"}
    m${spacing.md}
  `
});

// Hero section
hero.style(".hero", {
  all: s`
    h${"100vh"}
    w${"100%"}
    px${spacing.xl}
    py${spacing.xxl}
    bg${"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
    fg${"#fff"}
  `
});
```

---

### Flex Plugin

Create flexbox layouts with an intuitive API.

#### Syntax

```typescript
flex${{
  wrap?: "wrap" | "reverse" | null,
  vertical?: boolean,
  justify?: "center" | "start" | "end" | "between" | "around" | "evenly",
  items?: "center" | "start" | "end" | "baseline" | "stretch",
  content?: "center" | "start" | "end" | "between" | "around" | "evenly",
  reverse?: boolean
}}
```

#### Properties

| Property | CSS Output | Description |
|----------|------------|-------------|
| `vertical` | `flex-direction: column` | Stack items vertically |
| `reverse` | `flex-direction: *-reverse` | Reverse direction |
| `wrap` | `flex-wrap: wrap` | Allow wrapping |
| `justify` | `justify-content: *` | Main axis alignment |
| `items` | `align-items: *` | Cross axis alignment |
| `content` | `align-content: *` | Multi-line alignment |

#### Examples

```typescript
// Basic centered flex
s`flex${{ justify: "center", items: "center" }}`

// Vertical layout with wrapping
s`flex${{ vertical: true, wrap: "wrap", justify: "between" }}`

// Reverse row
s`flex${{ reverse: true, items: "start" }}`

// Space between with stretched items
s`flex${{ justify: "between", items: "stretch" }}`
```

---

### Flex Item Plugin

Control flex child properties.

#### Syntax

```typescript
flex-item${{
  grow?: number,
  shrink?: number,
  basis?: string | number,
  align?: "auto" | "start" | "end" | "center" | "baseline" | "stretch",
  order?: number
}}
```

#### Properties

| Property | CSS Output | Description |
|----------|------------|-------------|
| `grow` | `flex-grow: n` | Growth factor (default: 0) |
| `shrink` | `flex-shrink: n` | Shrink factor (default: 1) |
| `basis` | `flex-basis: value` | Initial size |
| `align` | `align-self: *` | Override parent alignment |
| `order` | `order: n` | Visual order |

#### Examples

```typescript
// Item grows to fill space
s`flex-item${{ grow: 1 }}`

// Fixed width item that doesn't shrink
s`flex-item${{ grow: 0, shrink: 0, basis: "200px" }}`

// Center this item specifically
s`flex-item${{ align: "center" }}`

// Move item to end
s`flex-item${{ order: 1 }}`
```

#### Common Patterns

```typescript
// Sidebar + main layout
Style(".sidebar", {
  all: s`flex-item${{ grow: 0, shrink: 0, basis: "250px" }}`
});

Style(".main", {
  all: s`flex-item${{ grow: 1 }}`
});

// Equal-width items
Style(".item", {
  all: s`flex-item${{ grow: 1, basis: "0" }}`
});
```

---

### Grid Plugin

Create CSS Grid layouts with powerful features.

#### Syntax

```typescript
grid${{
  cols?: number | string[],
  rows?: number | string[],
  gap?: string,
  gap_x?: string,
  gap_y?: string,
  justifyItems?: "start" | "end" | "center" | "stretch",
  alignItems?: "start" | "end" | "center" | "stretch" | "baseline",
  justifyContent?: "start" | "end" | "center" | "stretch" | "between" | "around" | "evenly",
  alignContent?: "start" | "end" | "center" | "stretch" | "between" | "around" | "evenly",
  auto?: { 
    flow?: "row" | "col" | "dense" | "row-dense" | "col-dense",
    rows?: string,
    cols?: string
  }
}}
```

#### Properties

| Property | CSS Output | Description |
|----------|------------|-------------|
| `cols` | `grid-template-columns` | Column track definitions |
| `rows` | `grid-template-rows` | Row track definitions |
| `gap` | `gap` | Spacing between cells |
| `gap_x` / `gap_y` | `column-gap` / `row-gap` | Directional gaps |
| `justifyItems` | `justify-items` | Horizontal item alignment |
| `alignItems` | `align-items` | Vertical item alignment |
| `justifyContent` | `justify-content` | Horizontal grid alignment |
| `alignContent` | `align-content` | Vertical grid alignment |
| `auto.flow` | `grid-auto-flow` | How auto-placed items flow |
| `auto.rows` | `grid-auto-rows` | Size of auto-created rows |
| `auto.cols` | `grid-auto-columns` | Size of auto-created columns |

#### Column/Row Syntax

**Number:** Converts to `repeat(n, 1fr)`

```typescript
grid${{ cols: 3 }}
// → grid-template-columns: repeat(3, 1fr);
```

**Array:** Joins array elements with spaces

```typescript
grid${{ cols: ["200px", "1fr", "200px"] }}
// → grid-template-columns: 200px 1fr 200px;

grid${{ cols: ["repeat(3, minmax(200px, 1fr))"] }}
// → grid-template-columns: repeat(3, minmax(200px, 1fr));
```

#### Examples

```typescript
// Simple 3-column grid
s`grid${{ cols: 3, gap: "20px" }}`

// Sidebar layout with array syntax
s`grid${{ cols: ["250px", "1fr"], rows: ["auto", "1fr", "auto"] }}`

// Responsive card grid
s`grid${{ 
  cols: ["repeat(auto-fit, minmax(250px, 1fr))"],
  gap: "16px"
}}`

// Dense packing
s`grid${{ 
  cols: 4,
  auto: { flow: "dense" },
  gap: "10px"
}}`

// Centered grid
s`grid${{ 
  cols: 3,
  justifyContent: "center",
  alignContent: "center"
}}`

// Auto-sizing rows
s`grid${{ 
  cols: 3,
  auto: { rows: "minmax(100px, auto)" }
}}`
```

---

### Grid Item Plugin

Control grid child placement and alignment with CSS optimization.

#### Syntax

```typescript
grid-item${{
  col?: number[],
  row?: number[],
  justifySelf?: "auto" | "start" | "end" | "center" | "stretch",
  alignSelf?: "auto" | "start" | "end" | "center" | "stretch" | "baseline"
}}
```

#### Properties

| Property | CSS Output | Description |
|----------|------------|-------------|
| `col` | `grid-column` or `grid-area` | Column placement [start, end] |
| `row` | `grid-row` or `grid-area` | Row placement [start, end] |
| `justifySelf` | `justify-self` or `place-self` | Horizontal self-alignment |
| `alignSelf` | `align-self` or `place-self` | Vertical self-alignment |

#### Placement Syntax

**Array Format:** `[start, end]`

```typescript
grid-item${{ col: [1, 3] }}
// → grid-column: 1 / 3;

grid-item${{ row: [2, 4] }}
// → grid-row: 2 / 4;
```

**Optimization:** When both `col` and `row` are set, uses `grid-area` shorthand:

```typescript
grid-item${{ col: [1, 3], row: [2, 4] }}
// → grid-area: 2 / 1 / 4 / 3;  (optimized!)
```

#### Alignment Optimization

When `justifySelf` and `alignSelf` are equal, uses `place-self` shorthand:

```typescript
grid-item${{ justifySelf: "center", alignSelf: "center" }}
// → place-self: center;  (optimized!)

grid-item${{ justifySelf: "start", alignSelf: "center" }}
// → justify-self: start;
// → align-self: center;
```

#### Examples

```typescript
// Span multiple columns
s`grid-item${{ col: [1, 4] }}`
// → grid-column: 1 / 4;

// Span multiple rows
s`grid-item${{ row: [1, 3] }}`
// → grid-row: 1 / 3;

// Place at specific position (optimized with grid-area)
s`grid-item${{ col: [2, 4], row: [1, 3] }}`
// → grid-area: 1 / 2 / 3 / 4;

// Center item in its cell (optimized with place-self)
s`grid-item${{ justifySelf: "center", alignSelf: "center" }}`
// → place-self: center;

// Different alignments (no optimization)
s`grid-item${{ justifySelf: "start", alignSelf: "end" }}`
// → justify-self: start;
// → align-self: end;

// Span to end of grid
s`grid-item${{ col: [1, -1] }}`
// → grid-column: 1 / -1;
```

#### Common Patterns

```typescript
// Featured card (2x2)
Style(".featured", {
  all: s`grid-item${{ col: [1, 3], row: [1, 3] }}`
  // → grid-area: 1 / 1 / 3 / 3;
});

// Header spanning all columns
Style(".header", {
  all: s`grid-item${{ col: [1, -1] }}`
  // → grid-column: 1 / -1;
});

// Sidebar in specific area
Style(".sidebar", {
  all: s`grid-item${{ col: [1, 2], row: [2, 4] }}`
  // → grid-area: 2 / 1 / 4 / 2;
});

// Centered item
Style(".centered", {
  all: s`grid-item${{ justifySelf: "center", alignSelf: "center" }}`
  // → place-self: center;
});
```

---

## Creating Custom Plugins

Extend ClawsCSS with your own virtual CSS properties.

### Basic Plugin

```typescript
import { ClawsPluginRegistry } from 'claws-css';

ClawsPluginRegistry.register("rounded", (value: string) => {
  const sizes = {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px"
  };
  return {
    "border-radius": sizes[value] || value
  };
});

// Use it
s`rounded${"md"}`
// → border-radius: 0.5rem;
```

### Complex Plugin

```typescript
ClawsPluginRegistry.register("transition", (config: {
  props?: string,
  duration?: string,
  easing?: string
}) => {
  const props = config.props || "all";
  const duration = config.duration || "200ms";
  const easing = config.easing || "ease";
  
  return {
    "transition": `${props} ${duration} ${easing}`
  };
});

// Use it
s`transition${{ props: "opacity", duration: "300ms", easing: "ease-in-out" }}`
// → transition: opacity 300ms ease-in-out;
```

### Plugin with Multiple CSS Properties

```typescript
ClawsPluginRegistry.register("glass", (opacity: number) => {
  return {
    "background": `rgba(255, 255, 255, ${opacity})`,
    "backdrop-filter": "blur(10px)",
    "-webkit-backdrop-filter": "blur(10px)",
    "border": "1px solid rgba(255, 255, 255, 0.2)"
  };
});

// Use it
s`glass${0.3}`
// → background: rgba(255, 255, 255, 0.3);
// → backdrop-filter: blur(10px);
// → -webkit-backdrop-filter: blur(10px);
// → border: 1px solid rgba(255, 255, 255, 0.2);
```

---

## Responsive Design

ClawsCSS uses mobile-first responsive breakpoints.

### Breakpoints

| Breakpoint | Max Width | Usage |
|------------|-----------|-------|
| `all` | - | All screen sizes (default) |
| `xs` | 319px | Very small phones |
| `sm` | 568px | Small phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Laptops |
| `xxl` | 1920px | Desktops |
| `xxxl` | 2560px | Large displays |
| `xxxxl` | 3840px | 4K displays |

### Example

```typescript
navbar.style(".nav", {
  all: s`
    flex${{ dir: "row", justify: "between" }}
    p${spacing.lg}
  `,
  
  md: s`
    flex${{ dir: "col" }}
    p${spacing.md}
  `,
  
  sm: s`
    p${spacing.sm}
  `
});
```

**Mobile-First Strategy:**

```typescript
// Start with mobile (all)
all: s`flex${{ dir: "col" }} p${spacing.sm}`,

// Override for larger screens
md: s`flex${{ dir: "row" }} p${spacing.md}`,
xl: s`p${spacing.lg}`
```

---

## Animation Support

Create smooth animations with the `KeyFrame` class and animation plugin.

### Creating Animations

Use the `Animation` class to define keyframes:

```typescript
import { Animation, s } from 'claws-css';

const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0}`,
  100: s`opacity${1}`
});
```

The `KeyFrame` class automatically registers keyframes globally - no need to call `.apply()` on a component!

### Using Animations

Apply animations using the animation plugin:

```typescript
Style(".element", {
  all: s`
    animation${{
      keyframe: fadeIn,
      time: "500ms",
      func: "ease-out"
    }}
  `
});
```

### Full Animation Control

The animation plugin supports all CSS animation properties:

```typescript
s`
  animation${{
    keyframe: slideIn,       // Animation instance
    time: "500ms",           // Duration
    func: "ease-in-out",     // Timing function
    delay: "100ms",          // Delay before start
    repeat: 3,               // Repeat 3 times (or "infinite")
    dir: "alternate",        // Direction
    fillMode: "both",        // Fill mode
    playing: true            // Play state
  }}
`
```

### Complex Keyframes

Create multi-stage animations:

```typescript
const complexEntry = new KeyFrame("complexEntry", {
  0: s`
    transform${"translateY(50px) scale(0.8)"}
    opacity${0}
  `,
  60: s`
    transform${"translateY(-10px) scale(1.05)"}
    opacity${1}
  `,
  80: s`
    transform${"translateY(5px) scale(0.95)"}
  `,
  100: s`
    transform${"translateY(0) scale(1)"}
  `
});
```

### Reusable Animation Library

Create a centralized animation library:

```typescript
// animations.ts
import { Animation, s } from 'claws-css';

export const animations = {
  fadeIn: new KeyFrame("fadeIn", {
    0: s`opacity${0}`,
    100: s`opacity${1}`
  }),
  
  slideUp: new KeyFrame("slideUp", {
    0: s`transform${"translateY(20px)"} opacity${0}`,
    100: s`transform${"translateY(0)"} opacity${1}`
  }),
  
  spin: new KeyFrame("spin", {
    0: s`transform${"rotate(0deg)"}`,
    100: s`transform${"rotate(360deg)"}`
  }),
  
  bounce: new KeyFrame("bounce", {
    0: s`transform${"translateY(0)"}`,
    50: s`transform${"translateY(-20px)"}`,
    100: s`transform${"translateY(0)"}`
  })
};

// Use anywhere in your app
import { animations } from './animations';

Style(".loader", {
  all: s`animation${{ 
    keyframe: animations.spin, 
    time: "1s", 
    repeat: "infinite",
    func: "linear"
  }}`
});
```

### Animation Sequences

Create staggered animations:

```typescript
const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0} transform${"translateY(20px)"}`,
  100: s`opacity${1} transform${"translateY(0)"}`
});

// Stagger items
Style(".item-1", {
  all: s`animation${{ keyframe: fadeIn, time: "500ms", delay: "0ms", fillMode: "both" }}`
});

Style(".item-2", {
  all: s`animation${{ keyframe: fadeIn, time: "500ms", delay: "100ms", fillMode: "both" }}`
});

Style(".item-3", {
  all: s`animation${{ keyframe: fadeIn, time: "500ms", delay: "200ms", fillMode: "both" }}`
});
```

See the [Animation Plugin](#animation-plugin) section for complete API reference.

---

## Best Practices

### 1. Use Scales for Consistency

```typescript
// ✅ Good: Consistent spacing
const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
s`p${spacing.md} m${spacing.lg}`

// ❌ Bad: Magic numbers
s`p${"17px"} m${"23px"}`
```

### 2. Organize by Components

```typescript
// ✅ Good: One component per UI component
const navbar = new Component();
const footer = new Component();
const sidebar = new Component();

// ❌ Bad: Everything in one component
const styles = new Component();
```

### 3. Mobile-First Responsive

```typescript
// ✅ Good: Start mobile, override larger
navbar.style(".nav", {
  all: s`flex${{ dir: "col" }}`,    // Mobile first
  md: s`flex${{ dir: "row" }}`      // Desktop override
});

// ❌ Bad: Desktop-first requires more overrides
navbar.style(".nav", {
  all: s`flex${{ dir: "row" }}`,
  sm: s`flex${{ dir: "col" }}`
});
```

### 4. Leverage Grid Arrays for Clarity

```typescript
// ✅ Good: Array syntax is clear
s`grid${{ cols: ["250px", "1fr", "200px"] }}`

// ❌ Bad: String templates are harder to maintain
s`grid${{ cols: "250px 1fr 200px" }}`  // This doesn't work!
```

### 5. Use CSS Optimization Features

```typescript
// ✅ Good: Let ClawsCSS optimize
s`grid-item${{ 
  col: [1, 3], 
  row: [2, 4],
  justifySelf: "center",
  alignSelf: "center"
}}`
// → grid-area: 2 / 1 / 4 / 3;
// → place-self: center;

// ❌ Bad: Manual properties miss optimization
// (Don't use raw CSS properties when plugins exist)
```

### 6. Use the Animation Plugin for Full Control

```typescript
// ✅ Good: Full animation control
const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0}`,
  100: s`opacity${1}`
});

s`animation${{
  keyframe: fadeIn,
  time: "500ms",
  func: "ease-out",
  fillMode: "both"
}}`

// ❌ Bad: Manual CSS string (less control, no validation) 
s`animation:fadeIn 500ms ease-out both`
```

> the raw CSS property `animation` is blocked by this plugin

### 7. Create Animation Libraries

```typescript
// ✅ Good: Centralized animation library
// animations.ts
export const animations = {
  fadeIn: new KeyFrame("fadeIn", { /* ... */ }),
  slideUp: new KeyFrame("slideUp", { /* ... */ })
};

// Use anywhere
import { animations } from './animations';
s`animation${{ keyframe: animations.fadeIn, time: "300ms" }}`

// ❌ Bad: Duplicate animation definitions
const fadeIn1 = new KeyFrame("fadeIn1", { /* ... */ });
const fadeIn2 = new KeyFrame("fadeIn2", { /* same keyframes */ });
```

### 8. Name Selectors Semantically

```typescript
// ✅ Good: Semantic names
navbar.style(".nav-item", { /* ... */ });
navbar.style(".nav-link", { /* ... */ });

// ❌ Bad: Presentation-based names
navbar.style(".blue-text", { /* ... */ });
navbar.style(".big-padding", { /* ... */ });
```

### 9. Don't Forget to Apply!

```typescript
const navbar = new Component();
navbar.style(".nav", { /* ... */ });

// ✅ Don't forget!
navbar.apply();
```

---

## Examples

### Complete Navigation Bar

```typescript
import { Scale, Component, s, Animation } from 'claws-css';

const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
const navbar = new Component();

const slideIn = new KeyFrame("slideIn", {
  0: s`transform${"translateY(-100%)"}`,
  100: s`transform${"translateY(0)"}`
});

navbar.style(".navbar", {
  all: s`
    flex${{ justify: "between", items: "center" }}
    p${spacing.lg}
    bg${"#333"}
    animation${{ keyframe: slideIn, time: "300ms", func: "ease-out" }}
  `,
  sm: s`
    flex${{ dir: "col" }}
    p${spacing.md}
  `
});

navbar.style(".nav-link", {
  all: s`
    p${spacing.sm}
    fg${"#fff"}
  `
});

navbar.style(".nav-link:hover", {
  all: s`bg${"#555"}`
});

navbar.apply();
```

### Responsive Card Grid

```typescript
import { Scale, Component, s } from 'claws-css';

const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
const cards = new Component();

cards.style(".card-grid", {
  all: s`
    grid${{ cols: 1, gap: spacing.md }}
  `,
  sm: s`grid${{ cols: 2 }}`,
  md: s`grid${{ cols: 3 }}`,
  lg: s`grid${{ cols: 4, gap: spacing.lg }}`
});

cards.style(".card", {
  all: s`
    p${spacing.md}
    bg${"#fff"}
    radius${"8px"}
  `
});

cards.style(".card.featured", {
  all: s`
    grid-item${{ col: [1, 3], row: [1, 3] }}
    bg${"#f0f0f0"}
  `
});

cards.apply();
```

### Dashboard Layout

```typescript
import { Component, s } from 'claws-css';

const dashboard = new Component();

dashboard.style(".dashboard", {
  all: s`
    grid${{
      cols: ["250px", "1fr"],
      rows: ["60px", "1fr", "40px"],
      gap: "0"
    }}
    h${"100vh"}
  `,
  sm: s`grid${{ cols: 1, rows: ["auto"] }}`
});

dashboard.style(".sidebar", {
  all: s`
    grid-item${{ row: [1, -1] }}
    bg${"#2c3e50"}
  `,
  sm: s`grid-item${{ row: [1, 2] }}`
});

dashboard.style(".header", {
  all: s`
    grid-item${{ col: [2, 3] }}
    flex${{ items: "center" }}
    px${"20px"}
    bg${"#34495e"}
  `
});

dashboard.style(".content", {
  all: s`
    grid-item${{ col: [2, 3] }}
    p${"20px"}
    overflow-y${"auto"}
  `
});

dashboard.style(".footer", {
  all: s`
    grid-item${{ col: [2, 3] }}
    flex${{ items: "center", justify: "center" }}
    bg${"#34495e"}
  `
});

dashboard.apply();
```

### Advanced Grid with Auto-fit

```typescript
import { Scale, Component, s } from 'claws-css';

const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
const gallery = new Component();

gallery.style(".photo-gallery", {
  all: s`
    grid${{
      cols: ["repeat(auto-fit, minmax(250px, 1fr))"],
      gap: spacing.md,
      auto: { rows: "250px", flow: "dense" }
    }}
  `,
  sm: s`
    grid${{
      cols: ["repeat(auto-fit, minmax(150px, 1fr))"],
      gap: spacing.sm
    }}
  `
});

gallery.style(".photo", {
  all: s`
    w${"100%"}
    h${"100%"}
    object-fit${"cover"}
    radius${spacing.xs}
  `
});

gallery.style(".photo.wide", {
  all: s`grid-item${{ col: [1, 3] }}`
});

gallery.style(".photo.tall", {
  all: s`grid-item${{ row: [1, 3] }}`
});

gallery.apply();
```

### Form Layout with Grid

```typescript
import { Scale, Component, s } from 'claws-css';

const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
const form = new Component();

form.style(".form", {
  all: s`
    grid${{
      cols: ["1fr", "1fr"],
      gap: spacing.md
    }}
    max-w${"600px"}
    mx${"auto"}
    p${spacing.lg}
  `,
  sm: s`grid${{ cols: 1 }}`
});

form.style(".form-field", {
  all: s`
    flex${{ dir: "col" }}
    gap${spacing.sm}
  `
});

form.style(".form-field.full-width", {
  all: s`grid-item${{ col: [1, -1] }}`
});

form.style(".form input, .form textarea", {
  all: s`
    p${spacing.sm}
    radius${spacing.xs}
    border${"1px solid #ddd"}
  `
});

form.style(".form button", {
  all: s`
    grid-item${{ col: [1, -1] }}
    p${spacing.md}
    bg${"#007bff"}
    fg${"#fff"}
    radius${spacing.sm}
    border${"none"}
  `
});

form.apply();
```

---

## Troubleshooting

### Styles Not Appearing

1. **Did you call `.apply()`?**

   ```typescript
   component.apply(); // Don't forget!
   ```

2. **Is the CSS file being generated?**
   * Check for a `.css` file next to your script
   * Verify `process.argv[1]` is set correctly

3. **Are you importing the plugin?**

   ```typescript
   import './plugins/flex.js'; // Import to register
   ```

### TypeScript Errors

1. **Your plugin isn't working:**
   * Ensure the plugin file is imported
   * Check that `ClawsPluginRegistry.register()` is called

2. **Type errors in template literal:**
   * Make sure you're using the `s` tag
   * Verify virtual CSS properties parameters

### Animation Not Working

1. **Did you save the animation reference?**

   ```typescript
   const fadeIn = component.animate("fadeIn", { /* ... */ });
   // Use: animation:${fadeIn}
   ```

2. **Is the animation applied to the right element?**

   ```typescript
   s`keyframe:${fadeIn} 300ms ease-out`
   ```

### Grid Arrays Not Working

1. **Did you wrap grid template in an array?**

   ```typescript
   // ✅ Correct
   grid${{ cols: ["200px", "1fr", "200px"] }}
   
   // ❌ Wrong
   grid${{ cols: "200px 1fr 200px" }}
   ```

2. **Are all array elements strings?**

   ```typescript
   // ✅ Correct
   grid${{ cols: ["1fr", "2fr"] }}
   
   // ❌ Wrong
   grid${{ cols: [1, 2] }}  // Numbers not allowed in arrays
   ```

---

## Performance & Optimization

### CSS Output Optimization

ClawsCSS automatically optimizes CSS output:

1. **Grid Area Shorthand:** When both `col` and `row` are set, uses `grid-area`

   ```typescript
   grid-item${{ col: [1, 3], row: [2, 4] }}
   // → grid-area: 2 / 1 / 4 / 3;  (1 property instead of 2)
   ```

2. **Place Self Shorthand:** When alignment values match, uses `place-self`

   ```typescript
   grid-item${{ justifySelf: "center", alignSelf: "center" }}
   // → place-self: center;  (1 property instead of 2)
   ```

3. **Values Rounded to 4px Grid:** Ensures pixel-perfect alignment

   ```typescript
   const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
   // All values rounded to nearest 4px multiple
   ```

### Best Practices for Performance

1. **Use number shortcuts for simple grids:**

   ```typescript
   grid${{ cols: 3 }}  // Faster than arrays for simple cases
   ```

2. **Leverage CSS optimizations:**

   ```typescript
   // Let ClawsCSS optimize automatically
   grid-item${{ col: [1, 3], row: [2, 4] }}  // Uses grid-area
   ```

3. **Reuse scales across components:**

   ```typescript
   // Define once, use everywhere
   const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
   ```

---

## Migration Guide

### From Clanga CSS

ClawsCSS is the spiritual successor to Clanga CSS with improved architecture:

**Key Changes:**

1. **Template Literals over Method Chaining:**

   ```typescript
   // Clanga
   Div().align({ xcenter: true }).shape({ w: "100%" })
   
   // ClawsCSS
   s`w${"100%"} mx${"auto"}`
   ```

2. **Plugin System:**

   ```typescript
   // ClawsCSS uses extensible plugins
   ClawsPluginRegistry.register("custom", (val) => ({ ... }))
   ```

3. **Auto-Compilation:**

   ```typescript
   // No more manual .apply() everywhere
   component.apply()  // Just once at the end
   ```

4. **Simplified API:**
   * Shorter property names (`p`, `m`, `w`, `h`)
   * More intuitive flex/grid syntax
   * Array support for grid templates

---

## Advanced Topics

### Creating Plugin Packs

Group related plugins together:

```typescript
// shadows.plugin.ts
import { ClawsPluginRegistry } from 'claws-css';

const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.05)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.1)",
  xl: "0 20px 25px rgba(0,0,0,0.15)",
  inner: "inset 0 2px 4px rgba(0,0,0,0.06)"
};

ClawsPluginRegistry.register("shadow", (level: string) => ({
  "box-shadow": shadows[level] || level
}));

ClawsPluginRegistry.register("shadow-text", (level: string) => ({
  "text-shadow": shadows[level] || level
}));

// Import entire pack
import './plugins/shadows.plugin.js';
```

### Dynamic Scale Generation

Create scales based on design tokens:

```typescript
const tokens = {
  space: new Scale({ base: 4, unit: "px", scale: 1.2 }),
  fontSize: new Scale({ base: 16, unit: "px", scale: 1.25 }),
  lineHeight: new Scale({ base: 1.5, unit: "", scale: 1.2 })
};

// Use throughout app
s`
  p${tokens.space.md}
  text${tokens.fontSize.lg}
  line-height${tokens.lineHeight.md}
`
```

### Component Composition

Combine components for complex layouts:

```typescript
const layout = new Component();
const theme = new Component();

// Define base layout
layout.style(".container", { /* ... */ });

// Define theme styles
theme.style(".container", { /* ... */ });

// Both apply - styles merge
layout.apply();
theme.apply();
```

---

## FAQ

### Can I use ClawsCSS with React/Vue/Svelte?

Yes! ClawsCSS generates plain CSS files that work with any framework.

### How do I use ClawsCSS in production?

Run your Node.js script during build time. The generated `.css` file is what you deploy.

### Can I use ClawsCSS without TypeScript?

Yes! The plugin system works in vanilla JavaScript. You'll just lose type checking.

### How does ClawsCSS compare to Tailwind?

* **ClawsCSS:** Write styles programmatically with plugins, generates custom CSS
* **Tailwind:** Utility-first classes in HTML, larger CSS bundle
* **Use ClawsCSS when:** You want programmatic styling, type safety, and custom design systems

### Can I extend the Scale system?

Yes! Create custom scale algorithms by modifying the Scale class or create wrapper functions.

### Does ClawsCSS support theming?

Yes! Create theme objects and use them throughout your styles:

```typescript
const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d"
  },
  spacing: new Scale({ base: 4, unit: "px", scale: 1.2 })
};

s`bg${theme.colors.primary} p${theme.spacing.lg}`
```

---

## Contributing

Contributions welcome! ClawsCSS is open source and we'd love your help.

**Ways to Contribute:**

* Report bugs and issues
* Suggest new features or plugins
* Submit pull requests
* Improve documentation
* Share your projects built with ClawsCSS

---

## License

MIT License - See LICENSE file for details

---

## Acknowledgments

ClawsCSS is the successor to Clanga CSS, rebuilt from the ground up with a plugin-first architecture for maximum extensibility and developer experience.

**Philosophy:** Styling should be programmatic, type-safe, and optimized by default.

---

## Learn More

* **GitHub:** [Link to repository]
* **npm:** `npm install claws-css`
* **Discord:** [Community link]
* **Examples:** [CodeSandbox examples]

---

**Ready to build something amazing?** 🚀

```typescript
import { Scale, Component, s } from 'claws-css';

const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
const app = new Component();

app.style(".app", {
  all: s`
    h${"100vh"}
    w${"100%"}
    flex${{ justify: "center", items: "center" }}
    bg${"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
  `
});

app.apply();
```

**Welcome to ClawsCSS.** 🦅
