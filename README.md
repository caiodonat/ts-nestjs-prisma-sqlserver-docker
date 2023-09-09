## Tech Stack

### Main Techs

-   Language : `TypeScript` (5.1.3)
-   Web Application framework : `NestJS` (10.0.0)
-   Database : `SQL Server` (2022)
-   Object-Relational Mapping (ORM) : `Prisma` (5.2.0)
-   Package manager : `NPM` (9.8.0)

### Libraries

-   Build : `Node` (20.5.1)
-   Schema validation : `Zod` (3.22.2)
-   API documentation : `nestjs/swagger` (7.1.10) | `OpenAPI` (3.0.0)
-   Technical documentation : `Compodoc` (1.1.21)

### Development Environment

-   OS : `Win` (11) | `WSL 2` (Ubuntu 22.04)
-   IDE : `VS Code` (^1.82.0)

---

## Utilities

### Get repo statistics

```bash
tokei --exclude *.sql *.toml --sort code > .vscode/detail/$(date --utc +%FT%TZ)
```
