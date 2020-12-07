
<p align="center">
  <img src="https://raw.githubusercontent.com/scg-unibe-ch/ese2020-team9/readme/frontend/src/assets/cd/other2anim.gif">
</p>


# ESE2020 - Team 09

## Prerequisite
You should have installed [NodeJS and npm](https://nodejs.org/en/download/) (they come as one) in order to start the backend server.

## Start
- clone the ese2020-project-scaffolding repository
- navigate to the backend folder `cd ese2020-project-scaffolding/backend`
- run `npm install`
- run `npm run dev`
- open your browser with the url [http://localhost:3000](http://localhost:3000/)


## Endpoints
Some endpoints can be called in a [browser](http://localhost:3000), others have to be called by a REST Client. [Here](./postman_collection) you can find a collection that contains all requests, which you can import into Postman. [Postman](https://www.postman.com/) is a REST Client.

### `/todoitem`
- POST

	<details>
		<summary>Request</summary>

	```json
		{
			"name": "string",
			"done": "boolean",
			"todoListId":"number"
		}
	```

	</details>


	<details>
		<summary>Response</summary>

		Code: 200
		Body:

	```json
	{
		"todoItemId": "number",
		"name": "string",
		"done": "boolean",
		"todoListId":"number"
	}
	```
</details>

- PUT `/:id`

	<details>
		<summary>Request</summary>

	```json
		{
			"name": "string",
			"done": "boolean",
			"todoListId":"number"
		}
	```

	</details>


	<details>
		<summary>Response</summary>

		Code: 200
		Body:

	```json
	{
		"todoItemId": "number",
		"name": "string",
		"done": "boolean",
		"todoListId":"number"
	}
	```
</details>

- DELETE `/:id`<br/>
	Response: Status: 200

### `/todolist`
- POST
	<details>
		<summary>Request</summary>

		Code: 200
		Body:
	```json
	{
		"name":"string"
	}

	```
	</details>
	<details>
		<summary>Response</summary>

		Code: 200
		Body:
	```json
	{
		"todoListId": "number",
		"name":"string"
	}

	```
	</details>

- PUT `/:id`
	<details>
		<summary>Request</summary>

		Code: 200
		Body:
	```json
	{
		"name":"string"
	}

	```
	</details>
	<details>
		<summary>Response</summary>

		Code: 200
		Body:
	```json
	{
		"todoListId": "number",
		"name":"string"
	}

	```
	</details>

- DELETE `/:id`<br>
	Response: Status: 200

- GET
	<details>
		<summary>Response</summary>

		Code: 200
		Body:
	```json
	{
		"todoListId": "number",
		"name":"string",
		"todoItems":"TodoItem[]"
	}
	```
	</details>

### `/user`
- POST `/register`
	<details>
		<summary>Request</summary>

		Code: 200
		Body:
	```json
	{
		"userName":"string",
		"password":"stiring"
	}

	```
	</details>
	<details>
		<summary>Response</summary>

		Code: 200
		Body:
	```json
	{
		"userId": "number",
		"userName":"string",
		"password":"string(hashed)"
	}

	```
	</details>

- POST `/login`
	<details>
		<summary>Request</summary>

		Code: 200
		Body:
	```json
	{
		"userName":"string",
		"password":"string"
	}

	```
	</details>
	<details>
		<summary>Response</summary>

		Code: 200 || 403
		Body:
	```json
	{
		"user": {
			"userId":"string",
			"userName":"string",
			"password":"stirng(hashed)"
		},
		"token":"string"
	}

	```
	</details>

- GET
	<details>
		<summary>Response</summary>

		Code: 200
		Body:
	```json
	[
		{
			"userId":"string",
			"userName":"string",
			"password":"stirng(hashed)"
		},
		{
			"userId":"string",
			"userName":"string",
			"password":"stirng(hashed)"
		},
		...
	]

	```
	</details>

### `/secured`
- GET
	<details>
		<summary>Request</summary>


	Header: Authorization: Bearer  + `token`
	</details>

	<details>
		<summary>Response</summary>

		Code: 200 | 403
		Body:
	```json
	{
		"message":"string"
	}

	```
	</details>

### `/`
- GET
	<details>
		<summary>Response</summary>

		Code: 200
		Body:
	```text
	<h1>Welcome to the ESE-2020 Course</h1><span style=\"font-size:100px;\">&#127881;</span>
	```
	</details>
