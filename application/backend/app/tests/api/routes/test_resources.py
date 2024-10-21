from fastapi.testclient import TestClient
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.models import UserCreate
from app.tests.utils.utils import random_email, random_lower_string


def test_set_resources(client: TestClient, db: Session) -> None:
    iron_ore = {"resource_type_id": 1, "quantity": 100}
    copper_ore = {"resource_type_id": 2, "quantity": 150}
    rock = {"resource_type_id": 3, "quantity": 200}
    resources = [iron_ore, copper_ore, rock]

    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    crud.create_user(session=db, user_create=user_in)

    login_data = {
        "username": username,
        "password": password,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}

    response = client.post(
        f"{settings.API_V1_STR}/resources/", headers=headers, json=resources
    )

    assert response.status_code == 200
    content = response.json()
    for res in content:
        assert res["quantity"] == next(
            (
                obj["quantity"]
                for obj in resources
                if obj["resource_type_id"] == res["resource_type_id"]
            ),
            None,
        )


def test_get_resources(client: TestClient, db: Session) -> None:
    username = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=username, password=password)
    crud.create_user(session=db, user_create=user_in)
    login_data = {
        "username": username,
        "password": password,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    iron_ore = {"resource_type_id": 1, "quantity": 100}
    copper_ore = {"resource_type_id": 2, "quantity": 150}
    rock = {"resource_type_id": 3, "quantity": 200}
    resources = [iron_ore, copper_ore, rock]
    r = client.post(
        f"{settings.API_V1_STR}/resources/", headers=headers, json=resources
    )
    response = client.get(
        f"{settings.API_V1_STR}/resources/",
        headers=headers,
    )
    assert response.status_code == 200
    content = response.json()
    for res in content:
        assert res["quantity"] == next(
            (
                obj["quantity"]
                for obj in resources
                if obj["resource_type_id"] == res["resource_type_id"]
            ),
            None,
        )
