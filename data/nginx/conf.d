server {
  listen 80;
  server_name storyev.tk www.storyev.tk;
  server_tokens off;

  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  listen 443 ssl;
  server_name storyev.tk www.storyev.tk;
  server_tokens off;

  ssl_certificate /etc/letsencrypt/live/storyev.tk/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/storyev.tk/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location / {
    proxy_pass http://localhost:3000;

    proxy_set_header    Host                $http_host;
    proxy_set_header    X-Real-IP           $remote_addr;
    proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
  }
}