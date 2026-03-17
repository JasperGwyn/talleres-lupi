# Despliegue - Talleres Lupi

## 1. Subir a GitHub

### Opción A: Crear repo manualmente

1. Ve a **https://github.com/new**
2. Nombre del repo: `talleres-lupi`
3. **No** marques "Add a README" (ya tienes código)
4. Clic en **Create repository**

### Opción B: Si tienes GitHub CLI (`gh`)

```bash
gh repo create talleres-lupi --public --source=. --remote=origin --push
```

### Después de crear el repo (Opción A)

Reemplaza `TU_USUARIO` con tu usuario de GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/talleres-lupi.git
git branch -M main
git push -u origin main
```

---

## 2. Desplegar en Vercel

### Opción 1: Desde la web (recomendado)

1. Ve a **https://vercel.com**
2. **Add New** → **Project**
3. Importa el repo `talleres-lupi` desde GitHub
4. Vercel detectará Next.js automáticamente
5. **Deploy**

### Opción 2: Vercel CLI

```bash
npx vercel
```

Sigue las preguntas (login si hace falta, confirmar proyecto). Para producción:

```bash
npx vercel --prod
```
