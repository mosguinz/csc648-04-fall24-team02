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


def test_read_user_miners(client: TestClient, db: Session) -> None:
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
    created_miners = response.json()
    response = client.get(
        f"{settings.API_V1_STR}/facilities/miner",
        headers=headers,
    )
    read_miners = response.json()
    assert created_miners == read_miners


def test_create_user_assembler(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="assembler")
    if not facility_type:
        facility_type_in = FacilityType(
            name="assembler",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    status1 = random_lower_string()
    assembler1 = {"facility_type_id": facility_type.id, "status": status1}
    status2 = random_lower_string()
    assembler2 = {"facility_type_id": facility_type.id, "status": status2}
    assemblers = [assembler1, assembler2]
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
        f"{settings.API_V1_STR}/facilities/assembler", headers=headers, json=assemblers
    )
    assert response.status_code == 200
    content = response.json()
    for assembler in content:
        assert any(assembler["status"] == mine["status"] for mine in assemblers)


def test_update_user_assembler(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="assembler")
    if not facility_type:
        facility_type_in = FacilityType(
            name="assembler",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    assembler1 = {"facility_type_id": facility_type.id, "status": "idle"}
    assembler2 = {"facility_type_id": facility_type.id, "status": "idle"}
    assemblers = [assembler1, assembler2]
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
        f"{settings.API_V1_STR}/facilities/assembler", headers=headers, json=assemblers
    )
    old_assemblers = response.json()
    new_assemblers = []
    for old_assembler in old_assemblers:
        old_assembler["status"] = random_lower_string()
        new_assemblers.append(old_assembler)

    response = client.post(
        f"{settings.API_V1_STR}/facilities/assembler", headers=headers, json=new_assemblers
    )
    assert response.status_code == 200
    content = response.json()
    for assembler in content:
        assert any(assembler["status"] == mine["status"] for mine in new_assemblers)


def test_read_user_assemblers(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="assembler")
    if not facility_type:
        facility_type_in = FacilityType(
            name="assembler",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    assembler1 = {"facility_type_id": facility_type.id, "status": "idle"}
    assembler2 = {"facility_type_id": facility_type.id, "status": "idle"}
    assemblers = [assembler1, assembler2]
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
        f"{settings.API_V1_STR}/facilities/assembler", headers=headers, json=assemblers
    )
    created_assemblers = response.json()
    response = client.get(
        f"{settings.API_V1_STR}/facilities/assembler",
        headers=headers,
    )
    read_assemblers = response.json()
    assert created_assemblers == read_assemblers


def test_create_user_constructor(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="constructor")
    if not facility_type:
        facility_type_in = FacilityType(
            name="constructor",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    status1 = random_lower_string()
    constructor1 = {"facility_type_id": facility_type.id, "status": status1}
    status2 = random_lower_string()
    constructor2 = {"facility_type_id": facility_type.id, "status": status2}
    constructors = [constructor1, constructor2]
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
        f"{settings.API_V1_STR}/facilities/constructor", headers=headers, json=constructors
    )
    assert response.status_code == 200
    content = response.json()
    for constructor in content:
        assert any(constructor["status"] == mine["status"] for mine in constructors)


def test_update_user_constructor(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="constructor")
    if not facility_type:
        facility_type_in = FacilityType(
            name="constructor",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    constructor1 = {"facility_type_id": facility_type.id, "status": "idle"}
    constructor2 = {"facility_type_id": facility_type.id, "status": "idle"}
    constructors = [constructor1, constructor2]
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
        f"{settings.API_V1_STR}/facilities/constructor", headers=headers, json=constructors
    )
    old_constructors = response.json()
    new_constructors = []
    for old_constructor in old_constructors:
        old_constructor["status"] = random_lower_string()
        new_constructors.append(old_constructor)

    response = client.post(
        f"{settings.API_V1_STR}/facilities/constructor", headers=headers, json=new_constructors
    )
    assert response.status_code == 200
    content = response.json()
    for constructor in content:
        assert any(constructor["status"] == mine["status"] for mine in new_constructors)


def test_read_user_constructors(client: TestClient, db: Session) -> None:
    facility_type = crud.read_facility_type_by_name(session=db, name="constructor")
    if not facility_type:
        facility_type_in = FacilityType(
            name="constructor",
        )
        facility_type = crud.create_facility_type(session=db, facility_type=facility_type_in)
    constructor1 = {"facility_type_id": facility_type.id, "status": "idle"}
    constructor2 = {"facility_type_id": facility_type.id, "status": "idle"}
    constructors = [constructor1, constructor2]
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
        f"{settings.API_V1_STR}/facilities/constructor", headers=headers, json=constructors
    )
    created_constructors = response.json()
    response = client.get(
        f"{settings.API_V1_STR}/facilities/constructor",
        headers=headers,
    )
    read_constructors = response.json()
    assert created_constructors == read_constructors

