# mite cli by tricks

## Production Use

for tricks

    docker run -it --rm -e APIKEY=757832647f37a492 tricks/mite_cli

for other <company>.mite.yo.lk

    docker run -it --rm -e COMPANY=demo APIKEY=757832647f37a492 tricks/mite_cli

## Dev Use

    git clone git@github.com:tricks-gmbh/mite_cli.git
    cd mite_cli
    cp .env.dist .env

Please edit the .env file
 
    npm run watch