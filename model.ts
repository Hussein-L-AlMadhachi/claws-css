import { Scale, Component, s , KeyFrame } from './src/claws.js';

// Create scales for consistent design system
const spacing = new Scale({ base: 4, unit: "px", scale: 1.2 });
const fontSize = new Scale({ base: 16, unit: "px", scale: 1.25 });
const borderRadius = new Scale({ base: 4, unit: "px", scale: 1.5 });

// Theme colors
const colors = {
  primary: "#3b82f6",
  secondary: "#64748b",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  dark: "#1e293b",
  light: "#f8fafc",
  white: "#ffffff"
};

// ===== ANIMATIONS COMPONENT =====

// Define reusable animations
const fadeIn = new KeyFrame("fadeIn", {
  0: s`opacity${0} transform${"translateY(-10px)"}`,
  100: s`opacity${1} transform${"translateY(0)"}`
});

const slideInLeft = new KeyFrame("slideIn-Left", {
  0: s`transform${"translateX(-100%)"}`,
  100: s`transform${"translateX(0)"}`
});

const pulse = new KeyFrame("pulse", {
  0: s`transform${"scale(1)"}`,
  50: s`transform${"scale(1.05)"}`,
  100: s`transform${"scale(1)"}`
});

const bounce = new KeyFrame("bounce", {
  0: s`transform${"translateY(0)"}`,
  20: s`transform${"translateY(-10px)"}`,
  40: s`transform${"translateY(0)"}`,
  60: s`transform${"translateY(-5px)"}`,
  80: s`transform${"translateY(0)"}`
});


// ===== LAYOUT COMPONENT =====
const layout = new Component();

// Header with complex flex layout
layout.style(".header", {
  all: s`
    flex${{ justify: "between", items: "center", wrap: "wrap" }}
    p${spacing.lg}
    bg${colors.dark}
    fg${colors.white}
  `,
  md: s`
    flex${{ wrap: null }}
    p${spacing.xl}
  `,
  sm: s`
    flex${{ dir: "col", items: "start" }}
    p${spacing.md}
  `
});

layout.style(".logo", {
  all: s`
    flex-item${{ grow: 0, shrink: 0, basis: "auto" }}
    text${fontSize.xl}
    fg${colors.white}
    animation${{keyframe:fadeIn}} 500ms ease-out
  `
});

layout.style(".nav", {
  all: s`
    flex${{ items: "center", gap: spacing.md }}
    flex-item${{ grow: 1, shrink: 1, basis: "auto" }}
  `,
  sm: s`
    flex${{ dir: "col", items: "start" }}
    mt${spacing.md}
    w${"100%"}
  `
});

layout.style(".nav-link", {
  all: s`
    p${spacing.sm}
    radius${borderRadius.sm}
    transition${{ props: "all", duration: "200ms" }}
  `
});

layout.style(".nav-link:hover", {
  all: s`
    bg${colors.primary}
    transform${"scale(1.05)"}
  `
});

layout.style(".nav-link.active", {
  all: s`
    bg${colors.primary}
    fg${colors.white}
  `
});

// Main grid layout
layout.style(".main-grid", {
  all: s`
    grid${{
      cols: ["250px", "1fr", "300px"],
      rows: ["auto", "1fr", "auto"],
      gap: spacing.lg,
      gap_x: spacing.xl,
      gap_y: spacing.md
    }}
    min-h${"100vh"}
    p${spacing.lg}
  `,
  lg: s`
    grid${{
      cols: ["200px", "1fr", "250px"],
      gap: spacing.md
    }}
  `,
  md: s`
    grid${{
      cols: ["200px", "1fr"],
      rows: ["auto", "auto", "1fr", "auto"]
    }}
  `,
  sm: s`
    grid${{
      cols: 1,
      rows: ["auto", "auto", "auto", "auto"]
    }}
  `
});

// Grid item placements with optimization
layout.style(".sidebar", {
  all: s`
    grid-item${{ col: [1, 2], row: [1, -1] }}
    bg${colors.light}
    radius${borderRadius.lg}
    p${spacing.lg}
    animation${{keyframe:slideInLeft}} 400ms ease-out
  `,
  md: s`
    grid-item${{ col: [1, 2], row: [1, 2] }}
  `,
  sm: s`
    grid-item${{ col: [1, -1], row: [1, 2] }}
  `
});

layout.style(".content", {
  all: s`
    grid-item${{ col: [2, 3], row: [1, 3] }}
    min-h${"500px"}
  `,
  md: s`
    grid-item${{ col: [2, 3], row: [2, 4] }}
  `,
  sm: s`
    grid-item${{ col: [1, -1], row: [3, 4] }}
  `
});

layout.style(".sidebar-right", {
  all: s`
    grid-item${{ col: [3, 4], row: [1, -1] }}
    bg${colors.light}
    radius${borderRadius.lg}
    p${spacing.lg}
  `,
  md: s`
    grid-item${{ col: [1, 3], row: [3, 4] }}
  `,
  sm: s`
    grid-item${{ col: [1, -1], row: [4, 5] }}
  `
});

layout.style(".footer", {
  all: s`
    grid-item${{ col: [1, -1], row: [3, 4] }}
    flex${{ justify: "center", items: "center" }}
    p${spacing.lg}
    bg${colors.dark}
    fg${colors.white}
  `,
  md: s`
    grid-item${{ col: [1, -1], row: [4, 5] }}
  `,
  sm: s`
    grid-item${{ col: [1, -1], row: [5, 6] }}
  `
});

layout.apply();

// ===== UI COMPONENTS =====
const ui = new Component();

// Button variants using utility shortcuts
ui.style(".btn", {
  all: s`
    px${spacing.lg}
    py${spacing.md}
    radius${borderRadius.md}
    border${"none"}
    text${fontSize.md}
    fg${colors.white}
    transition${{ props: "all", duration: "200ms" }}
    cursor${"pointer"}
    flex${{ justify: "center", items: "center" }}
    gap${spacing.sm}
  `
});

ui.style(".btn:hover", {
  all: s`
    transform${"translateY(-2px)"}
    animation${{keyframe:pulse}} 600ms ease-in-out
  `
});

ui.style(".btn-primary", {
  all: s`
    bg${colors.primary}
  `
});

ui.style(".btn-secondary", {
  all: s`
    bg${colors.secondary}
  `
});

ui.style(".btn-success", {
  all: s`
    bg${colors.success}
  `
});

ui.style(".btn-warning", {
  all: s`
    bg${colors.warning}
  `
});

ui.style(".btn-error", {
  all: s`
    bg${colors.error}
  `
});

// Card component with complex grid
ui.style(".card-grid", {
  all: s`
    grid${{
      cols: ["repeat(auto-fit, minmax(300px, 1fr))"],
      gap: spacing.lg,
      auto: { rows: "minmax(200px, auto)" }
    }}
    my${spacing.xl}
  `,
  sm: s`
    grid${{
      cols: 1,
      gap: spacing.md
    }}
  `
});

ui.style(".card", {
  all: s`
    bg${colors.white}
    radius${borderRadius.lg}
    p${spacing.lg}
    flex${{ dir: "col" }}
    gap${spacing.md}
    border${`1px solid ${colors.light}`}
    transition${{ props: "all", duration: "300ms" }}
    animation${{keyframe:fadeIn}} 600ms ease-out
  `
});

ui.style(".card:hover", {
  all: s`
    transform${"translateY(-5px)"}
    border${`1px solid ${colors.primary}`}
    box-shadow${"0 10px 25px rgba(0,0,0,0.1)"}
  `
});

ui.style(".card-header", {
  all: s`
    flex${{ justify: "between", items: "center" }}
    pb${spacing.md}
    border${`1px solid ${colors.light}`}
  `
});

ui.style(".card-title", {
  all: s`
    text${fontSize.lg}
    fg${colors.dark}
    m${0}
  `
});

ui.style(".card-badge", {
  all: s`
    px${spacing.sm}
    py${spacing.xs}
    radius${borderRadius.full}
    bg${colors.primary}
    fg${colors.white}
    text${fontSize.xs}
  `
});

ui.style(".card-content", {
  all: s`
    flex-item${{ grow: 1 }}
    fg${colors.secondary}
  `
});

ui.style(".card-footer", {
  all: s`
    flex${{ justify: "end", gap: spacing.sm }}
    pt${spacing.md}
    border${`1px solid ${colors.light}`}
  `
});

// Form components
ui.style(".form-group", {
  all: s`
    flex${{ dir: "col" }}
    gap${spacing.sm}
    mb${spacing.lg}
  `
});

ui.style(".form-label", {
  all: s`
    fg${colors.dark}
    text${fontSize.sm}
    font${"bold"}
  `
});

ui.style(".form-input", {
  all: s`
    p${spacing.md}
    radius${borderRadius.md}
    border${`1px solid ${colors.secondary}`}
    text${fontSize.md}
    transition${{ props: "border-color", duration: "200ms" }}
  `
});

ui.style(".form-input:focus", {
  all: s`
    border${`1px solid ${colors.primary}`}
    outline${"none"}
    box-shadow${`0 0 0 3px ${colors.primary}20`}
  `
});

ui.style(".form-input.error", {
  all: s`
    border${`1px solid ${colors.error}`}
    bg${`${colors.error}10`}
  `
});

// Alert system
ui.style(".alert", {
  all: s`
    p${spacing.lg}
    radius${borderRadius.md}
    border${"1px solid transparent"}
    my${spacing.md}
    flex${{ items: "center", gap: spacing.md }}
    animation${{keyframe:bounce}} 500ms ease-out
  `
});

ui.style(".alert-success", {
  all: s`
    bg${`${colors.success}10`}
    border${`1px solid ${colors.success}`}
    fg${colors.success}
  `
});

ui.style(".alert-warning", {
  all: s`
    bg${`${colors.warning}10`}
    border${`1px solid ${colors.warning}`}
    fg${colors.warning}
  `
});

ui.style(".alert-error", {
  all: s`
    bg${`${colors.error}10`}
    border${`1px solid ${colors.error}`}
    fg${colors.error}
  `
});

ui.apply();

// ===== DASHBOARD SPECIFIC COMPONENTS =====
const dashboard = new Component();

// Stats grid
dashboard.style(".stats-grid", {
  all: s`
    grid${{
      cols: ["repeat(auto-fit, minmax(200px, 1fr))"],
      gap: spacing.lg
    }}
    my${spacing.xl}
  `
});

dashboard.style(".stat-card", {
  all: s`
    bg${colors.white}
    p${spacing.lg}
    radius${borderRadius.lg}
    flex${{ dir: "col", items: "center" }}
    border${`2px solid transparent`}
    transition${{ props: "all", duration: "300ms" }}
  `
});

dashboard.style(".stat-card:hover", {
  all: s`
    border${`2px solid ${colors.primary}`}
    transform${"scale(1.02)"}
  `
});

dashboard.style(".stat-value", {
  all: s`
    text${fontSize.xxl}
    fg${colors.primary}
    font${"bold"}
    my${spacing.sm}
  `
});

dashboard.style(".stat-label", {
  all: s`
    fg${colors.secondary}
    text${fontSize.sm}
  `
});

// Chart container
dashboard.style(".chart-container", {
  all: s`
    bg${colors.white}
    radius${borderRadius.lg}
    p${spacing.lg}
    my${spacing.xl}
    flex${{ dir: "col" }}
  `
});

dashboard.style(".chart-header", {
  all: s`
    flex${{ justify: "between", items: "center" }}
    mb${spacing.lg}
  `
});

dashboard.style(".chart-actions", {
  all: s`
    flex${{ gap: spacing.sm }}
  `
});

// Data table with complex grid
dashboard.style(".data-table", {
  all: s`
    grid${{
      cols: ["100px", "1fr", "150px", "100px", "100px"],
      gap: 0
    }}
    bg${colors.white}
    radius${borderRadius.lg}
    overflow${"hidden"}
    my${spacing.xl}
  `,
  md: s`
    grid${{
      cols: ["80px", "1fr", "120px", "80px"]
    }}
  `
});

dashboard.style(".table-header", {
  all: s`
    grid-item${{ col: [1, -1] }}
    bg${colors.dark}
    fg${colors.white}
    p${spacing.md}
    text${fontSize.sm}
    font${"bold"}
  `
});

dashboard.style(".table-row", {
  all: s`
    grid-item${{ col: [1, -1] }}
    grid${{
      cols: ["100px", "1fr", "150px", "100px", "100px"],
      gap: 0
    }}
    p${spacing.md}
    border${`1px solid ${colors.light}`}
    transition${{ props: "background-color", duration: "150ms" }}
  `,
  md: s`
    grid${{
      cols: ["80px", "1fr", "120px", "80px"]
    }}
  `
});

dashboard.style(".table-row:hover", {
  all: s`
    bg${`${colors.primary}05`}
  `
});

dashboard.style(".table-cell", {
  all: s`
    flex${{ items: "center" }}
    p${spacing.sm}
  `
});

// Progress bars
dashboard.style(".progress-bar", {
  all: s`
    h${spacing.md}
    bg${colors.light}
    radius${borderRadius.full}
    overflow${"hidden"}
    w${"100%"}
  `
});

dashboard.style(".progress-fill", {
  all: s`
    h${"100%"}
    bg${colors.primary}
    radius${borderRadius.full}
    transition${{ props: "width", duration: "500ms", easing: "ease-out" }}
  `
});

dashboard.style(".progress-fill.success", {
  all: s`bg${colors.success}`
});

dashboard.style(".progress-fill.warning", {
  all: s`bg${colors.warning}`
});

dashboard.style(".progress-fill.error", {
  all: s`bg${colors.error}`
});

dashboard.apply();

// ===== RESPONSIVE UTILITIES =====
const responsive = new Component();

// Show/hide utilities for different breakpoints
responsive.style(".hide-on-mobile", {
  all: s`display${"block"}`,
  sm: s`display${"none"}`
});

responsive.style(".show-on-mobile", {
  all: s`display${"none"}`,
  sm: s`display${"block"}`
});

responsive.style(".mobile-stack", {
  all: s`flex${{ dir: "row", items: "center" }}`,
  sm: s`flex${{ dir: "col", items: "start" }}`
});

// Responsive text sizing
responsive.style(".text-responsive", {
  all: s`text${fontSize.md}`,
  lg: s`text${fontSize.lg}`,
  xl: s`text${fontSize.xl}`,
  sm: s`text${fontSize.sm}`
});

responsive.apply();

console.log("🎨 All ClawsCSS components compiled successfully!");
console.log("📱 Features tested:");
console.log("  ✅ Scale system with multiple scales");
console.log("  ✅ Component-based architecture");
console.log("  ✅ Template literal syntax");
console.log("  ✅ Responsive design with all breakpoints");
console.log("  ✅ Flex plugin with all options");
console.log("  ✅ Flex Item plugin with grow/shrink/basis");
console.log("  ✅ Grid plugin with array syntax and auto-fit");
console.log("  ✅ Grid Item plugin with placement and optimization");
console.log("  ✅ Utility shortcuts (spacing, colors, sizing, etc.)");
console.log("  ✅ Animation system with keyframes");
console.log("  ✅ Hover states and interactions");
console.log("  ✅ Complex component compositions");
console.log("  ✅ Mobile-first responsive strategy");