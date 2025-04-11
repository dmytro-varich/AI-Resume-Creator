### Reverse Proxy Config
Since one of the servers was in the university network, a VPN connection was required to access external resources. Therefore, it was decided to equip one of the virtual machines as a proxy with a connected VPN.

You can use this config file to set up a proxy connection. For VPN, we used the snx client.

It would also be possible to create a docker image to configure a proxy, but we are having trouble doing this since we can't use environment variables in the config. This can be done through docker-compose, or maybe we have already done it)

