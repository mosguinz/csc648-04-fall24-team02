
from sqlmodel import Session

from app import crud
from app.models import FacilityBase, FacilityType, FacilityUpdate, UserCreate
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
    facility_type_id = 1
    status = random_lower_string()
    miner_in = FacilityBase(
        facility_type_id=facility_type_id, status=status, recipe_id=None
    )
    created_miner = crud.create_user_miner(
        session=db, miner_in=miner_in, user_id=user_id
    )
    assert created_miner.user_id == user_id
    assert created_miner.facility_type_id == facility_type_id
    assert created_miner.status == status


def test_create_user_assembler(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 2
    status = random_lower_string()
    assembler_in = FacilityBase(
        facility_type_id=facility_type_id, status=status, recipe_id=None
    )
    created_assembler = crud.create_user_assembler(
        session=db, assembler_in=assembler_in, user_id=user_id
    )
    assert created_assembler.user_id == user_id
    assert created_assembler.facility_type_id == facility_type_id
    assert created_assembler.status == status


def test_create_user_constructor(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 3
    status = random_lower_string()
    constructor_in = FacilityBase(
        facility_type_id=facility_type_id, status=status, recipe_id=None
    )
    created_assembler = crud.create_user_constructor(
        session=db, constructor_in=constructor_in, user_id=user_id
    )
    assert created_assembler.user_id == user_id
    assert created_assembler.facility_type_id == facility_type_id
    assert created_assembler.status == status


def test_update_user_miner(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 1
    status = random_lower_string()
    miner_in = FacilityBase(
        facility_type_id=facility_type_id, status=status, recipe_id=None
    )
    created_miner = crud.create_user_miner(
        session=db, miner_in=miner_in, user_id=user_id
    )
    new_status = random_lower_string()
    new_miner = FacilityUpdate(status=new_status, recipe_id=None)
    updated_miner = crud.update_user_miner(
        session=db, db_miner=created_miner, miner_in=new_miner
    )
    assert updated_miner.status == new_status
    assert updated_miner.facility_type_id == facility_type_id
    assert updated_miner.user_id == user_id


def test_update_user_assembler(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 2
    status = random_lower_string()
    assembler_in = FacilityBase(
        facility_type_id=facility_type_id, status=status, recipe_id=None
    )
    created_assembler = crud.create_user_assembler(
        session=db, assembler_in=assembler_in, user_id=user_id
    )
    new_status = random_lower_string()
    new_assembler = FacilityUpdate(status=new_status, recipe_id=None)
    updated_assembler = crud.update_user_assembler(
        session=db, db_assembler=created_assembler, assembler_in=new_assembler
    )
    assert updated_assembler.status == new_status
    assert updated_assembler.facility_type_id == facility_type_id
    assert updated_assembler.user_id == user_id


def test_update_user_constructor(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 3
    status = random_lower_string()
    constructor_in = FacilityBase(
        facility_type_id=facility_type_id, status=status, recipe_id=None
    )
    created_constructor = crud.create_user_constructor(
        session=db, constructor_in=constructor_in, user_id=user_id
    )
    new_status = random_lower_string()
    new_constructor = FacilityUpdate(status=new_status, recipe_id=None)
    updated_constructor = crud.update_user_constructor(
        session=db, db_constructor=created_constructor, constructor_in=new_constructor
    )
    assert updated_constructor.status == new_status
    assert updated_constructor.facility_type_id == facility_type_id
    assert updated_constructor.user_id == user_id


def test_read_user_miners(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 1
    status1 = random_lower_string()
    miner_in1 = FacilityBase(
        facility_type_id=facility_type_id, status=status1, recipe_id=None
    )
    created_miner1 = crud.create_user_miner(
        session=db, miner_in=miner_in1, user_id=user_id
    )
    status2 = random_lower_string()
    miner_in2 = FacilityBase(
        facility_type_id=facility_type_id, status=status2, recipe_id=None
    )
    created_miner2 = crud.create_user_miner(
        session=db, miner_in=miner_in2, user_id=user_id
    )
    obj = [created_miner1, created_miner2]
    miners = crud.read_user_miners_by_user(session=db, user_id=user_id)
    assert obj == miners


def test_read_user_assemblers(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 2
    status1 = random_lower_string()
    assembler_in1 = FacilityBase(
        facility_type_id=facility_type_id, status=status1, recipe_id=None
    )
    created_assembler1 = crud.create_user_assembler(
        session=db, assembler_in=assembler_in1, user_id=user_id
    )
    status2 = random_lower_string()
    assembler_in2 = FacilityBase(
        facility_type_id=facility_type_id, status=status2, recipe_id=None
    )
    created_assembler2 = crud.create_user_assembler(
        session=db, assembler_in=assembler_in2, user_id=user_id
    )
    obj = [created_assembler1, created_assembler2]
    assemblers = crud.read_user_assemblers_by_user(session=db, user_id=user_id)
    assert obj == assemblers


def test_read_user_constructors(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    facility_type_id = 3
    status1 = random_lower_string()
    constructor_in1 = FacilityBase(
        facility_type_id=facility_type_id, status=status1, recipe_id=None
    )
    created_constructor1 = crud.create_user_constructor(
        session=db, constructor_in=constructor_in1, user_id=user_id
    )
    status2 = random_lower_string()
    constructor_in2 = FacilityBase(
        facility_type_id=facility_type_id, status=status2, recipe_id=None
    )
    created_constructor2 = crud.create_user_constructor(
        session=db, constructor_in=constructor_in2, user_id=user_id
    )
    obj = [created_constructor1, created_constructor2]
    constructors = crud.read_user_constructors_by_user(session=db, user_id=user_id)
    assert obj == constructors
