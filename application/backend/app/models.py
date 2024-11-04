from typing import Optional
import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


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

    resources: list["UserResource"] = Relationship(
        back_populates="user", cascade_delete=True
    )
    assemblers: list["UserAssembler"] = Relationship(
        back_populates="user", cascade_delete=True
    )
    miners: list["UserMiner"] = Relationship(
        back_populates="user", cascade_delete=True
    )
    constructors: list["UserConstructor"] = Relationship(
        back_populates="user", cascade_delete=True
    )


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
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    description: str | None = None
    icon_image_url: str | None = None

    # Relationships
    user_resources: list["UserResource"] = Relationship(
        back_populates="resource_type", cascade_delete=True
    )
    recipe_inputs: list["RecipeInput"] = Relationship(
        back_populates="resource_type", cascade_delete=True
    )
    recipe_outputs: list["RecipeOutput"] = Relationship(
        back_populates="resource_type", cascade_delete=True
    )


class UserResource(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    resource_type_id: int = Field(foreign_key="resourcetype.id", ondelete="CASCADE")
    quantity: int = Field(default=0)

    # Relationships
    user: "User" = Relationship(back_populates="resources")
    resource_type: "ResourceType" = Relationship(back_populates="user_resources")


# object for input on updating resources
class ResourceBase(SQLModel):
    resource_type_id: int
    quantity: int


class FacilityType(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    description: str | None = None
    icon_image_url: str | None = None

    recipes: list["Recipe"] = Relationship(
        back_populates="facility_type", cascade_delete=True
    )


class Recipe(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    time_to_complete: int = Field(default=0)  # Time in seconds
    facility_type_id: Optional[int] = Field(foreign_key="facilitytype.id")
    facility_type: Optional["FacilityType"] = Relationship(
        back_populates="recipes"
    )

    inputs: list["RecipeInput"] = Relationship(
        back_populates="recipe", cascade_delete=True
    )
    outputs: list["RecipeOutput"] = Relationship(
        back_populates="recipe", cascade_delete=True
    )

class RecipeInput(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id", ondelete="CASCADE")
    resource_type_id: int = Field(foreign_key="resourcetype.id", ondelete="CASCADE")
    quantity: int = Field(default=0)

    # Relationships
    recipe: "Recipe" = Relationship(back_populates="inputs")
    resource_type: "ResourceType" = Relationship(back_populates="recipe_inputs")


class RecipeOutput(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.id", ondelete="CASCADE")
    resource_type_id: int = Field(foreign_key="resourcetype.id", ondelete="CASCADE")
    quantity: int = Field(default=0)

    # Relationships
    recipe: "Recipe" = Relationship(back_populates="outputs")
    resource_type: "ResourceType" = Relationship(back_populates="recipe_outputs")


class FacilityBase(SQLModel):
    facility_type_id: int
    status: str
    recipe_id: None | int

class FacilityUpdate(SQLModel):
    status: str
    recipe_id: None | int


class UserAssembler(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    facility_type_id: int = Field(foreign_key="facilitytype.id")
    facility_type: "FacilityType" = Relationship()
    user_id: uuid.UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    user: "User" = Relationship(back_populates="assemblers")
    recipe_id: Optional[int] = Field(foreign_key="recipe.id")
    recipe: Optional[Recipe] = Relationship()
    status: str = Field(default="idle")


class UserMiner(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    facility_type_id: int = Field(foreign_key="facilitytype.id")
    facility_type: "FacilityType" = Relationship()
    user_id: uuid.UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    user: "User" = Relationship(back_populates="miners")
    recipe_id: Optional[int] = Field(foreign_key="recipe.id")
    recipe: Optional[Recipe] = Relationship()
    status: str = Field(default="idle")


class UserConstructor(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    facility_type_id: int = Field(foreign_key="facilitytype.id")
    facility_type: "FacilityType" = Relationship()
    user_id: uuid.UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    user: "User" = Relationship(back_populates="constructors")
    recipe_id: Optional[int] = Field(foreign_key="recipe.id")
    recipe: Optional[Recipe] = Relationship()
    status: str = Field(default="idle")
