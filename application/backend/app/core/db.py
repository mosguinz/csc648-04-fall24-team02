from sqlmodel import Session, create_engine, select

from app import crud
from app.core.config import settings
from app.models import FacilityType, ResourceType, User, UserCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28


# ensure the base super user is created
def init_user(session: Session) -> None:
    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.create_user(session=session, user_create=user_in)


# ensure all resources are initialized and brought in
def init_resource_types(session: Session) -> None:
    resources = [
        "iron_ore",
        "copper_ore",
        "rock",
        "iron_ingot",
        "copper_ingot",
        "concrete",
        "iron_plate",
        "copper_plate",
        "iron_rod",
        "screws",
        "wire",
        "cable",
    ]

    for resource in resources:
        existing_res = session.exec(
            select(ResourceType).where(ResourceType.name == resource)
        ).first()
        if not existing_res:
            res_in = ResourceType(
                name=resource,
            )
            crud.create_resource_type(session=session, resource_type=res_in)


# ensure base facility types are created
def init_facility_type(session: Session) -> None:
    facility_types = ["miner", "assembler", "constructor"]
    for facility_type in facility_types:
        existing_facility_type = session.exec(
            select(FacilityType).where(FacilityType.name == facility_type)
        ).first()
        if not existing_facility_type:
            facility_type_in = FacilityType(
                name=facility_type,
            )
            crud.create_facility_type(session=session, facility_type=facility_type_in)


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    # SQLModel.metadata.create_all(engine)
    init_user(session)
    init_resource_types(session)
    init_facility_type(session)
