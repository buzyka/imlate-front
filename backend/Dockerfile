FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN go build -o server .

FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/server /app/server
EXPOSE 8080
CMD ["/app/server"]