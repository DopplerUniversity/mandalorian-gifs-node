# Railway

## Tokens

```sh
export RAILWAY_TOKEN=8d1bea6a-977a-46e5-9db0-403bf6cc74ba
```

## Importing

The config file `~/.railway/config.json` contains the project id, path, and environment id.

Seems an auth code is buried in their as well...

Get variables - https://sourcegraph.com/github.com/railwayapp/cli@0bd4fda/-/blob/gateway/envs.go?L9:1

curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 8d1bea6a-977a-46e5-9db0-403bf6cc74ba \
  --data "????" \
  https://railway.app/graphql


query ($projectId: String!, $environmentId: String!) { decryptedVariables(projectId: $projectId, environmentId: $environmentId) }


PROJECT_ID="47b545a7-80a4-444e-acdb-db0e5ca2dc6e"
ENVIRONMENT_ID="a673e578-ad86-40e7-b600-a5d74bcdb102"

curl -X "POST" "https://backboard.railway.app/graphql" \
     -H "Authorization: Bearer $(jq -r '.user.token' ~/.railway/config.json)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $"{ \
	      \"query\": \"query(\$projectId:String"'!'",\$environmentId:String"'!'"){decryptedVariables(projectId:\$projectId,environmentId:\$environmentId)}\", \
	      \"variables\": { \"projectId\": \"$PROJECT_ID\", \"environmentId\": \"$ENVIRONMENT_ID\" } \
      }"

curl --silent -X "POST" "https://backboard.railway.app/graphql" \
     -H "project-access-token: 8d1bea6a-977a-46e5-9db0-403bf6cc74ba" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
	"query": "query($projectId:String!,$environmentId:String!){decryptedVariables(projectId:$projectId,environmentId:$environmentId)}",
	"variables": {
		"projectId": "your-project-id",
		"environmentId": "your-environment-id"
	}
}' | jq '.data.decryptedVariables'


- Project > General - Copy Project ID $PROJECT_ID="xxxx"
- Environments > Copy ID
- TOKEN_ID="$(jq '.user.token' ~/.railway/config.json)"
doppler setup


