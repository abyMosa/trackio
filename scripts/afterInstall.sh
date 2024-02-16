sudo chown -R ubuntu:ubuntu /var/www/html
# sudo chown -R ubuntu:ubuntu /var/www/zezenya
# cd /var/www/zezenya/server && npm install
# cd /var/www/zezenya/server && ls -al
# cd /var/www/zezenya/server && tsc
sudo systemctl restart nginx
pm2 kill
pm2 delete all
pm2 stop all
cd /var/www/html/server/
NODE_ENV="production" pm2 start index.js --node-args="--require dotenv/config" --env production --name "server"