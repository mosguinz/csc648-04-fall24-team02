import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.item import create_random_item

# def get_resources(
#     client: TestClient, superuser_token_headers: dict[str, str], db: Session
# ) -> None:
#     response = client.get(
#         f"{settings.API_V1_STR}/resources/",
#         headers=superuser_token_headers,
#     )
#     assert response.status_code == 200
#     content = response.json()
#     assert response.

def test_set_resources(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    iron_ore = {"resource_type_id": 1, "quantity": 100}
    copper_ore = {"resource_type_id": 2, "quantity": 150}
    rock = {"resource_type_id": 3, "quantity": 200}
    resources = [iron_ore, copper_ore, rock]

    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        json=resources
    )

    assert response.status_code == 200
    content = response.json()
    for res in content:
        assert res["quantity"] == next((obj["quantity"] for obj in resources if obj["resource_type_id"] == res["resource_type_id"]), None)
