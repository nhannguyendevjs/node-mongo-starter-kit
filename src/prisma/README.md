# Prisma Setup Guide

## Step 1: Install Prisma

```bash
npm install prisma --save-dev
```

## Step 2: Initialize Prisma with PostgreSQL as the Data Source

```bash
Copy
Edit
npx prisma init --datasource-provider postgresql
```

Step 3: Check Prisma Version

```bash
npx prisma -v
```

## Step 4: Generate Prisma Client

```bash
npx prisma generate
```

## Step 5: Pull Existing Database Schema

```bash
npx prisma db pull
```

## Step 6: Push Schema to the Database (Force Reset)

```bash
npx prisma db push --force-reset
```

## Step 7: Open Prisma Studio

```bash
npx prisma studio
```
