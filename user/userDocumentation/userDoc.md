# **User Service**

### /users/login

- ##### Method: POST

- Body:
| Key | Value | Description |
| --- | ----- | ----------- |
| username | String | User's username, which needs to be the same as what user registered. |
| password | String | User's password, which needs to be the same as what user registered. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 201 | Access_token: bearer token signed by JWT |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized |

- Example:
![login](/login.png)

### /users/register

- ##### Method: POST

- Body:
| Key | Value | Description |
| --- | ----- | ----------- |
| name | String | User's username, which needs to be unique and between 6 and 20 characters. |
| password1 | String | User's password, which needs between 6 and 20 characters. |
| password2 | String | User's password, which needs to be the same as password1. |
| email | String | User's email, which needs to be valid. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 201 | Message: User created successfully; <br>Data: include automatic generated id "_id", username, one hashed password, and email |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 400 | Message: two password not equal! |
| 400 | Message: Username (password) is too short. Minimal length is 6 characters |
| 400 | Message: email must be an valid email |

- Example:
![register](/register.png)

### /users

- ##### Method: GET

- Get all users' data.

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Gets all users successfully; <br>Data: all users' data, which include automatic generated id "_id", username, one hashed password, and email |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |

- Example:
![all users](/allusers.png)

### /users/:id

- ##### Method: GET

- Get one user's data by id.

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Gets user successfully; <br>Data: all user's data, which include automatic generated id "_id", username, one hashed password, and email |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |
| 500 | Message: internal server error (if the id is wrong) |

- Example:
![get one user](/getoneuser.png)

- ##### Method: PATCH

- Update one user's data by id.

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Update user successfully; <br>Data: all user's data, which include automatic generated id "_id", username, one hashed password, and email |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 400 | Message: Username (password) is too short. Minimal length is 6 characters |
| 400 | Message: email must be an valid email |
| 401 | Message: unauthorized (if the token is time out or has error) |
| 500 | Message: internal server error (if the id is wrong) |

- Example:
![update one user](/updateoneuser.png)

- ##### Method: DELETE

- Delete one user's data by id.

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Delete user successfully; <br>Data: all user's data, which include automatic generated id "_id", username, one hashed password, and email |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |
| 404 | Message: user not found! |
| 500 | Message: internal server error (if the id is wrong) |

- Example:
![delete one user](/deleteoneuser.png)

### /users/id

- ##### Method: POST

- Get one user's id by unique username.

- Body:
| Key | Value | Description |
| --- | ----- | ----------- |
| username | String | User's username, which needs to be the same as what user registered. |

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Get user's id successful; <br>Data: automatic generated id "_id" |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |
| 404 | Message: user not found! |

- Example:
![get user id](/getuserid.png)

### /usercomm

- ##### Method: POST

- Create "relationship" between user and community by two ids.

- Body:
| Key | Value | Description |
| --- | ----- | ----------- |
| user_id | String | User's automatic generated id. |
| comm_id | String | Community's automatic generated id. (given by community service) |

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Usercomm created successful; <br>Data: automatic generated id "_id", user_id, and comm_id |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |

- Example:
![create usercomm](/createusercomm.png)

- ##### Method: GET

- Find "relationship id" by user_id and comm_id.

- Query Params:
| Key | Value | Description |
| --- | ----- | ----------- |
| user_id | String | User's automatic generated id. |
| comm_id | String | Community's automatic generated id. (given by community service) |

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Get usercomm successful; <br>Data: automatic generated id "_id", user_id, and comm_id |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |
| 404 | Message: usercomm not found! |

- Example:
![get one usercomm](/getoneusercomm.png)

- ##### Method: DELETE

- Delete one "relationship" by user_id and comm_id.

- Body:
| Key | Value | Description |
| --- | ----- | ----------- |
| user_id | String | User's automatic generated id. |
| comm_id | String | Community's automatic generated id. (given by community service) |

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Delete usercomm successful; <br>Data: automatic generated id "_id", user_id, and comm_id |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |
| 404 | Message: usercomm not found! |

- Example:
![delete one usercomm](/deleteoneusercomm.png)

### /usercomm/comms/:id

- ##### Method: GET

- Get all "relationships" between user and community by specific user id.

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Get all communities successful; <br>Data: all "relationships" data, which include automatic generated id "_id", user_id, and comm_id |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |

- Example:
![get all comms](/getallcomms.png)

### /usercomm/users/:id

- ##### Method: GET

- Get all "relationships" between user and community by specific comm id.

- Authorization:
| Type | Token |
| ---- | ----- |
| Bearer Token | Enter the token which gets from login. |

- Success Response:
| Status | Return |
| ------ | ------ |
| 200 | Message: Get all users successful; <br>Data: all "relationships" data, which include automatic generated id "_id", user_id, and comm_id |

- Fail Response:
| Status | Return |
| ------ | ------ |
| 401 | Message: unauthorized (if the token is time out or has error) |

- Example:
![get all users](/getallusers.png)
