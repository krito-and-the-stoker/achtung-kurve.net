package main

import (
    "fmt"
    "net/http"
    "os"
)

func echoServer() {
    // Set the content-type header for the response (as required by CGI)
    fmt.Println("Content-Type: text/plain") // This is essential for CGI scripts
    fmt.Println() // Blank line to separate headers from body

    // Get the HTTP method (GET or POST)
    method := os.Getenv("REQUEST_METHOD")
    if method == "GET" {
        query := os.Getenv("QUERY_STRING") // Get the query string
        fmt.Printf("Go has received GET request with query: %s\n", query)
    } else if method == "POST" {
        // Handle POST request and parse the form data
        err := os.Setenv("REQUEST_METHOD", "POST")
        if err != nil {
            http.Error(nil, "Error parsing form data", http.StatusInternalServerError)
            return
        }
        fmt.Println("Go has received POST request with data:")
        for key, values := range os.Environ() {
            for _, value := range values {
                fmt.Printf("%s: %s\n", key, value)
            }
        }
    } else {
        // Handle unsupported HTTP methods
        fmt.Printf("Unsupported HTTP method: %s\n", method)
    }
}

func main() {
    // As we're running in CGI, the main function doesn't start an HTTP server
    // Instead, we directly call echoServer() to handle the request
    echoServer()
}
