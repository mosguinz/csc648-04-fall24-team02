import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import col, delete, func, select

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import (
    ResourceBase
)
from app.utils import generate_new_account_email, send_email

router = APIRouter()

@router.get(
    "/",
    response_model=list[ResourceBase],
)
def read_resources(session: SessionDep, user_id: uuid.UUID) -> Any:
    """
    Get resources for the selected user
    """
    #TODO add in validation
    resources = crud.read_resources_by_user( session=session, user_id=user_id )
    if not resources:
        raise HTTPException(status_code=404, detail="User resources not found")
    return resources

@router.post(
    "/",
    response_model=list[ResourceBase],
)
def set_resources(session: SessionDep, current_user: CurrentUser, resources: list[ResourceBase]) -> Any:
    """
    Set resources for the selected user
    """
    # TODO add in validation
    curr_reses = crud.read_resources_by_user( session=session, user_id=current_user.id)
    for resource in resources:
        # grab corresponding existing resource
        res_id = resource.resource_type_id
        matching_resource = next((res for res in curr_reses if res.resource_type_id == res_id), None)
        # if the resource already exists
        if matching_resource:
            crud.update_resource(session=session, db_resource=matching_resource, resource_in=resource)
        else:
            crud.create_resource(session=session, resource_in=resource, user_id= current_user.id)

    return resources

