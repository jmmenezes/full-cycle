# Imagem para compilação
FROM golang:1.23-alpine AS builder

# Certificados SSL
COPY proxy1.crt /usr/local/share/ca-certificates/
COPY proxy2.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates 

# Diretório de trabalho
WORKDIR /app

# Copia o restante do código fonte
COPY . .

# Compila o binário de forma estática (ideal para Docker)
RUN CGO_ENABLED=0 GOOS=linux go build -o full-cycle .

# Imagem para compilação
FROM alpine:latest

# Instala certificados de segurança (importante para chamadas HTTPS)
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copia apenas o executável do estágio anterior
COPY --from=builder /app/full-cycle .

# Comando para rodar o app
CMD ["./full-cycle"]