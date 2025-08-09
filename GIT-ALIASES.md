# Git Flow - Alias y Shortcuts

## Alias Git recomendados

Puedes agregar estos alias a tu configuración global de Git para facilitar el uso:

```bash
# Alias para Git Flow
git config --global alias.fs "flow feature start"
git config --global alias.ff "flow feature finish"
git config --global alias.rs "flow release start"
git config --global alias.rf "flow release finish"
git config --global alias.hs "flow hotfix start"
git config --global alias.hf "flow hotfix finish"

# Alias generales útiles
git config --global alias.st "status"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --decorate --all"
```

## PowerShell Functions (Windows)

Agrega estas funciones a tu perfil de PowerShell:

```powershell
function gfs($name) { git flow feature start $name }
function gff($name) { git flow feature finish $name }
function grs($version) { git flow release start $version }
function grf($version) { git flow release finish $version }
function ghs($version) { git flow hotfix start $version }
function ghf($version) { git flow hotfix finish $version }
function gst() { git status }
```

Para agregar al perfil:

1. `notepad $PROFILE`
2. Pega las funciones
3. Reinicia PowerShell

## Scripts NPM Disponibles

```bash
npm run flow:feature:start <nombre>
npm run flow:feature:finish <nombre>
npm run flow:release:start <version>
npm run flow:release:finish <version>
npm run flow:hotfix:start <version>
npm run flow:hotfix:finish <version>
npm run flow:status
```
