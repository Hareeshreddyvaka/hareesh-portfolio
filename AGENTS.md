## Pre-task requirement
Before making ANY code changes:
- Run: graphify query "affected modules"  
- Read: graphify-out/GRAPH_REPORT.md

After ALL changes:
- Run: graphify update .
- Run: npm run test:run
- Run: npx tsc --noEmit
- Append results to SPRINT_REPORT.md

## Protected directories
Never modify: dist/, docs/, graphify-out/
## Sprint tracking
Maintain SPRINT_REPORT.md at root. Append results after every task.
Never modify files in dist/ or docs/.
## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
