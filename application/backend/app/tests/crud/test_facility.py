import random, copy

from sqlmodel import Session, select

from app import crud
from app.models import FacilityType, FacilityUpdate, UserCreate, FacilityBase
from app.tests.utils.utils import random_email, random_lower_string


def test_create_facility_type(db: Session) -> None:
    name = random_lower_string()
    desc = random_lower_string()
    url = random_lower_string()
    new_res = FacilityType(name=name, description=desc, icon_image_url=url)
    res = crud.create_facility_type(session=db, facility_type=new_res)
    assert res.name == name
    assert res.description == desc
    assert res.icon_image_url == url

def test_create_user_miner(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type = db.exec(
        select(FacilityType).where(FacilityType.name == "miner")
    ).first()
    facility_type_id = facility_type.id
    miner_in = FacilityBase(facility_type_id=facility_type_id, status="idle")
    created_miner = crud.create_user_miner(session=db, miner_in=miner_in, user_id=user_id)
    assert created_miner is not None, "UserMiner creation fail"
    assert created_miner.user_id == user_id;
    assert created_miner.facility_type_id == facility_type_id;


def test_create_user_assembler(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type = db.exec(
        select(FacilityType).where(FacilityType.name == "assembler")
    ).first()
    facility_type_id = facility_type.id
    assembler_in = FacilityBase(facility_type_id=facility_type_id, status="idle")
    created_assembler = crud.create_user_assembler(session=db, assembler_in=assembler_in, user_id=user_id)
    assert created_assembler.user_id == user_id;
    assert created_assembler.facility_type_id == facility_type_id;


def test_create_user_constructor(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type = db.exec(
        select(FacilityType).where(FacilityType.name == "constructor")
    ).first()
    facility_type_id = facility_type.id
    constructor_in = FacilityBase(facility_type_id=facility_type_id, status="idle")
    created_assembler = crud.create_user_constructor(session=db, constructor_in=constructor_in, user_id=user_id)
    assert created_assembler.user_id == user_id;
    assert created_assembler.facility_type_id == facility_type_id;


def test_update_user_miner(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type = db.exec(
        select(FacilityType).where(FacilityType.name == "miner")
    ).first()
    facility_type_id = facility_type.id
    miner_in = FacilityBase(facility_type_id=facility_type_id, status="idle")
    created_miner = crud.create_user_miner(session=db, miner_in=miner_in, user_id=user_id)
    new_miner = FacilityUpdate(status="active", recipe_id=None)
    updated_miner = crud.update_user_miner(session=db, db_miner=created_miner, miner_in=new_miner)
    assert updated_miner.status == "active"
    assert updated_miner.facility_type_id == facility_type_id
    assert updated_miner.user_id == user_id


def test_update_user_assembler(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type = db.exec(
        select(FacilityType).where(FacilityType.name == "assembler")
    ).first()
    facility_type_id = facility_type.id
    assembler_in = FacilityBase(facility_type_id=facility_type_id, status="idle")
    created_assembler = crud.create_user_assembler(session=db, assembler_in=assembler_in, user_id=user_id)
    new_assembler = FacilityUpdate(status="active", recipe_id=None)
    updated_assembler = crud.update_user_assembler(session=db, db_assembler=created_assembler, assembler_in=new_assembler)
    assert updated_assembler.status == "active"
    assert updated_assembler.facility_type_id == facility_type_id
    assert updated_assembler.user_id == user_id


def test_update_user_constructor(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type = db.exec(
        select(FacilityType).where(FacilityType.name == "constructor")
    ).first()
    facility_type_id = facility_type.id
    constructor_in = FacilityBase(facility_type_id=facility_type_id, status="idle")
    created_constructor = crud.create_user_constructor(session=db, constructor_in=constructor_in, user_id=user_id)
    new_constructor = FacilityUpdate(status="active", recipe_id=None)
    updated_constructor = crud.update_user_constructor(session=db, db_constructor=created_constructor, constructor_in=new_constructor)
    assert updated_constructor.status == "active"
    assert updated_constructor.facility_type_id == facility_type_id
    assert updated_constructor.user_id == user_id
