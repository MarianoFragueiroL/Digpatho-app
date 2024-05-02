# Etapa de construcción
FROM node:18-alpine as builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de paquetes y instalar dependencias
COPY package*.json ./
RUN npm install 

# Copiar el resto del código fuente de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de ejecución
FROM node:18-alpine

WORKDIR /app
# RUN ls -la
# # Instalar solo las dependencias de producción
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN npm install next

# Exponer el puerto que Next.js escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]