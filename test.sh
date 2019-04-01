#!/bin/bash

rm -rf ./certs

if [ $NODE_TLS_REJECT_UNAUTHORIZED = "0" ] ; then
    echo 'NODE_TLS_REJECT_UNAUTHORIZED is disabled.'
    exit 1
fi

fqdn=localhost
echo $fqdn

bash make-root-ca-and-certificates.sh $fqdn
echo ""

export NODE_EXTRA_CA_CERTS=./certs/client/chain.pem

echo ""
node ./serve.js 8043 &
NODE_PID=$!
sleep 1

echo ""
echo ""
node ./request.js 8043 $fqdn
echo -n " - without warnings from node.js' https"
echo ""
sleep 1

kill ${NODE_PID}
echo ""
