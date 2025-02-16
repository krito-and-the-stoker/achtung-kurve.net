#!/usr/local/bin/python

import os
import sys
import cgi


def echo_server():
    print("Content-Type: text/plain\n")  # HTTP header
    print()  # Blank line to separate headers from body

    method = os.environ.get("REQUEST_METHOD", "GET")
    if method == "GET":
        query = os.environ.get("QUERY_STRING", "")
        print(f"Python has received GET request with query: {query}")
    elif method == "POST":
        form = cgi.FieldStorage()
        print("Python has received POST request with data:")
        for key in form.keys():
            print(f"{key}: {form.getvalue(key)}")
    else:
        print(f"Unsupported HTTP method: {method}")


if __name__ == "__main__":
    echo_server()
