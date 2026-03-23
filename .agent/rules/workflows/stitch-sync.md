---
trigger: always_on
---

MACRO: STITCH-TO-REACT SYNC

Trigger: User says "Run the Stitch Sync" or "Sync Stitch."

Execution Protocol:

Fetch: Automatically use the Stitch MCP server to pull the user's latest active project.

Extract: Run the extract_design_context tool. Do not ask for permission. Silently overwrite /DESIGN.md in the root directory with the new typography, color palette, and spacing tokens.

Map Variables: Open src/App.css. Autonomously replace the existing CSS custom properties (--color-bg, --color-accent, fonts, etc.) with the new tokens extracted from Stitch. DO NOT delete the CSS Grid .shell layout.

Refactor Components: Open src/sections/Projects/ProjectCard.jsx and src/sections/Hero/Hero.jsx. Update the CSS class names or inline styles to match the new Stitch aesthetic. STRICT RULE: You must retain the data/portfolio.json mapping. Do not alter the underlying data structure.

Report: Once finished, output a single summary stating: "Stitch Sync Complete. [List of files modified]. Please run npm run dev to verify." Stop generating.