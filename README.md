# 🚀 Proyecto Basic Marketplace

Este proyecto utiliza **Next.js** como framework frontend/backend, **Prisma** como ORM y **PostgreSQL** como base de datos.
Se ejecuta **en modo producción**, sin usuarios de prueba ni datos falsos.

---

## 📋 Requisitos previos

- [Node.js 18+](https://nodejs.org/en/)
- [PostgreSQL 14+](https://www.postgresql.org/)

---

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/AlejoMorales07/basic-marketplace.git
cd basic-marketplace
```

### 2. Crear archivo `.env` (para producción)

```bash
cp .env.example .env
```

Configura las variables con credenciales y dominio reales:

```env
DATABASE_URL="postgresql://usuario:password@ip_o_dominio:5432/nombre_db?schema=public"
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=un_secret_seguro
NODE_ENV=production
```

---

## 💻 Ejecución

1️⃣ Instalar dependencias:

```bash
npm install
```

2️⃣ Construir la aplicación:

```bash
npm run build
```

3️⃣ Aplicar migraciones de producción:

```bash
npx prisma migrate deploy
```

4️⃣ Iniciar el servidor:

```bash
npm start
```
