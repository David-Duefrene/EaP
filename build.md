# Steps to build

- npm start
- npm run build-react
- npm run dist

Still needs to start postgres separately

TODO run in electron main

- ./initdb -D %PROGRAMDATA%/EAP/data
- pg_restore --no-privileges --no-owner -U postgres -d DATABASE postgres-latest.dmp
- postgres.exe -D %PROGRAMDATA%/EAP/data
