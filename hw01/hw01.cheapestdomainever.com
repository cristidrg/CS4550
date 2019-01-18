server {
        listen 80;
        listen [::]:80;

        root /home/drg/www/hw01;

        index index.html;

        server_name www.hw01.cheapestdomainever.com hw01.cheapestdomainever.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
