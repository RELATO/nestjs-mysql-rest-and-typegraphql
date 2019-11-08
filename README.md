# nestjs-mysql-rest-and-typegraphql

## Description

This is a little example of how to use nest.js creating a REST and GraphQL API using Type-GraphQL.

## Tips

> Generate new module:

- `nest g module MODULE_NAME`
- `nest g controller CONTROLLER_NAME # This is for REST api`
- `nest g service SERVICE_NAME`
- `nest g resolver RESOLVER_NAME # This is for GraphQL api`

> Update all the packages:

`yarn upgrade-interactive --latest`


## Running the code using MySQL containerized version ( for development purposes )

> We are defining the root password to "ChangeIt" on the exemple below
```
docker run --name mysqldev -e MYSQL_ROOT_PASSWORD=ChangeIt -d -p3306:3306 mysql:5.6
```

> Testing
```
docker exec -it mysqldev bash
mysql -uroot -p 
```

## Related projects

- https://github.com/jmcdo29/zeldaPlay
- https://github.com/na-ji/la-carte
- https://github.com/david-eos/dynamic-typegraphql-filter
- https://github.com/walkward/typed-json-api
- https://github.com/MagnusCloudCorp/nestjs-type-graphql

