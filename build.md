# Steps to build

- npm start
- npm run build-react
- npm run dist

Still needs to start postgres separately

TODO run in electron main

- ./initdb -U postgres -D $env:PROGRAMDATA/EAP/data
- postgres.exe -D $env:PROGRAMDATA/EAP/data
- createdb.exe -U postgres DATABASE
- pg_restore --no-privileges --no-owner -U postgres -d DATABASE postgres-latest.dmp
- ./pgsql/bin/psql.exe -a -d DATABASE -f migration.sql -U postgres
