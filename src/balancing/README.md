# Hi DEV 👋

Let's run Nginx node apps load balancing

## Ubuntu Server

```bash
bash
apt update
apt install nginx nano curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
bash
nvm install --lts
npm update -g
npm install -g pm2
pm2 start ~/apps/app-1/index.js ~/apps/app-2/index.js ~/apps/app-3/index.js
service nginx restart
```

## Testing

```bash
while sleep 0.5; do curl localhost; done
```
