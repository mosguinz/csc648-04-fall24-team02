# Development Guide

## Setting up your environment

### Install dependencies

First, install the required tools. Follow the installation guides for your platform.
* [Docker](https://www.docker.com/)
* [uv](https://docs.astral.sh/uv/) for backend package management and pre-commit hooks
* [fnm](https://github.com/Schniz/fnm) for frontend Node version management

Then, proceed with the setup instructions in the [frontend](./application/frontend/README.md) and [backend](./application/backend/README.md) folders for each stack.

### Set up pre-commit hooks

We are using a tool called [pre-commit](https://pre-commit.com/) for code linting and formatting. When you install it, it runs right before making a commit in Git. This way it ensures that the code is consistent and formatted even before it is committed.

You can find a file `.pre-commit-config.yaml` with configurations at the root of the project.

#### Install pre-commit to run automatically

> [!IMPORTANT]
> This step requires the dependencies for the backend to be installed, using `uv sync`.

pre-commit is already part of the dependencies of the project. From the `backend/` folder, you can simply install the pre-commit hook with:

```bash
uv run pre-commit install
```

Now whenever you try to commit, pre-commit will run and check and format the code you are about to commit, and will ask you to stage it with git again before committing.

Then you can `git add` the modified/fixed files again and now you can commit.

#### Running pre-commit hooks manually

You can also run pre-commit manually on all the files, you can do it using `uv` with:

```bash
uv run pre-commit run --all-files
```
<!--
```
check for added large files..............................................Passed
check toml...............................................................Passed
check yaml...............................................................Passed
ruff.....................................................................Passed
ruff-format..............................................................Passed
eslint...................................................................Passed
prettier.................................................................Passed
```
-->

## Running the stack

> [!IMPORTANT]
> Before starting, your working directory must be in `application/`. Per Milestone specification, all application code must be contained inside this folder.

You can run the entire stack locally on your computer using Docker Compose.

```bash
docker compose watch
```

Now you can open your browser and interact with these URLs:

* Frontend, built with Docker, with routes handled based on the path: http://localhost:5173
* Backend, JSON based web API based on OpenAPI: http://localhost:8000
* Automatic interactive documentation with Swagger UI (from the OpenAPI backend): http://localhost:8000/docs
* Adminer, database web administration: http://localhost:8080
* Traefik UI, to see how the routes are being handled by the proxy: http://localhost:8090

> [!NOTE]
> The first time you start your stack, it might take a minute for it to be ready. While the backend waits for the database to be ready and configures everything. You can check the logs to monitor it.

To check the logs, run (in another terminal):

```bash
docker compose logs
```

To check the logs of a specific service, add the name of the service, e.g.:

```bash
docker compose logs backend
```

To stop, run:

```bash
docker compose stop
```

### Local Development

The Docker Compose files are configured so that each of the services is available in a different port in `localhost`.

For the backend and frontend, they use the same port that would be used by their local development server, so, the backend is at `http://localhost:8000` and the frontend at `http://localhost:5173`.

This way, you could turn off a Docker Compose service and start its local development service, and everything would keep working, because it all uses the same ports.

For example, you can stop that `frontend` service in the Docker Compose, in another terminal, run:

```bash
docker compose stop frontend
```

And then start the local frontend development server:

```bash
cd frontend
npm run dev
```

Or you could stop the `backend` Docker Compose service:

```bash
docker compose stop backend
```

And then you can run the local development server for the backend:

```bash
cd backend
fastapi dev app/main.py
```

### Docker Compose in `localhost.tiangolo.com`

When you start the Docker Compose stack, it uses `localhost` by default, with different ports for each service (backend, frontend, adminer, etc).

When you deploy it to production (or staging), it will deploy each service in a different subdomain, like `api.example.com` for the backend and `dashboard.example.com` for the frontend.

In the guide about [deployment](deployment.md) you can read about Traefik, the configured proxy. That's the component in charge of transmitting traffic to each service based on the subdomain.

If you want to test that it's all working locally, you can edit the local `.env` file, and change:

```dotenv
DOMAIN=localhost.tiangolo.com
```

That will be used by the Docker Compose files to configure the base domain for the services.

Traefik will use this to transmit traffic at `api.localhost.tiangolo.com` to the backend, and traffic at `dashboard.localhost.tiangolo.com` to the frontend.

The domain `localhost.tiangolo.com` is a special domain that is configured (with all its subdomains) to point to `127.0.0.1`. This way you can use that for your local development.

After you update it, run again:

```bash
docker compose watch
```

When deploying, for example in production, the main Traefik is configured outside of the Docker Compose files. For local development, there's an included Traefik in `docker-compose.override.yml`, just to let you test that the domains work as expected, for example with `api.localhost.tiangolo.com` and `dashboard.localhost.tiangolo.com`.

### Docker Compose files and env vars

There is a main `docker-compose.yml` file with all the configurations that apply to the whole stack, it is used automatically by `docker compose`.

And there's also a `docker-compose.override.yml` with overrides for development, for example to mount the source code as a volume. It is used automatically by `docker compose` to apply overrides on top of `docker-compose.yml`.

These Docker Compose files use the `.env` file containing configurations to be injected as environment variables in the containers.

They also use some additional configurations taken from environment variables set in the scripts before calling the `docker compose` command.

After changing variables, make sure you restart the stack:

```bash
docker compose watch
```

## The .env file

The `.env` file is the one that contains all the configurations, generated keys and passwords, etc.

The values stored in this file are for the purpose of local development only. The values used for production and staging builds are overwritten by GitHub Actions secrets. For more information, see the [deployment documentation](./deployment.md).

## URLs

The production or staging URLs would use these same paths, but with your own domain.

### Development URLs

Development URLs, for local development.
* Frontend: http://localhost:5173
* Backend: http://localhost:8000
* Automatic Interactive Docs (Swagger UI): http://localhost:8000/docs
* Automatic Alternative Docs (ReDoc): http://localhost:8000/redoc
* Adminer: http://localhost:8080
* Traefik UI: http://localhost:8090
* MailCatcher: http://localhost:1080

### Development URLs with `localhost.tiangolo.com` Configured
Development URLs, for local development.
* Frontend: http://dashboard.localhost.tiangolo.com
* Backend: http://api.localhost.tiangolo.com
* Automatic Interactive Docs (Swagger UI): http://api.localhost.tiangolo.com/docs
* Automatic Alternative Docs (ReDoc): http://api.localhost.tiangolo.com/redoc
* Adminer: http://localhost.tiangolo.com:8080
* Traefik UI: http://localhost.tiangolo.com:8090
* MailCatcher: http://localhost.tiangolo.com:1080
