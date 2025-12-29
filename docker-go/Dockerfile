# Imagem para compilação
FROM golang:1.19-alpine AS builder

# Certificados SSL
COPY proxy1.crt /usr/local/share/ca-certificates/
COPY proxy2.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates 

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências (se existirem)
COPY go.mod ./
RUN go mod download

# Copia o restante do código fonte
COPY full-cycle.go .

# Compila o binário de forma estática (ideal para Docker)
RUN CGO_ENABLED=0 GOOS=linux go build -o full-cycle .

# Imagem para compilação
FROM scratch

WORKDIR /root/

# Copia apenas o executável do estágio anterior
COPY --from=builder /app/full-cycle .

# Comando para rodar o app
CMD ["./full-cycle"]