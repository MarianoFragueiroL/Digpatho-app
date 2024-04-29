# Etapa de construcción
FROM node:14-alpine as builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de paquetes y instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar el resto del código fuente de la aplicación
COPY . .

# Construir la aplicación
RUN yarn build

# Etapa de ejecución
FROM node:14-alpine

WORKDIR /app

# Instalar solo las dependencias de producción
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto que Next.js escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start"]