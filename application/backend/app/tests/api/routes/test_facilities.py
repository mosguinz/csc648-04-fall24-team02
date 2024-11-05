from fastapi.testclient import TestClient
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.models import FacilityType, UserCreate
from app.tests.utils.utils import random_email, random_lower_string


def test_create_user_miner(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="miner")
    if not facility_type:
        facility_type_in = FacilityType(
            name="miner",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    status1 = random_lower_string()
    miner1 = {"facility_type_id": facility_type.id, "status": status1}
    status2 = random_lower_string()
    miner2 = {"facility_type_id": facility_type.id, "status": status2}
    miners = [miner1, miner2]
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
        f"{settings.API_V1_STR}/facilities/miner", headers=headers, json=miners
    )
    assert response.status_code == 200
    content = response.json()
    for miner in content:
        assert any(miner["status"] == mine["status"] for mine in miners)


def test_update_user_miner(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="miner")
    if not facility_type:
        facility_type_in = FacilityType(
            name="miner",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    miner1 = {"facility_type_id": facility_type.id, "status": "idle"}
    miner2 = {"facility_type_id": facility_type.id, "status": "idle"}
    miners = [miner1, miner2]
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
        f"{settings.API_V1_STR}/facilities/miner", headers=headers, json=miners
    )
    old_miners = response.json()
    new_miners = []
    for old_miner in old_miners:
        old_miner["status"] = random_lower_string()
        new_miners.append(old_miner)

    response = client.post(
        f"{settings.API_V1_STR}/facilities/miner", headers=headers, json=new_miners
    )
    assert response.status_code == 200
    content = response.json()
    for miner in content:
        assert any(miner["status"] == mine["status"] for mine in new_miners)
