package main

import (
	"net/http"
	//"encoding/json"
	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/contactFormEmail", handleMail)

	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "post"},
		Debug:            false,
	}).Handler(mux)

	http.ListenAndServe(":8080", handler)
}

func handleMail(w http.ResponseWriter, r *http.Request) {

	w.Write([]byte("Success"))

	return

	// response := struct{Success bool}{ Success: true }
	// responseJSON, err := json.Marshal(response)
	// // If we fail to make JSON just send "Success"
	// if err != nil {
	// 	w.Write([]byte("Success"))
	// 	return
	// }
	// w.Header().Set("Content-Type", "application/json")
	// w.Write(responseJSON)
}