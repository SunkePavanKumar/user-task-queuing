# Task Queue API with Rate Limiting

## Overview
This Node.js API handles tasks with user-specific rate limiting. It supports 1 task per second and 20 tasks per minute for each user. The tasks are queued and processed according to the rate limits.

## Features
- User-specific rate limiting
- Task queueing using Bull and Redis
- Logs task completion in a file
- Resilient to failures and edge cases

## Prerequisites
- Node.js
- Docker
- Redis

## Environment Variables
 ```bash
        PORT=3000
        REDIS_URL=redis://127.0.0.1:6379
        RATE_LIMIT_POINTS=20
        RATE_LIMIT_DURATION=60
 ```
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SunkePavanKumar/user-task-queuing.git
   cd user-task-queuing
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start redis using docker:
   ```bash
   docker-compose up -d
   ```
4. Start the server:
   ```bash
      npm run dev
    ```

## Usage

***Send a POST request to the /api/v1/task route with a JSON body containing the user ID:***

```json
{
  "user_id": "123"
}
```


## Running Tests

```bash
npm run test
```
