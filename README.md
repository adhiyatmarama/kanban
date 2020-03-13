# kanban

This is the documentation for using KANBAN API. The base url for this API is `https://quiet-sierra-03283.herokuapp.com'`


To use this app with user interface, kindly visit this link https://kanban-1584072346233.firebaseapp.com/

### 1. Register (If you Already have an account, you can skip this part)

* **URL**
  
  /user/register

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
	"name": "test",
	"email": "test@mail.com",
	"password": "test123"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RAbWFpbC5jb20iLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1ODQxMDM5ODd9.DYF1HE2FQrj0L_79CMXkkznSRa1xJEQtZRW1eik6Oz8",
        "name": "test"
    }
    ```

    You can use this token to use other features

* **ERROR RESPONSE**
  
  * Empty Requirement (empty request body)
    
    * CODE: 400
    
    * Content:
        
      ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "path": "name",
                    "msg": "Please input your name"
                },
                {
                    "type": "Validation error",
                    "path": "email",
                    "msg": "Please input your email"
                }
            ]
        }
      ```

### 2. Log In

* **URL**
  
  /user/login

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
	"email": "test@mail.com",
	"password": "test123"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RAbWFpbC5jb20iLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1ODQxMDkwOTd9.Sl6UwTdYUBP2tdFH9esS--18PVN3OHDD0OGQG7bA4a4",
        "name": "test"
    }
    ```

    **Save the token**

* **ERROR RESPONSE**
  
  * Email not Found
    
    * CODE: 404
    
    * Content:
        
      ```javascript
        {
            "status": 404,
            "msg": "wrong email"
        }
      ```

  * Wrong Password
    
    *   CODE: 400

    *   Content:

        ```javascript
        {
            "status": 400,
            "msg": "wrong password"
        }
        ```

### 3. Get Tasks

* **URL**
  
  /tasks

* **METHOD**
  
  `GET`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    [
        {
            "id": 1,
            "title": "Buat Kanban (2)",
            "description": "Membuat kanban (2)",
            "category": "Todo",
            "UserId": 1,
            "createdAt": "2020-03-13T12:53:50.696Z",
            "updatedAt": "2020-03-13T14:13:12.959Z"
        }
    ]
    ```

* **ERROR RESPONSE**
  
  * Server Error
    
    * CODE: 500
    
    * Content:
        
      ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
      ```

### 4. Add Task

* **URL**
  
  /tasks

* **METHOD**
  
  `POST`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  
* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
        "title": "Buat Kanban (3)",
        "description": "Membuat Kanban (3)",
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "id": 3,
        "title": "Buat Kanban (3)",
        "description": "Membuat kanban (3)",
        "category": "Backlog",
        "UserId": 1,
        "updatedAt": "2020-03-13T14:20:30.315Z",
        "createdAt": "2020-03-13T14:20:30.315Z"
    }
    ```

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
        ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "path": "title",
                    "msg": "Please input the title"
                }
            ]
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 5. Get Task by Id

* **URL**
  
  /tasks/_taskId_

* **METHOD**
  
  `GET`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "id": 3,
        "title": "Buat Kanban (3)",
        "description": "Membuat kanban (3)",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2020-03-13T14:20:30.315Z",
        "updatedAt": "2020-03-13T14:20:30.315Z"
    }
    ```

* **ERROR RESPONSE**
  
  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "Task Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 6. Edit Task

* **URL**
  
  /tasks/_taskId_

* **METHOD**
  
  `PUT`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  
* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
        "title": "Buat Kanban",
        "description": "Memuat Kanban",
        "category": "Product",
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "title": "Buat Kanban",
        "description": "Membuat Kanban",
        "category": "Product",
        "UserId": 1
    }
    ```

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
        ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "path": "title",
                    "msg": "Please input the title"
                }
            ]
        }
        ```

  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "Task Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 7. Delete Task

* **URL**
  
  /tasks/_taskId_

* **METHOD**
  
  `DELETE`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    "Berhasil menghapus task"
    ```

* **ERROR RESPONSE**
  
  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "Task Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```
