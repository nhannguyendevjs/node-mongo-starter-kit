# Generating SSL Certificates

Use OpenSSL to create self-signed certificates:

## Generate CA key and certificate

```bash
openssl genrsa -out example//certificate//ca.key 2048
openssl req -x509 -new -nodes -key example//certificate//ca.key -sha256 -days 365 -out example//certificate//ca.crt -subj "//CN=MyCA"
```

## Generate server key and certificate signing request (CSR)

```bash
openssl genrsa -out example//certificate//server.key 2048
openssl req -new -key example//certificate//server.key -out example//certificate//server.csr -subj "//CN=localhost"
```

## Sign the server certificate with the CA certificate

```bash
openssl x509 -req -in example//certificate//server.csr -CA example//certificate//ca.crt -CAkey example//certificate//ca.key -CAcreateserial -out example//certificate//server.crt -days 365 -sha256
```
