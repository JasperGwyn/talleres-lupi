# Despliegue - Talleres PCB para niños

## 1. Subir a GitHub

### Opción A: Crear repo manualmente

1. Ve a **https://github.com/new**
2. Nombre del repo: `talleres-pcb` (o el que prefieras)
3. **No** marques "Add a README" (ya tienes código)
4. Clic en **Create repository**

### Opción B: Si tienes GitHub CLI (`gh`)

```bash
gh repo create talleres-pcb --public --source=. --remote=origin --push
```

### Después de crear el repo (Opción A)

Reemplaza `TU_USUARIO` con tu usuario de GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/talleres-pcb.git
git branch -M main
git push -u origin main
```

---

## 2. Desplegar en Vercel

**URL objetivo:** `https://talleres-pcb.vercel.app`

### Opción 1: Desde la web (recomendado)

1. Ve a **https://vercel.com**
2. **Add New** → **Project**
3. Importa el repo desde GitHub
4. **Project Name:** pon `talleres-pcb` para que la URL sea `talleres-pcb.vercel.app`
5. Vercel detectará Next.js automáticamente
6. **Deploy**

### Opción 2: Vercel CLI

Deploy a producción:

```bash
npx vercel --prod
```

El proyecto publica en **`https://talleres-lupi.vercel.app`**. Para que también responda en **`https://talleres-pcb.vercel.app`** (sin renombrar el proyecto):

```bash
npx vercel alias set talleres-lupi.vercel.app talleres-pcb.vercel.app
```
