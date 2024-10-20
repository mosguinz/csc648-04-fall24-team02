import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import col, delete, func, select

from app import crud
from app.api.deps import (
    SessionDep,
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import (
    ResourcesPublic,
)
from app.utils import generate_new_account_email, send_email

router = APIRouter()

@router.get(
    "/",
    response_model=ResourcesPublic,
)
def read_resources(session: SessionDep, user_id: uuid.UUID) -> Any:
    """
    Get resources for the selected user
    """
    #TODO add in validation here

    resources = crud.get_resources_by_user( session=session, user_id=user_id )
    return resources

@router.post(
    "/",
    response_model=ResourcesPublic,
)
def set_resources(session: SessionDep, user_id: uuid.UUID, resources: ResourcesPublic) -> Any:
    """
    Set resources for the selected user
    """
    # TODO add in validation here

    resources = crud.set_resources_for_user(session=session, user_id=user_id, resources=resources)
    return resources

