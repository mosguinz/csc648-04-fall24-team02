# Front-end

Template is created with https://create-react-app.dev/docs/getting-started.

Team members that are not familiar with the React project structure are
encouraged to look at the documentation above.

The template should provide you with a good starting point. Edit files
where necessary to create the pages required for Milestone 0.

## Prerequisites

* Node.js

## Testing

```sh
cd frontend
npm start
```

## Typescript or not?

Front-end members should decide whether to use Typescript for this 
project. For more info, see: https://react.dev/learn/typescript 

# Back-end

## Prerequisites

* Python 3.12.5
  For stability, we will be using this specific version. If you use
  [`pyenv`](https://github.com/pyenv/pyenv), you can install and set the
  Python version for this project using:
  ```sh
  pyenv install 3.12.5
  pyenv local 3.12.5
  ```
* Poetry
  See https://python-poetry.org/docs/ on how to install.
* Django
  You will install this using Poetry. Do not use `pip` to install.

Finally run `poetry update` to install and update all dependencies for
the backend.

## Testing

If everything is installed correctly, run `poetry run python manage.py runserver`.
You should be able to navigate to http://localhost:8000 and see a landing
page.

Django starter is installed. Needs configuring.

