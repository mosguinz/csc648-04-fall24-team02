
import random
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session

from app import crud
from app.core.security import verify_password
from app.models import ResourceBase, ResourceType, UserResource, UserCreate, User
from app.tests.utils.utils import random_email, random_lower_string

def test_create_resource_type(db: Session) -> None:
    name = random_lower_string()
    desc = random_lower_string()
    url = random_lower_string()
    new_res = ResourceType(
        name=name,
        description=desc,
        icon_image_url=url
    )
    res = crud.create_resource_type( session=db, resource_type=new_res);
    assert res.name == name
    assert res.description == desc
    assert res.icon_image_url == url

def test_create_resource(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    name = random_lower_string()
    desc = random_lower_string()
    url = random_lower_string()
    new_res = ResourceType(
        name=name,
        description=desc,
        icon_image_url=url
    )
    res_type = crud.create_resource_type( session=db, resource_type=new_res)
    res_id = res_type.id
    count = random.randint(1, 1000)
    res = ResourceBase(
        resource_type_id=res_id,
        quantity=count
    )
    created_res = crud.create_resource( session=db, resource_in=res, user_id=user_id )
    assert created_res.quantity == count
    assert created_res.user_id == user_id
    assert created_res.resource_type_id == res_id

def test_read_resource(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id

    name = random_lower_string()
    desc = random_lower_string()
    url = random_lower_string()
    new_res_type = ResourceType(
        name=name,
        description=desc,
        icon_image_url=url
    )
    res_type = crud.create_resource_type( session=db, resource_type=new_res_type)
    res_type_id = res_type.id
    count = random.randint(1, 1000)
    res = ResourceBase(
        resource_type_id=res_type_id,
        quantity=count
    )
    name2 = random_lower_string()
    desc2 = random_lower_string()
    url2 = random_lower_string()
    new_res_type2 = ResourceType(
        name=name2,
        description=desc2,
        icon_image_url=url2
    )
    res_type2 = crud.create_resource_type( session=db, resource_type=new_res_type2)
    res_type_id2 = res_type2.id
    res2 = ResourceBase(
        resource_type_id=res_type_id2,
        quantity=count
    )
    new_res = crud.create_resource( session=db, resource_in=res, user_id=user_id )
    new_res2 = crud.create_resource( session=db, resource_in=res2, user_id=user_id )
    obj = [new_res, new_res2]
    ret = crud.read_resources_by_user(session=db, user_id=user_id)
    print(obj)
    print(ret)
    assert obj == ret

def test_update_resource( db: Session ) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)
    user_id = user.id
    name = random_lower_string()
    desc = random_lower_string()
    url = random_lower_string()
    new_res_type = ResourceType(
        name=name,
        description=desc,
        icon_image_url=url
    )
    res_type = crud.create_resource_type( session=db, resource_type=new_res_type)
    res_id = res_type.id
    count = random.randint(2, 1000)
    res = ResourceBase(
        resource_type_id=res_id,
        quantity=1
    )
    new_res = crud.create_resource( session=db, resource_in=res, user_id=user_id )
    resource_in = ResourceBase(
        resource_type_id=res_id,
        quantity=count
    )
    updated_resource = crud.update_resource( session=db, db_resource=new_res, resource_in=resource_in )
    assert updated_resource.quantity == count
