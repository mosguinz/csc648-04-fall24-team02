import uuid
from collections.abc import Sequence
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import (
    FacilityBase,
    FacilityUpdate,
    Item,
    ItemCreate,
    ResourceBase,
    ResourceType,
    User,
    UserCreate,
    UserResource,
    UserUpdate,
    FacilityType,
    UserMiner,
    UserAssembler,
    UserConstructor
)


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_item(*, session: Session, item_in: ItemCreate, owner_id: uuid.UUID) -> Item:
    db_item = Item.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def create_resource(
    *, session: Session, resource_in: ResourceBase, user_id: uuid.UUID
) -> UserResource:
    db_item = UserResource.model_validate(resource_in, update={"user_id": user_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def read_resources_by_user(
    *, session: Session, user_id: uuid.UUID
) -> Sequence[UserResource]:
    statement = select(UserResource).where(UserResource.user_id == user_id)
    resources = session.exec(statement).all()
    return resources


def update_resource(
    *, session: Session, db_resource: UserResource, resource_in: ResourceBase
) -> UserResource:
    resource_data = resource_in.model_dump(exclude_unset=True)
    db_resource.sqlmodel_update(resource_data)
    session.add(db_resource)
    session.commit()
    session.refresh(db_resource)
    return db_resource


def create_resource_type(
    *, session: Session, resource_type: ResourceType
) -> ResourceType:
    db_item = ResourceType.model_validate(resource_type)
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def create_facility_type(
    *, session: Session, facility_type: FacilityType
) -> FacilityType:
    db_item = FacilityType.model_validate(facility_type)
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def create_user_assembler(
    *, session: Session, assembler_in: FacilityBase, user_id: uuid.UUID
) -> UserAssembler:
    db_item = UserAssembler.model_validate(assembler_in, update={"user_id": user_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def update_user_assembler(
    *, session: Session, db_assembler: UserAssembler, assembler_in: FacilityUpdate
) -> UserResource:
    resource_data = assembler_in.model_dump(exclude_unset=True)
    db_assembler.sqlmodel_update(resource_data)
    session.add(db_assembler)
    session.commit()
    session.refresh(db_assembler)
    return db_assembler

def create_user_miner(
    *, session: Session, miner_in: FacilityBase, user_id: uuid.UUID
) -> UserMiner:
    db_item = UserMiner.model_validate(miner_in, update={"user_id": user_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def update_user_miner(
    *, session: Session, db_miner: UserMiner, miner_in: FacilityUpdate
) -> UserMiner:
    resource_data = miner_in.model_dump(exclude_unset=True)
    db_miner.sqlmodel_update(resource_data)
    session.add(db_miner)
    session.commit()
    session.refresh(db_miner)
    return db_miner

def create_user_constructor(
    *, session: Session, constructor_in: FacilityBase, user_id: uuid.UUID
) -> UserConstructor:
    db_item = UserConstructor.model_validate(constructor_in, update={"user_id": user_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def update_user_constructor(
    *, session: Session, db_constructor: UserConstructor, constructor_in: FacilityUpdate
) -> UserMiner:
    resource_data = constructor_in.model_dump(exclude_unset=True)
    db_constructor.sqlmodel_update(resource_data)
    session.add(db_constructor)
    session.commit()
    session.refresh(db_constructor)
    return db_constructor
