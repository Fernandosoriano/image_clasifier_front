# Usa una imagen base de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto de desarrollo de Angular
EXPOSE 4200

# Ejecuta el servidor de desarrollo de Angular
CMD ["npm", "run", "start"]
