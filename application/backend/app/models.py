import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from typing import Optional


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)

    resources: list["UserResource"] = Relationship(back_populates="user", cascade_delete=True)
    items: list["UserFacility"] = Relationship(back_populates="user", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


class ResourceType(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    description: Optional[str] = None
    icon_image_url: Optional[str] = None


class UserResource(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    resource_type_id: int = Field(foreign_key="resourcetype.id")
    quantity: int = Field(default=0)

    # Relationships
    user: "User" = Relationship(back_populates="resources")
    resource_type: "ResourceType" = Relationship(back_populates="user_resources")

ResourceType.user_resources = Relationship(back_populates="resource_type")


class FacilityType(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    description: Optional[str] = None
    icon_image_url: Optional[str] = None


class UserFacility(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    item_type_id: int = Field(foreign_key="facilitytype.id")
    quantity: int = Field(default=0)

    # Relationships
    user: "User" = Relationship(back_populates="items")
    item_type: "FacilityType" = Relationship(back_populates="user_facilities")

FacilityType.user_facilities = Relationship(back_populates="facility_type")


class Recipe(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    time_to_complete: int = Field(default=0)  # Time in seconds

    inputs: List["RecipeInput"] = Relationship(back_populates="recipe")
    outputs: List["RecipeOutput"] = Relationship(back_populates="recipe")


class RecipeInput(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id")
    resource_type_id: int = Field(foreign_key="resourcetype.id")
    quantity: int = Field(default=0)

    # Relationships
    recipe: "Recipe" = Relationship(back_populates="inputs")
    resource_type: "ResourceType" = Relationship(back_populates="recipe_inputs")

ResourceType.recipe_inputs = Relationship(back_populates="resource_type")


class RecipeOutput(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id")
    resource_type_id: int = Field(foreign_key="resourcetype.id")
    quantity: int = Field(default=0)

    # Relationships
    recipe: "Recipe" = Relationship(back_populates="outputs")
    resource_type: "ResourceType" = Relationship(back_populates="recipe_outputs")

ResourceType.recipe_outputs = Relationship(back_populates="resource_type")


