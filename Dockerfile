# Etapa 1: Build da aplicação
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --legacy-peer-deps
RUN npx prisma generate

COPY . .

RUN npm run build

RUN echo "Build contents:" && ls -la && echo "Dist contents:" && ls -la dist

# Etapa 2: Imagem final
FROM node:20-alpine

WORKDIR /app

# Copiando somente os arquivos necessários
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]