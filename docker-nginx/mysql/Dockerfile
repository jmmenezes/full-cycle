FROM mysql:5.7

# Define a senha e o banco
ENV MYSQL_DATABASE=nodedb
ENV MYSQL_ROOT_PASSWORD=root

# Copia o script SQL para a pasta de inicialização automática
COPY init.sql /docker-entrypoint-initdb.d/
