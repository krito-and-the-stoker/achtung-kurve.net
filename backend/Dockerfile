FROM python:3.12

# Enable CGI module
RUN apt-get update
RUN apt-get install -y \
    apache2 \
    libapache2-mod-wsgi-py3 \
    && rm -rf /var/lib/apt/lists/*
RUN a2enmod cgi

# Configure Apache to allow CGI execution
COPY cgi.conf /etc/apache2/conf-available/cgi.conf
RUN a2enconf cgi

# Set up CGI directory
RUN mkdir -p /usr/lib/cgi-bin && chmod +x /usr/lib/cgi-bin
WORKDIR /usr/lib/cgi-bin

# Copy the script into the CGI directory
COPY echo.py ./echo.py
RUN chmod +x ./echo.py

# Install golang
RUN apt-get update
RUN apt-get install -y golang-go

# Copy and compile go source
COPY echo.go .
RUN go build -o ./echo echo.go
RUN chmod a+x ./echo

# Expose port 80
EXPOSE 80

# Start Apache in foreground
CMD ["apachectl", "-D", "FOREGROUND"]
