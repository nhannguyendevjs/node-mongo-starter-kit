# Generating SSL Certificates

Use OpenSSL to create self-signed certificates:

## Generate CA key and certificate

```bash
openssl genrsa -out example//certificate//ca.key 2048
openssl req -x509 -new -nodes -key example//certificate//ca.key -sha256 -days 365 -out example//certificate//ca.crt -subj "//CN=MyCA"
```

## Generate client key and certificate signing request (CSR)

```bash
openssl genrsa -out example//certificate//client.key 2048
openssl req -new -key example//certificate//client.key -out example//certificate//client.csr -subj "//CN=localhost"
```

## Sign the client certificate with the CA certificate

```bash
openssl x509 -req -in example//certificate//client.csr -CA example//certificate//server-ca.crt -CAkey example//certificate//server-ca.key -CAcreateserial -out example//certificate//client.crt -days 365 -sha256
```
