package main

import (
  "encoding/json"
  "log"
  "net/http"
  "strconv"
  "strings"
)

type User struct {
  ID    int    `json:"id"`
  Name  string `json:"name"`
  Email string `json:"email"`
  Active bool  `json:"active"`
  CreatedAt string `json:"createdAt,omitempty"`
}

var users = []User{
  {ID: 1, Name: "Alice", Email: "alice@example.com", Active: true},
  {ID: 2, Name: "Bob", Email: "bob@example.com", Active: false},
}

func cors(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    if r.Method == http.MethodOptions {
      w.WriteHeader(http.StatusNoContent)
      return
    }
    next.ServeHTTP(w, r)
  })
}

func main() {
  mux := http.NewServeMux()

  mux.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
    type Resp struct{ Token string `json:"token"` }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Resp{Token: "demo-token"})
  })

  mux.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    switch r.Method {
    case http.MethodGet:
      json.NewEncoder(w).Encode(users)
    case http.MethodPost:
      var u User
      if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest); return
      }
      max := 0
      for _, x := range users { if x.ID > max { max = x.ID } }
      u.ID = max + 1
      users = append(users, u)
      json.NewEncoder(w).Encode(u)
    default:
      http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
    }
  })

  mux.HandleFunc("/api/users/", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    idStr := strings.TrimPrefix(r.URL.Path, "/api/users/")
    id, err := strconv.Atoi(idStr)
    if err != nil { http.Error(w, "bad id", http.StatusBadRequest); return }
    switch r.Method {
    case http.MethodPut:
      var u User
      if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest); return
      }
      for i := range users {
        if users[i].ID == id {
          users[i] = u
          json.NewEncoder(w).Encode(u); return
        }
      }
      http.NotFound(w, r)
    case http.MethodDelete:
      out := users[:0]
      for _, x := range users { if x.ID != id { out = append(out, x) } }
      users = out
      w.WriteHeader(http.StatusNoContent)
    default:
      http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
    }
  })

  log.Println("Backend listening on :8080")
  log.Fatal(http.ListenAndServe(":8080", cors(mux)))
}